type RandomMethod = RandomMethod_Address &
  RandomMethod_Basic & {
    pick<T = any>(arr: T[]): T;
    pick<T = any>(...arr: T[]): T;
    pick<T = any>(arr: T[]): T;
    pick<T = any>(arr: T[], min: nummeric, max: nummeric): T | T[];

    extend(...args: any[]): any;
  };
