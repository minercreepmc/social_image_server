import { Result } from '@ddd/domain/base-classes/result';
import { ValueObject } from '@ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidExeception } from '@exceptions/argument-invalid.exception';
import validator from 'validator';
import { Exception } from '@exceptions/exception.base';

export class UserEmail extends ValueObject<string> {
  public static create(value: string): Result<Exception | UserEmail> {
    const guardResult = Result.resultBulk([
      super.guard(value),
      UserEmail.guard(value),
    ]);

    if (guardResult.isFailure) {
      return Result.fail(guardResult.error);
    }

    return Result.ok(new UserEmail(value));
  }

  private constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  get name(): string {
    return this.value.substring(0, this.value.indexOf('@'));
  }

  get domain(): string {
    return this.value.substring(this.value.indexOf('@') + 1, this.name.length);
  }

  public static isValid(candidate: string) {
    return validator.isEmail(candidate.trim());
  }

  protected static guard(value: string): Result<Exception> {
    if (!UserEmail.isValid(value)) {
      return Result.fail(ArgumentInvalidExeception.create('Incorrect email'));
    }

    return Result.ok();
  }
}
