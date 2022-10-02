import { Result } from '@core/domain/base-classes/result';
import {
  Exception,
  ArgumentInvalidExeception,
  ArgumentNotProvidedException,
} from '@exceptions';

export class GuardUtils {
  static isEmpty(value: unknown): Result<Exception> {
    const emptyResult = Result.resultBulk([
      GuardUtils.isNullOrUndefined(value),
      GuardUtils.isArrayEmpty(value),
      GuardUtils.isEmptyString(value),
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
      if (value.every((item) => GuardUtils.isNullOrUndefined(item))) {
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
