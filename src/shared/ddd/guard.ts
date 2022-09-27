export class Guard {
  static isEmpty(value: unknown): boolean {
    if (typeof value === 'number' || typeof value === 'boolean') return false;
    if (typeof value === 'undefined' || typeof value === null) return true;
    if (value instanceof Object && !Object.keys(value).length) return true;
    if (Array.isArray(value)) {
      if (value.length === 0) return true;
      if (value.every((item) => Guard.isEmpty(item))) return true;
      return false;
    }
    if (value === '') return true;

    return false;
  }

  static lengthIsBetween(value: string, min: number, max: number) {
    if (Guard.isEmpty(value)) {
      throw new Error('Cannot check length of empty value');
    }

    const length = value.length;

    if (min <= length && length <= max) return true;

    return false;
  }

  static isMinimumLength(value: string, min: number) {
    if (Guard.isEmpty(value))
      throw new Error('Cannot check minimum of empty value');

    return value.length >= min;
  }
}
