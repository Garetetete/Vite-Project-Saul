export interface GiphyResponse {
  data: GiphyItem[]
}

export interface GiphyItem {
  id: string;
  title: string;
  images: GiphyItemImage
}

export interface GiphyItemImage {
  original: GiphyItemImageOriginal
}

export interface GiphyItemImageOriginal {
  url: string;
}

