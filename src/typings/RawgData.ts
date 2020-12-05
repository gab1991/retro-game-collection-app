interface IRawgPlatform {
  id: number;
  name: string;
  slug: string;
}

export interface IRawgGame {
  slug: string;
  name: string;
  platforms: Array<IRawgPlatform>;
  released: string;
  background_image: string;
}

export interface IRawgPageData {
  count: number;
}
