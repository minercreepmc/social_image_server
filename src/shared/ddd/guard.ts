import { ArgumentInvalidExeception } from '@exceptions/argument-invalid.exception';
import { ArgumentNotProvidedException } from '@exceptions/argument-not-provided.exception';
import { Result } from './domain/base-classes/result';

export class Guard {
  static isEmpty(value: unknown): Result<void> {
    const successOrFail = Guard.resultBulk([
      Guard.isNullOrUndefined(value),
      Guard.isArrayEmpty(value),
      Guard.isEmptyString(value),
    ]);

    if (successOrFail.isFailure) {
      return Result.fail(successOrFail.error);
    }

    return Result.ok();
  }

  static isNullOrUndefined(value: unknown): Result<void> {
    if (typeof value === undefined || typeof value === null) {
      return Result.fail(
        new ArgumentNotProvidedException('Argument cannot null or undefined'),
      );
    }

    return Result.ok();
  }

  static isArrayEmpty(value: unknown): Result<void> {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return Result.fail(new ArgumentInvalidExeception('Array cannot empty'));
      }
      if (value.every((item) => Guard.isNullOrUndefined(item))) {
        return Result.fail(
          new ArgumentInvalidExeception(
            'Item of array cannot contain null or undefined',
          ),
        );
      }
    }

    return Result.ok();
  }

  static isEmptyString(value: unknown): Result<void> {
    if (value === '') {
      return Result.fail(new ArgumentInvalidExeception('String cannot empty'));
    }

    return Result.ok();
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

  static resultBulk(results: Result<any>[]): Result<void> {
    results.forEach((result) => {
      if (result.isFailure) {
        return Result.fail(result.error);
      }
    });

    return Result.ok();
  }
}
