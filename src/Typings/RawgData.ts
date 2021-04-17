interface IRawgPlatform {
  id: number;
  name: string;
  slug: string;
}

export interface IRawgGame {
  background_image: string;
  name: string;
  platforms: Array<IRawgPlatform>;
  released: string;
  slug: string;
}

export interface IRawgPageData {
  count: number;
}

export interface IRawgGameDetails {
  description: string;
  developers: Array<{ name: string }>;
  name: string;
  publishers: Array<{ name: string }>;
  released: string;
}

export interface IRawgScreenshot {
  image: string;
}
