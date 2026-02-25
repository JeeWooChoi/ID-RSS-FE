import { axiosInstance } from "@/shared/api/axiosInstance";
import type { PodcastResult } from "@/entities/podcast/types";

interface ManualAppleIdParams {
  appleId: string;
  country?: string;
}

export const manualAppleIdApi = async (
  params: ManualAppleIdParams,
): Promise<PodcastResult[]> => {
  const response = await axiosInstance.post("/manual-lookup/apple-id", {
    appleId: params.appleId,
    country: params.country ? params.country : null,
  });
  return response.data.data;
};
