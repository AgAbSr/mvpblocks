// ─── Featured YouTube video ──────────────────────────────────────────────────
// A shout-out video where Jan Marshal talks about MVPBlocks.
//
// NOTE: View / like / comment counts are a manually-maintained snapshot. YouTube
// live stats require an API key + a request on every render, which goes against
// keeping the homepage instant (see the GitHub Code Frequency fix). Update these
// numbers here whenever you want them refreshed — the UI reads them locally.

export interface VideoStats {
  views: number;
  likes: number;
  comments: number;
}

export interface FeaturedVideo {
  /** YouTube video id */
  id: string;
  /** Where to deep-link when "watch on YouTube" is clicked */
  watchUrl: string;
  /** Seconds to start playback from inside the dialog */
  startSeconds: number;
  title: string;
  channelName: string;
  channelUrl: string;
  channelAvatar: string;
  /** Max-res thumbnail (falls back to hqdefault on error) */
  thumbnail: string;
  thumbnailFallback: string;
  /** Human-readable publish label */
  publishedLabel: string;
  stats: VideoStats;
}

export const featuredVideo: FeaturedVideo = {
  id: 'kh-QOXuwywg',
  watchUrl: 'https://www.youtube.com/watch?v=kh-QOXuwywg&t=225s',
  startSeconds: 225,
  title: 'I found the BEST React Component Libraries Built on top of Shadcn UI',
  channelName: 'Jan Marshal',
  channelUrl: 'https://www.youtube.com/@janmarshalcoding',
  channelAvatar: 'https://unavatar.io/youtube/janmarshalcoding',
  thumbnail: 'https://img.youtube.com/vi/kh-QOXuwywg/maxresdefault.jpg',
  thumbnailFallback: 'https://img.youtube.com/vi/kh-QOXuwywg/hqdefault.jpg',
  publishedLabel: 'Featured',
  stats: {
    views: 24800,
    likes: 812,
    comments: 73,
  },
};
