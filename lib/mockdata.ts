export type Sentiment = "positive" | "neutral" | "negative";
export type CallStatus = "completed" | "failed" | "ongoing";
export type ActionType = "email" | "calendar_event" | "task";
export type ActionStatus = "success" | "failed" | "pending";
export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "high" | "medium" | "low";

export interface CallAction {
  id: string;
  type: ActionType;
  status: ActionStatus;
  label: string;
  detail: string;
  executedAt: string | null;
}

export interface Call {
  id: string;
  callerName: string | null;
  callerNumber: string;
  duration: string;
  durationSeconds: number;
  startedAt: string;
  sentiment: Sentiment;
  status: CallStatus;
  summary: string;
  transcript: { speaker: "Sofia" | "Client"; text: string; timestamp: string }[];
  actions: CallAction[];
  sector: "medical" | "immobilier";
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  callerName: string | null;
  callerPhone: string | null;
  notes: string;
  callId: string | null;
  createdAt: string;
}

export const MOCK_CALLS: Call[] = [
  {
    id: "call_001",
    callerName: "Marie Dupont",
    callerNumber: "+33 6 12 34 56 78",
    duration: "3:42",
    durationSeconds: 222,
    startedAt: "2024-03-14T14:32:00Z",
    sentiment: "positive",
    status: "completed",
    summary: "Prise de RDV pour une consultation le jeudi 21 mars à 11h. Email de confirmation envoyé.",
    transcript: [
      { speaker: "Sofia", text: "Bonjour, vous êtes bien chez le Cabinet Dr. Moreau, je suis Sofia, comment puis-je vous aider ?", timestamp: "0:00" },
      { speaker: "Client", text: "Bonjour, je voudrais prendre un rendez-vous pour une consultation.", timestamp: "0:07" },
      { speaker: "Sofia", text: "Bien sûr ! Quel est votre nom et quelle date vous conviendrait ?", timestamp: "0:12" },
      { speaker: "Client", text: "Marie Dupont. Jeudi prochain si possible, en fin de matinée.", timestamp: "0:18" },
      { speaker: "Sofia", text: "Parfait Marie. Je vous propose jeudi 21 mars à 11h00. Votre email pour la confirmation ?", timestamp: "0:26" },
      { speaker: "Client", text: "marie.dupont@gmail.com", timestamp: "0:35" },
      { speaker: "Sofia", text: "C'est confirmé ! Vous recevrez un email dans quelques instants. À jeudi, bonne journée !", timestamp: "0:41" },
    ],
    actions: [
      { id: "a1", type: "calendar_event", status: "success", label: "RDV créé", detail: "Jeudi 21 mars 11h00 — Consultation Dr. Moreau", executedAt: "2024-03-14T14:36:00Z" },
      { id: "a2", type: "email", status: "success", label: "Email envoyé", detail: "Confirmation de RDV → marie.dupont@gmail.com", executedAt: "2024-03-14T14:36:10Z" },
    ],
    sector: "medical",
  },
  {
    id: "call_002",
    callerName: null,
    callerNumber: "+33 6 98 76 54 32",
    duration: "1:18",
    durationSeconds: 78,
    startedAt: "2024-03-14T14:10:00Z",
    sentiment: "neutral",
    status: "completed",
    summary: "Demande d'information sur les horaires du cabinet. Tâche créée pour rappel.",
    transcript: [
      { speaker: "Sofia", text: "Bonjour, Cabinet Dr. Moreau, je suis Sofia, comment puis-je vous aider ?", timestamp: "0:00" },
      { speaker: "Client", text: "Oui bonjour, je voulais savoir quels sont vos horaires d'ouverture ?", timestamp: "0:06" },
      { speaker: "Sofia", text: "Le cabinet est ouvert du lundi au vendredi de 9h à 19h, et le samedi matin de 9h à 13h.", timestamp: "0:12" },
      { speaker: "Client", text: "Très bien merci, et est-ce que le Dr. Moreau accepte de nouveaux patients ?", timestamp: "0:22" },
      { speaker: "Sofia", text: "Je crée une note pour que l'équipe vous rappelle pour confirmer. Quel est votre numéro ?", timestamp: "0:30" },
      { speaker: "Client", text: "C'est le 06 98 76 54 32.", timestamp: "0:38" },
      { speaker: "Sofia", text: "Noté ! Vous serez rappelé dans les 24h. Bonne journée !", timestamp: "0:43" },
    ],
    actions: [
      { id: "a3", type: "task", status: "success", label: "Tâche créée", detail: "Rappeler +33 6 98 76 54 32 — Nouveaux patients ?", executedAt: "2024-03-14T14:12:00Z" },
    ],
    sector: "medical",
  },
  {
    id: "call_003",
    callerName: "Jean Bernard",
    callerNumber: "+33 1 23 45 67 89",
    duration: "5:10",
    durationSeconds: 310,
    startedAt: "2024-03-14T13:15:00Z",
    sentiment: "positive",
    status: "completed",
    summary: "Visite appartement boulevard Haussmann 75008 programmée pour le samedi 16 mars à 10h30.",
    transcript: [
      { speaker: "Sofia", text: "Bonjour, Agence Immo Paris, je suis Sofia, comment puis-je vous aider ?", timestamp: "0:00" },
      { speaker: "Client", text: "Bonjour, j'ai vu votre annonce pour l'appartement boulevard Haussmann, je voudrais le visiter.", timestamp: "0:08" },
      { speaker: "Sofia", text: "Bien sûr ! Quel est votre nom et quand seriez-vous disponible ?", timestamp: "0:16" },
      { speaker: "Client", text: "Jean Bernard, je suis disponible ce samedi matin.", timestamp: "0:24" },
      { speaker: "Sofia", text: "Je vous propose samedi 16 mars à 10h30 au 45 boulevard Haussmann. Email pour la confirmation ?", timestamp: "0:35" },
      { speaker: "Client", text: "jean.bernard@outlook.com", timestamp: "0:44" },
      { speaker: "Sofia", text: "Parfait ! Rendez-vous samedi à 10h30. À bientôt !", timestamp: "0:50" },
    ],
    actions: [
      { id: "a4", type: "calendar_event", status: "success", label: "Visite planifiée", detail: "Sam 16 mars 10h30 — Appt Haussmann 75008", executedAt: "2024-03-14T13:20:00Z" },
      { id: "a5", type: "email", status: "success", label: "Email envoyé", detail: "Confirmation visite → jean.bernard@outlook.com", executedAt: "2024-03-14T13:20:15Z" },
      { id: "a6", type: "task", status: "success", label: "Tâche agent", detail: "Préparer dossier bien avant visite", executedAt: "2024-03-14T13:21:00Z" },
    ],
    sector: "immobilier",
  },
  {
    id: "call_004",
    callerName: "Sophie Martin",
    callerNumber: "+33 6 55 44 33 22",
    duration: "0:48",
    durationSeconds: 48,
    startedAt: "2024-03-14T11:50:00Z",
    sentiment: "negative",
    status: "failed",
    summary: "Appel interrompu — tentative de prise de RDV échouée. Action non exécutée.",
    transcript: [
      { speaker: "Sofia", text: "Bonjour, Cabinet Dr. Moreau, je suis Sofia, comment puis-je vous aider ?", timestamp: "0:00" },
      { speaker: "Client", text: "Oui je veux annuler mon rendez-vous de demain.", timestamp: "0:07" },
      { speaker: "Sofia", text: "Je comprends. Quel est votre nom pour retrouver votre rendez-vous ?", timestamp: "0:13" },
      { speaker: "Client", text: "Sophie Martin mais... [appel coupé]", timestamp: "0:19" },
    ],
    actions: [],
    sector: "medical",
  },
  {
    id: "call_005",
    callerName: null,
    callerNumber: "+33 7 11 22 33 44",
    duration: "2:55",
    durationSeconds: 175,
    startedAt: "2024-03-14T10:30:00Z",
    sentiment: "neutral",
    status: "completed",
    summary: "Demande de documents pour dossier locatif. Email avec liste des pièces envoyé.",
    transcript: [
      { speaker: "Sofia", text: "Bonjour, Agence Immo Paris, je suis Sofia, comment puis-je vous aider ?", timestamp: "0:00" },
      { speaker: "Client", text: "Bonjour, je voulais savoir quelles pièces il faut pour constituer un dossier locatif.", timestamp: "0:08" },
      { speaker: "Sofia", text: "Je vous envoie la liste complète par email. Quelle est votre adresse ?", timestamp: "0:20" },
      { speaker: "Client", text: "thomas.petit@gmail.com", timestamp: "0:28" },
      { speaker: "Sofia", text: "Envoyé ! Vous recevrez la liste dans quelques minutes. Bonne journée !", timestamp: "0:35" },
    ],
    actions: [
      { id: "a7", type: "email", status: "success", label: "Email envoyé", detail: "Liste pièces dossier locatif → thomas.petit@gmail.com", executedAt: "2024-03-14T10:33:00Z" },
    ],
    sector: "immobilier",
  },
];

