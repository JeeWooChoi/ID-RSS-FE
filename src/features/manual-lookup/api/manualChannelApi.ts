import { axiosInstance } from "@/shared/api/axiosInstance";
import type { PodcastResult } from "@/entities/podcast/types";

interface ManualChannelParams {
  channelName: string;
  country?: string;
}

export const manualChannelApi = async (
  params: ManualChannelParams,
): Promise<PodcastResult[]> => {
  const response = await axiosInstance.post("/manual-lookup/channel-name", {
    channelName: params.channelName,
    country: params.country ? params.country : null,
  });
  return response.data.data;
};
