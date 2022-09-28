import { Result } from '@ddd/domain/base-classes/result';
import { Guard } from '@ddd/guard';
import { ValueObject } from '@ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidExeception } from '@exceptions/argument-invalid.exception';
import validator from 'validator';

export class Email extends ValueObject<string> {
  public static create(value: string): Result<Email> {
    const emailOrError = Guard.resultBulk([
      super.guard(value),
      Email.guard(value),
    ]);

    if (emailOrError.isFailure) {
      return Result.fail(emailOrError.error);
    }

    return Result.ok(new Email(value));
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

  protected static guard(value: string): Result<void> {
    if (!Email.isValid(value)) {
      return Result.fail(new ArgumentInvalidExeception('Incorrect email'));
    }

    return Result.ok();
  }
}
