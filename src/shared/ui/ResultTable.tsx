import type { PodcastResult } from "@/entities/podcast/types";
import type { MouseEvent } from "react";
import { CopyButton } from "./CopyButton";

interface ResultTableProps {
  rows: PodcastResult[];
}
export const ResultTable = ({ rows }: ResultTableProps) => (
  <div style={{ overflowX: "auto", marginTop: 20 }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #ffffff15" }}>
          {["채널명", "Apple ID", "RSS URL", ""].map((h) => (
            <th
              key={h}
              style={{
                textAlign: "left",
                padding: "10px 14px",
                color: "#64748b",
                fontWeight: 600,
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: 1,
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={i}
            style={{
              borderBottom: "1px solid #ffffff08",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e: MouseEvent<HTMLTableRowElement>) =>
              (e.currentTarget.style.background = "#ffffff05")
            }
            onMouseLeave={(e: MouseEvent<HTMLTableRowElement>) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <td
              style={{
                padding: "12px 14px",
                color: "#e2e8f0",
                fontWeight: 500,
              }}
            >
              {r.channel}
            </td>
            <td
              style={{
                padding: "12px 14px",
                color: "#94a3b8",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {r.appleId}
            </td>
            <td
              style={{
                padding: "12px 14px",
                color: "#7c96c4",
                fontFamily: "'DM Mono', monospace",
                maxWidth: 280,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {r.rss}
            </td>
            <td style={{ padding: "12px 14px" }}>
              <CopyButton text={r.rss} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
