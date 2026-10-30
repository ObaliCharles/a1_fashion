import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Preferences = { emailUpdates: boolean; orderUpdates: boolean; whatsappUpdates: boolean };
const KEY = "a1fashion_local_preferences";
const defaults: Preferences = { emailUpdates: false, orderUpdates: true, whatsappUpdates: false };

export const Route = createFileRoute("/account/settings")({
  head: () => ({ meta: [{ title: "Settings — A1 FASHION" }] }),
  component: Settings,
});

function Settings() {
  const [preferences, setPreferences] = useState(defaults);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY);
      if (stored) setPreferences({ ...defaults, ...JSON.parse(stored) });
    } catch {
      // Preferences remain usable in memory when browser storage is unavailable.
    }
  }, []);
  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    const next = { ...preferences, [key]: value };
    setPreferences(next);
    setSaved(false);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }
  return (
    <div>
      <h1 className="font-serif text-3xl">Communication preferences</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        These choices are stored in this browser only. A1 customer accounts are not connected yet.
      </p>
      <div className="mt-8 max-w-md space-y-3">
        <label className="flex cursor-pointer items-center justify-between border border-border p-4 text-sm">
          Fashion news and launches
          <input
            type="checkbox"
            checked={preferences.emailUpdates}
            onChange={(event) => update("emailUpdates", event.target.checked)}
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between border border-border p-4 text-sm">
          Order status updates
          <input
            type="checkbox"
            checked={preferences.orderUpdates}
            onChange={(event) => update("orderUpdates", event.target.checked)}
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between border border-border p-4 text-sm">
          WhatsApp updates
          <input
            type="checkbox"
            checked={preferences.whatsappUpdates}
            onChange={(event) => update("whatsappUpdates", event.target.checked)}
          />
        </label>
      </div>
      <p role="status" className="mt-4 min-h-5 text-xs text-muted-foreground">
        {saved ? "Preference saved on this device." : "Changes remain on this device only."}
      </p>
    </div>
  );
}
