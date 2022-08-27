type AreaItem = {
  id: string;
  pid?: string;
  name: string;
  parentId?: string;
  children?: Item[];
};

type Region = "东北" | "华北" | "华东" | "华中" | "华南" | "西南" | "西北";

interface RandomMethod_Address {
  region(): string;

  province(): string;

  city(prefix: boolean): string;

  county(prefix: boolean): string;

  zip(len: number): string;
}
