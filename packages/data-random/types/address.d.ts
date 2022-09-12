type RandomAreaItem = {
  id: string;
  pid?: string;
  name: string;
  parentId?: string;
  children?: Item[];
};

type RandomRegion = "东北" | "华北" | "华东" | "华中" | "华南" | "西南" | "西北";

interface RandomMethods_Address {
  region(): string;

  province(): string;

  city(prefix: Bool): string;

  county(prefix: Bool): string;

  zip(len: Numeric): string;
}
