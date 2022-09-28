import { Result } from '@ddd/domain/base-classes/result';
import {
  ValueObject,
} from '@ddd/domain/base-classes/value-object.base';
import { Guard } from '@ddd/guard';
import { ArgumentInvalidExeception } from '@exceptions/argument-invalid.exception';

import validator from 'validator';

export class Password extends ValueObject<string> {
  public static create(value: string): Result<Password> {
    const result = Guard.resultBulk([
      super.guard(value),
      Password.guard(value),
    ]);

    if (result.isFailure) {
      return Result.fail(result.error);
    }

    return Result.ok(new Password(value));
  }

  private constructor(value: string) {
    super({ value });
  }

  get value() {
    return this.props.value;
  }

  public static isValid(candidate: string) {
    return validator.isStrongPassword(candidate.trim(), {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      returnScore: false,
    });
  }

  protected static guard(value: string): Result<void> {
    if (!Password.isValid(value)) {
      return Result.fail(new ArgumentInvalidExeception('Incorrect password'));
    }

    return Result.ok();
  }
}
