export type TEbayCard = {
  itemData: TEbayCardItemData;
};

export type TEbayCardItemData = {
  itemId: number;
  itemUrl: string;
  pictures: Array<string>;
};
