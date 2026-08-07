/** Casts dynamic keys for next-intl strict typing (video slugs, draft slugs, etc.). */
export function translateKey(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translator: any,
  key: string,
): string {
  return translator(key) as string;
}
