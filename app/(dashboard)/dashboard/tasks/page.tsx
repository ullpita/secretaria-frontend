"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus, Phone, Calendar, Flag, MoreHorizontal,
  ExternalLink, CheckSquare
} from "lucide-react";
import { MOCK_TASKS, type Task, type TaskStatus } from "@/lib/mockdata";

const COLUMNS: { id: TaskStatus; label: string; color: string; dot: string }[] = [
  { id: "todo",        label: "À faire",    color: "text-slate-400",   dot: "bg-slate-500" },
  { id: "in_progress", label: "En cours",   color: "text-blue-400",    dot: "bg-blue-400"  },
  { id: "done",        label: "Terminé",    color: "text-emerald-400", dot: "bg-emerald-400" },
];

const PRIORITY_CONFIG = {
  high:   { label: "Haute",   color: "text-red-400    bg-red-500/10    border-red-500/20"   },
  medium: { label: "Moyenne", color: "text-amber-400  bg-amber-500/10  border-amber-500/20" },
  low:    { label: "Basse",   color: "text-slate-400  bg-slate-500/10  border-slate-500/20" },
};

function formatDue(date: string | null) {
  if (!date) return null;
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((d.getTime() - today.getTime()) / 86400000);
  if (diff < 0) return { label: `${Math.abs(diff)}j de retard`, overdue: true };
  if (diff === 0) return { label: "Aujourd'hui", overdue: false };
  if (diff === 1) return { label: "Demain", overdue: false };
  return { label: `${diff}j`, overdue: false };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<TaskStatus | null>(null);

  function handleDragStart(id: string) {
    setDragging(id);
  }

  function handleDragOver(e: React.DragEvent, col: TaskStatus) {
    e.preventDefault();
    setDragOver(col);
  }

  function handleDrop(col: TaskStatus) {
    if (!dragging) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === dragging ? { ...t, status: col } : t))
    );
    setDragging(null);
    setDragOver(null);
  }

  function moveTask(id: string, direction: "left" | "right") {
    const order: TaskStatus[] = ["todo", "in_progress", "done"];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = order.indexOf(t.status);
        const next = order[idx + (direction === "right" ? 1 : -1)];
        return next ? { ...t, status: next } : t;
      })
    );
  }

  const byStatus = (status: TaskStatus) => tasks.filter((t) => t.status === status);

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div>
          <h2 className="text-white font-semibold text-lg">Tâches</h2>
          <p className="text-slate-500 text-sm mt-0.5">{tasks.length} tâche{tasks.length > 1 ? "s" : ""} au total</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-white bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 px-3 py-2 rounded-xl transition-all font-medium">
          <Plus size={15} />
          Nouvelle tâche
        </button>
      </div>

      {/* Kanban board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
        {COLUMNS.map((col) => {
          const colTasks = byStatus(col.id);
          const isOver = dragOver === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDrop={() => handleDrop(col.id)}
              onDragLeave={() => setDragOver(null)}
              className={`flex flex-col rounded-2xl border transition-all ${
                isOver
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-white/5 bg-[#0D0D15]"
              }`}
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className={`text-sm font-medium ${col.color}`}>{col.label}</span>
                  <span className="text-xs text-slate-600 bg-white/5 px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 min-h-[200px]">
                {colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    colId={col.id}
                    onDragStart={() => handleDragStart(task.id)}
                    onMove={moveTask}
                  />
                ))}

                {colTasks.length === 0 && (
                  <div className={`h-20 rounded-xl border-2 border-dashed flex items-center justify-center transition-all ${
                    isOver ? "border-emerald-500/40 bg-emerald-500/5" : "border-white/5"
                  }`}>
                    <p className="text-slate-600 text-xs">Glissez une tâche ici</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({
  task, colId, onDragStart, onMove
}: {
  task: Task;
  colId: TaskStatus;
  onDragStart: () => void;
  onMove: (id: string, dir: "left" | "right") => void;
}) {
  const priority = PRIORITY_CONFIG[task.priority];
  const due = formatDue(task.dueDate);
  const order: TaskStatus[] = ["todo", "in_progress", "done"];
  const idx = order.indexOf(colId);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-[#13131A] border border-white/5 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-white/10 transition-all group"
    >
      {/* Priority + actions */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${priority.color}`}>
          <Flag size={9} className="inline mr-1" />
          {priority.label}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {idx > 0 && (
            <button
              onClick={() => onMove(task.id, "left")}
              className="text-slate-600 hover:text-white p-0.5 rounded transition-colors text-xs"
              title="Colonne précédente"
            >←</button>
          )}
          {idx < 2 && (
            <button
              onClick={() => onMove(task.id, "right")}
              className="text-slate-600 hover:text-white p-0.5 rounded transition-colors text-xs"
              title="Colonne suivante"
            >→</button>
          )}
        </div>
      </div>

      {/* Title */}
      <p className="text-white text-sm font-medium leading-snug mb-2">{task.title}</p>

      {/* Notes */}
      {task.notes && (
        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{task.notes}</p>
      )}

      {/* Footer meta */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        {/* Due date */}
        {due && (
          <span className={`flex items-center gap-1 text-xs ${due.overdue ? "text-red-400" : "text-slate-500"}`}>
            <Calendar size={10} />
            {due.label}
          </span>
        )}

        {/* Caller */}
        {task.callerPhone && (
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <Phone size={10} />
            {task.callerName ?? task.callerPhone}
          </span>
        )}

        {/* Link to call */}
        {task.callId && (
          <Link
            href={`/dashboard/calls/${task.callId}`}
            className="ml-auto flex items-center gap-1 text-xs text-slate-600 hover:text-emerald-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={10} />
            Appel
          </Link>
        )}
      </div>
    </div>
  );
}
