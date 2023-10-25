export type Product = {
  id: string;
  creatorId: string;
  createTime: string;
};

export type Creator = {
  id: string;
  email: string;
};

export type Data = {
  Creators: Creator[];
  Products: Product[];
};
