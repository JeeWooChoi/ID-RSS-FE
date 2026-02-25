import type { PodcastResult } from "@/entities/podcast/types";
import { CopyButton } from "@/shared/ui/CopyButton";
import { downloadExcel } from "@/shared/utils/downloadExcel";
import { CopyCell } from "./CopyCell";

interface ResultTableProps {
  results: PodcastResult[];
  fileName?: string;
}

const COLUMNS: { key: keyof PodcastResult; label: string }[] = [
  { key: "rowIndex", label: "행" },
  { key: "channelName", label: "채널명" },
  { key: "appleId", label: "Apple ID" },
  { key: "rssUrl", label: "RSS URL" },
  { key: "status", label: "상태" },
  { key: "reason", label: "기타" },
];

const COPYABLE_KEYS: (keyof PodcastResult)[] = [
  "channelName",
  "appleId",
  "rssUrl",
];

export const ResultTable = ({
  results,
  fileName = "result.xlsx",
}: ResultTableProps) => {
  const handleDownloadExcel = () => {
    downloadExcel(results, fileName);
  };

  return (
    <div className="border border-gray-500 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm text-gray-400 tracking-widest uppercase">
          총 {results.length}개 항목
        </span>
        <button
          onClick={handleDownloadExcel}
          className="text-xs bg-secondary-color hover:bg-light-secondary-color text-black px-3 py-1.5 rounded-lg transition-all cursor-pointer"
        >
          ⬇️ 엑셀 다운로드
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              {COLUMNS.map(({ key, label }) => (
                <th
                  key={key}
                  className="text-left px-4 py-3 text-sm text-slate-500 tracking-wider uppercase"
                >
                  <div className="flex items-center gap-2">
                    {label}
                    {COPYABLE_KEYS.includes(key) && (
                      <CopyButton
                        text={results.map((r) => String(r[key])).join("\n")}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-4 py-3 text-gray-400 text-sm font-mono">
                  {r.rowIndex}
                </td>
                <CopyCell value={r.channelName} />
                <CopyCell value={r.appleId} mono />
                <CopyCell value={r.rssUrl} mono />
                <td
                  className={`px-4 py-3 text-sm font-mono ${r.status === "SUCCESS" ? "text-secondary-color" : r.status === "FAILED" ? "text-red-500" : "text-gray-400"}`}
                >
                  {r.status}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 font-mono">
                  {r.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