export const MOCK_TASKS: Task[] = [
  { id: "t1", title: "Rappeler +33 6 98 76 54 32 — Nouveaux patients ?", status: "todo", priority: "high", dueDate: "2024-03-15", callerName: null, callerPhone: "+33 6 98 76 54 32", notes: "Veut savoir si le Dr. Moreau accepte de nouveaux patients.", callId: "call_002", createdAt: "2024-03-14T14:12:00Z" },
  { id: "t2", title: "Préparer dossier avant visite Haussmann", status: "todo", priority: "high", dueDate: "2024-03-15", callerName: "Jean Bernard", callerPhone: "+33 1 23 45 67 89", notes: "Visite le samedi 16 mars à 10h30. Préparer plans + diagnostics.", callId: "call_003", createdAt: "2024-03-14T13:21:00Z" },
  { id: "t3", title: "Envoyer devis travaux à M. Leroy", status: "in_progress", priority: "medium", dueDate: "2024-03-16", callerName: "Pierre Leroy", callerPhone: "+33 6 44 55 66 77", notes: "Demande reçue hier par téléphone. Attente chiffrage.", callId: null, createdAt: "2024-03-13T09:00:00Z" },
  { id: "t4", title: "Confirmer annulation RDV Sophie Martin", status: "in_progress", priority: "high", dueDate: "2024-03-14", callerName: "Sophie Martin", callerPhone: "+33 6 55 44 33 22", notes: "Appel coupé. Retrouver son RDV et confirmer l'annulation.", callId: "call_004", createdAt: "2024-03-14T11:52:00Z" },
  { id: "t5", title: "Relancer dossier Dubois après refus banque", status: "todo", priority: "low", dueDate: "2024-03-20", callerName: "Famille Dubois", callerPhone: null, notes: "Refus obtenu le 12/03. Explorer autres options de financement.", callId: null, createdAt: "2024-03-12T16:00:00Z" },
  { id: "t6", title: "Mettre à jour FAQ cabinet", status: "done", priority: "low", dueDate: null, callerName: null, callerPhone: null, notes: "Ajout horaires nouveaux et info parking.", callId: null, createdAt: "2024-03-10T10:00:00Z" },
  { id: "t7", title: "Vérifier disponibilité créneau 15h lundi", status: "done", priority: "medium", dueDate: "2024-03-13", callerName: "Mme. Rousseau", callerPhone: "+33 6 00 11 22 33", notes: "Confirmé disponible et RDV créé.", callId: null, createdAt: "2024-03-13T08:30:00Z" },
];
