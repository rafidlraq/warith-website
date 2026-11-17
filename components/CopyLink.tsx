"use client";

import { useState } from "react";

export default function CopyLink({ label, copiedLabel }: { label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const input = document.createElement("textarea");
      input.value = window.location.href;
      input.setAttribute("readonly", "true");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(successful);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <button className="copy-button" type="button" onClick={handleCopy} aria-live="polite">
      <span aria-hidden="true">{copied ? "✓" : "↗"}</span>
      {copied ? copiedLabel : label}
    </button>
  );
}
