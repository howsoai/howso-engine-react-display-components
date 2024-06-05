/** Check if an value, array, or object is empty or invalid number or date */
export function isEmpty(obj: unknown): boolean {
  if (obj == null || isNull(obj)) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  return Object.keys(obj).length === 0;
}

/**
 * Checks if value is null like.
 * Values treated as null include: undefined | null | NaN | Invalid Date
 * @param value The value to check.
 * @returns True if value is null like.
 */
export function isNull(value: unknown): boolean {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return true;
  }
  if (value instanceof Date && isNaN(value as unknown as number)) {
    // Not a Time
    return true;
  }
  return false;
}
