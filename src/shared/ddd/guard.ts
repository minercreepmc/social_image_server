import { ArgumentInvalidExeception } from '@exceptions/argument-invalid.exception';
import { ArgumentNotProvidedException } from '@exceptions/argument-not-provided.exception';
import { Exception } from '@exceptions/exception.base';
import { Result } from './domain/base-classes/result';

export class Guard {
  static isEmpty(value: unknown): Result<Exception> {
    const emptyResult = Result.resultBulk([
      Guard.isNullOrUndefined(value),
      Guard.isArrayEmpty(value),
      Guard.isEmptyString(value),
    ]);

    if (emptyResult.isFailure) {
      return Result.fail(emptyResult.error);
    }

    return Result.ok();
  }

  static isNullOrUndefined(value: unknown): Result<Exception> {
    if (typeof value === undefined || typeof value === null) {
      return Result.fail(
        ArgumentNotProvidedException.create(
          'Argument cannot null or undefined',
        ),
      );
    }

    return Result.ok();
  }

  static isArrayEmpty(value: unknown): Result<Exception> {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return Result.fail(
          ArgumentInvalidExeception.create('Array cannot empty'),
        );
      }
      if (value.every((item) => Guard.isNullOrUndefined(item))) {
        return Result.fail(
          ArgumentInvalidExeception.create(
            'Item of array cannot contain null or undefined',
          ),
        );
      }
    }

    return Result.ok();
  }

  static isEmptyString(value: unknown): Result<Exception> {
    if (value === '') {
      return Result.fail(
        ArgumentInvalidExeception.create('String cannot empty'),
      );
    }

    return Result.ok();
  }
}
