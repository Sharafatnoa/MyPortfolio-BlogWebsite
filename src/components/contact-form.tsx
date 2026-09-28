"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    if (!WEB3FORMS_KEY) {
      // No form backend configured yet — fall back to opening the user's mail client.
      window.location.href = `mailto:sharafatnoa@gmail.com?subject=${encodeURIComponent(
        "Message from snarefin.me",
      )}&body=${encodeURIComponent(`${message}\n\n— ${email}`)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email,
          message,
          subject: "New message from snarefin.me",
          from_name: "snarefin.me contact form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="max-w-[460px] rounded-[8px] border border-line bg-panel p-[22px]">
        <p className="m-0 font-mono text-xs text-tech">message queued ✓</p>
        <p className="m-0 mt-[10px] text-[14.5px] text-ink2" style={{ lineHeight: 1.6 }}>
          Thanks for writing. You&apos;ll hear back at the address you gave.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[460px] flex-col gap-[14px]">
      <label className="flex flex-col gap-[7px]">
        <span className="font-mono text-[10.5px] text-ink2">your email</span>
        <input
          type="email"
          name="email"
          required
          placeholder="you@domain.com"
          className="rounded-[6px] border border-line bg-panel px-3 py-[11px] text-sm text-ink"
        />
      </label>
      <label className="flex flex-col gap-[7px]">
        <span className="font-mono text-[10.5px] text-ink2">message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="A sentence or two is plenty."
          className="resize-y rounded-[6px] border border-line bg-panel px-3 py-[11px] text-sm text-ink"
        />
      </label>
      {status === "error" && (
        <p className="m-0 font-mono text-[11px]" style={{ color: "var(--journal)" }}>
          Something went wrong sending that — try emailing sharafatnoa@gmail.com directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-[6px] px-5 py-[11px] text-sm font-medium disabled:opacity-60"
        style={{ background: "var(--ink)", color: "var(--bg)" }}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
