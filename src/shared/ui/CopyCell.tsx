import { useState } from "react";
import { Check, Copy } from "lucide-react";
interface CopyCellProps {
  value: string;
  mono?: boolean;
}

export const CopyCell = ({ value, mono }: CopyCellProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <td className="px-4 py-3 group">
      <div className="flex items-center justify-center gap-2 ">
        <span
          className={`${mono ? "text-gray-300" : "text-gray-200 font-medium"} truncate max-w-[240px]`}
        >
          {value}
        </span>
        <button
          onClick={handleCopy}
          className={`opacity-0 group-hover:opacity-100 text-xs px-1.5 py-0.5 rounded transition-all cursor-pointer shrink-0 ${
            copied
              ? "text-secondary-color"
              : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200"
          }`}
        >
          {value && (copied ? <Check size={12} /> : <Copy size={12} />)}
        </button>
      </div>
    </td>
  );
};
