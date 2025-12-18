
export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface Wallpaper {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: AspectRatio;
  createdAt: number;
  tags: string[];
}

export interface GenerationParams {
  prompt: string;
  aspectRatio: AspectRatio;
  style?: string;
}
