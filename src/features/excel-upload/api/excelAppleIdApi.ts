import { axiosInstance } from "@/shared/api/axiosInstance";
import type { PodcastResult } from "@/entities/podcast/types";

interface ExcelAppleIdParams {
  file: File;
  sheetName: string;
  startRow: string;
  endRow: string;
  headerRow: string;
  channelNameColumn: string;
  appleIdColumn: string;
  rssColumn: string;
  country: string;
}

export const excelAppleIdApi = async (
  params: ExcelAppleIdParams,
): Promise<PodcastResult[]> => {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("sheetName", params.sheetName);
  formData.append("startRow", params.startRow);
  formData.append("endRow", params.endRow);
  formData.append("headerRow", params.headerRow);
  formData.append("channelNameColumn", params.channelNameColumn);
  formData.append("appleIdColumn", params.appleIdColumn);
  formData.append("rssColumn", params.rssColumn);
  formData.append("country", params.country);

  const response = await axiosInstance.post(
    "/bulk-import/excel-file-apple-id",
    formData,
  );
  return response.data;
};
