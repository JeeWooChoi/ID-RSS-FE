export interface PodcastResult {
  rowIndex: number;
  channelName: string;
  appleId: string;
  rssUrl: string;
  status: "SUCCESS" | "FAILED";
  reason?: string;
}
