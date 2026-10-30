export type EnquiryType =
  | "general"
  | "custom-order"
  | "styling"
  | "corporate"
  | "production"
  | "digital"
  | "event"
  | "gift-card";

export type EnquiryDraft = {
  id: string;
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  details: string;
  createdAt: string;
};

const KEY = "a1fashion_enquiry_drafts";

export function readEnquiryDrafts(): EnquiryDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(value) ? (value as EnquiryDraft[]) : [];
  } catch {
    return [];
  }
}

export function saveEnquiryDraft(draft: Omit<EnquiryDraft, "id" | "createdAt">) {
  const items = readEnquiryDrafts();
  const saved: EnquiryDraft = {
    ...draft,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(KEY, JSON.stringify([saved, ...items]));
  return saved;
}
