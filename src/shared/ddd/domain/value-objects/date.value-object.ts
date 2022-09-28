import { Guard } from '@ddd/guard';
import { Exception } from '@exceptions/exception.base';
import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import { Result } from '../base-classes/result';
import {
  ValueObject,
} from '../base-classes/value-object.base';

export type DateVOValue = Date | string | number;

export class DateVO extends ValueObject<Date> {
  public static create(value: DateVOValue): Result<DateVO> {
    const result = Guard.resultBulk([super.guard(value), DateVO.guard(value)]);

    if (result.isFailure) {
      return Result.fail(result.error);
    }

    return Result.ok(new DateVO(value));
  }

  public get value(): Date {
    return this.props.value;
  }

  public static now() {
    return new DateVO(Date.now());
  }

  public static isValid(candidate: DateVOValue) {
    if (typeof candidate === 'string') {
      const parsed = Date.parse(candidate.trim());
      if (!Number.isNaN(parsed)) return true;
    } else if (candidate instanceof Date && !Number.isNaN(candidate)) {
      return true;
    }

    return false;
  }

  protected static guard(value: DateVOValue): Result<Exception> {
    if (DateVO.isValid(value)) {
      return Result.fail(new ArgumentInvalidExeception('Incorrect date'));
    }

    return Result.ok(value);
  }

  private constructor(value: DateVOValue) {
    const date = new Date(value);
    super({ value: date });
  }
}
