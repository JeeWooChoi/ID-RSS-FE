import * as XLSX from "xlsx";
import type { PodcastResult } from "@/entities/podcast/types";

export const downloadExcel = (
  results: PodcastResult[],
  fileName = "result.xlsx",
) => {
  const data = results.map((r) => ({
    행: r.rowIndex,
    채널명: r.channelName,
    "Apple ID": r.appleId,
    RSS: r.rssUrl,
    상태: r.status,
    기타: r.reason || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
  XLSX.writeFile(workbook, fileName);
};
