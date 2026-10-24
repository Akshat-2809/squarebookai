const inr = new Intl.NumberFormat("en-IN");

/** Indian digit grouping, e.g. 18400 → "18,400", 482000 → "4,82,000". */
export const fmt = (n: number) => inr.format(n);
