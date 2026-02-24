import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = (): void => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      style={{
        background: copied ? "#22c55e22" : "#ffffff10",
        border: `1px solid ${copied ? "#22c55e" : "#ffffff20"}`,
        color: copied ? "#22c55e" : "#94a3b8",
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 11,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {copied ? "✓ 복사됨" : "복사"}
    </button>
  );
};
