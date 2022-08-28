type nummeric = number | string;

const p = (input: nummeric, radix?: number | undefined) =>
  parseInt(input as string, radix);

interface RandomMethods_Basic {
  boolean(less: nummeric, more: nummeric, value: boolean): boolean;
  bool(less: nummeric, more: nummeric, value: boolean): boolean;

  natural(min: nummeric, max: nummeric): number;

  integer(min: nummeric, max: nummeric): number;
  int(min: nummeric, max: nummeric): number;

  float(min: nummeric, max: nummeric, dmin: number, dmax: number): number;

  character(pool?: string | Symbol): string;
  char(pool: string | Symbol): string;

  string(length: nummeric): string;
  string(pool: string, maxLength: nummeric): string;
  string(minLength: nummeric, maxLength: nummeric): string;
  string(
    pool: string | Symbol,
    minLength: nummeric,
    maxLength: nummeric
  ): string;

  str(length: nummeric): string;
  str(minLength: nummeric, maxLength: nummeric): string;
  str(pool: string | Symbol, minLength: nummeric, maxLength: nummeric): string;

  range(start: number, stop: number, step: number): number[];

  echo(content: string = ""): string;
}
