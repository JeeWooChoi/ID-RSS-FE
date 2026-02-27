import { axiosInstance } from "@/shared/api/axiosInstance";
import type { PodcastResult } from "@/entities/podcast/types";

interface manualTopPodcastParams {
  limit?: string;
  country: string;
}

export const manualTopPodcastApi = async (
  params: manualTopPodcastParams,
): Promise<PodcastResult[]> => {
  const response = await axiosInstance.post("/manual-lookup/top-podcast", {
    limit: params.limit,
    country: params.country ? params.country : null,
  });
  return response.data.data;
};
