interface RandomMethods_Basic {
  boolean(less: Numeric, more: Numeric, value: Bool): boolean;
  bool(less: Numeric, more: Numeric, value: Bool): boolean;

  natural(min?: Numeric, max?: Numeric): number;

  integer(min?: Numeric, max?: Numeric): number;
  int(min?: Numeric, max?: Numeric): number;

  float(min?: Numeric, max?: Numeric, dmin?: Numeric, dmax?: Numeric): number;

  character(pool?: string | Symbol): string;
  char(pool?: string | Symbol): string;

  string(length?: Numeric): string;
  string(pool: string, maxLength: Numeric): string;
  string(minLength: Numeric, maxLength: Numeric): string;
  string(
    pool: string | Symbol,
    minLength: Numeric,
    maxLength: Numeric
  ): string;

  str(length: Numeric): string;
  str(minLength: Numeric, maxLength: Numeric): string;
  str(pool: string | Symbol, minLength: Numeric, maxLength: Numeric): string;

  range(start: Numeric, stop: Numeric, step: Numeric): number[];

  echo(content: string = ""): string;
}
