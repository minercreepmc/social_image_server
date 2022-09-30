import { Result } from '@ddd/domain/base-classes/result';
import { ValueObject } from '@ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidExeception } from '@exceptions/argument-invalid.exception';
import { Exception } from '@exceptions/exception.base';

import validator from 'validator';

export class UserPassword extends ValueObject<string> {
  public static create(value: string): Result<Exception | UserPassword> {
    const result = Result.resultBulk([
      super.guard(value),
      UserPassword.guard(value),
    ]);

    if (result.isFailure) {
      return Result.fail(result.error);
    }

    return Result.ok(new UserPassword(value));
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

  protected static guard(value: string): Result<Exception> {
    if (!UserPassword.isValid(value)) {
      return Result.fail(
        ArgumentInvalidExeception.create('Incorrect password'),
      );
    }

    return Result.ok();
  }
}
