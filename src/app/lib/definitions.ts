export type Game = {
  id: number;
  name: string;
  slug: string;
  supportsaddons: boolean;
  supportsvoice: boolean;
  datemodified: string;
  assets: Array<{
    id: number;
    gameid: number;
    name: string;
  }>;
  gamefiles: [];
  gameorder: number;
};
