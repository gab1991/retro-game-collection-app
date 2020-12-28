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
