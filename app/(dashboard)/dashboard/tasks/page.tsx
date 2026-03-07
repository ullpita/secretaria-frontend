"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckSquare, Clock, ChevronRight, ChevronLeft, Loader2, Phone } from "lucide-react";
import { getTasks, updateTaskStatus, type TaskRow } from "@/lib/supabase/queries";

const COLUMNS: { key: TaskRow["status"]; label: string; color: string }[] = [
  { key: "todo",        label: "À faire",    color: "text-slate-400" },
  { key: "in_progress", label: "En cours",   color: "text-blue-400" },
  { key: "done",        label: "Terminé",    color: "text-emerald-400" },
];

const PRIORITY_CONFIG = {
  high:   { label: "Haute",   color: "text-red-400 bg-red-500/10 border-red-500/20" },
  medium: { label: "Moyenne", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  low:    { label: "Basse",   color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
};

const STATUS_ORDER: TaskRow["status"][] = ["todo", "in_progress", "done"];

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks().then((data) => { setTasks(data); setLoading(false); });
  }, []);

  async function moveTask(taskId: string, direction: "left" | "right") {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const currentIdx = STATUS_ORDER.indexOf(task.status);
    const newIdx = direction === "right" ? currentIdx + 1 : currentIdx - 1;
    if (newIdx < 0 || newIdx >= STATUS_ORDER.length) return;
    const newStatus = STATUS_ORDER[newIdx];
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, status: newStatus } : t));
    await updateTaskStatus(taskId, newStatus);
  }

  const grouped = COLUMNS.reduce<Record<string, TaskRow[]>>((acc, col) => {
    acc[col.key] = tasks.filter((t) => t.status === col.key);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold text-lg">Tâches</h2>
          <p className="text-slate-500 text-sm mt-0.5">{tasks.length} tâche{tasks.length !== 1 ? "s" : ""} au total</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-slate-500">
          <Loader2 size={20} className="animate-spin mr-2" /> Chargement...
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500 text-sm gap-3">
          <CheckSquare size={32} className="opacity-30" />
          <p>Aucune tâche pour l&apos;instant.</p>
          <p className="text-xs text-slate-600">Les tâches créées par Sofia apparaîtront ici.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLUMNS.map((col, colIdx) => (
            <div key={col.key} className="flex flex-col gap-3">
              {/* Column header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.key === "todo" ? "bg-slate-400" : col.key === "in_progress" ? "bg-blue-400" : "bg-emerald-400"}`} />
                  <h3 className={`text-sm font-semibold ${col.color}`}>{col.label}</h3>
                </div>
                <span className="text-xs text-slate-600 bg-white/5 px-2 py-0.5 rounded-full">
                  {grouped[col.key].length}
                </span>
              </div>

              {/* Task cards */}
              <div className="space-y-3 min-h-[120px]">
                {grouped[col.key].length === 0 ? (
                  <div className="border border-dashed border-white/5 rounded-xl h-20 flex items-center justify-center text-slate-700 text-xs">
                    Aucune tâche
                  </div>
                ) : (
                  grouped[col.key].map((task) => (
                    <TaskCard key={task.id} task={task} colIdx={colIdx} onMove={moveTask} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, colIdx, onMove }: {
  task: TaskRow;
  colIdx: number;
  onMove: (id: string, dir: "left" | "right") => void;
}) {
  const priority = PRIORITY_CONFIG[task.priority];

  return (
    <div className="bg-[#13131A] border border-white/5 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-white text-sm font-medium leading-snug flex-1">{task.title}</p>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-lg border shrink-0 ${priority.color}`}>
          {priority.label}
        </span>
      </div>

      {task.notes && (
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{task.notes}</p>
      )}

      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
        {task.caller_name && (
          <span className="flex items-center gap-1"><Phone size={10} />{task.caller_name}</span>
        )}
        {task.due_date && (
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {new Date(task.due_date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
          </span>
        )}
        {task.call_id && (
          <Link href={`/dashboard/calls/${task.call_id}`} className="flex items-center gap-1 text-emerald-600 hover:text-emerald-400 transition-colors">
            Voir l&apos;appel
          </Link>
        )}
      </div>

      {/* Move buttons */}
      <div className="flex items-center gap-2 pt-1">
        {colIdx > 0 && (
          <button onClick={() => onMove(task.id, "left")}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition-all">
            <ChevronLeft size={12} />
          </button>
        )}
        {colIdx < 2 && (
          <button onClick={() => onMove(task.id, "right")}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition-all ml-auto">
            <ChevronRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
