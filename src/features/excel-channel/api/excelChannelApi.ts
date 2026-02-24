import { axiosInstance } from "@/shared/api/axiosInstance";
import type { PodcastResult } from "@/entities/podcast/types";

interface ExcelChannelParams {
  file: File;
  sheetName: string;
  startRow: string;
  endRow: string;
  headerRow: string;
  channelNameColumn: string;
  appleIdColumn: string;
  rssColumn: string;
  country: string;
  overwrite: boolean;
  returnFile: boolean;
}

export const excelChannelApi = async (
  params: ExcelChannelParams,
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
  formData.append("overwrite", String(params.overwrite));
  formData.append("returnFile", String(params.returnFile));

  const response = await axiosInstance.post(
    "/bulk-import/excel-file-channel",
    formData,
    {
      responseType: params.returnFile ? "blob" : "json", // returnFile이면 blob으로 받기
    },
  );
  return response.data;
};
