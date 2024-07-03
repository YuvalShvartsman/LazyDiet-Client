export function isProperty<T extends object>(
  key: keyof any,
  object: T
): key is keyof T {
  return key in object;
}
