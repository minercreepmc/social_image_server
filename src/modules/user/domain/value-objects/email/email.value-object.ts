import { Result } from '@core/domain/base-classes/result';
import { ValueObject } from '@core/domain/base-classes/value-object.base';
import { Exception, ArgumentInvalidExeception } from '@exceptions';
import { Email } from './email.interface';
import validator from 'validator';

export class BaseEmail extends ValueObject<string> implements Email {
  get value(): string {
    return this.props.value;
  }

  public static create(value: string): Result<Exception | Email> {
    const email = new BaseEmail(value);
    return email.guard();
  }

  public guard(): Result<Exception | BaseEmail> {
    if (!BaseEmail.isValid(this)) {
      return Result.fail(ArgumentInvalidExeception.create('Incorrect email'));
    }

    return Result.ok(this);
  }

  public static isValid(candidate: string | Email) {
    let parsedCandidate: string;
    if (typeof candidate === 'string') {
      parsedCandidate = candidate.trim();
    } else if (candidate instanceof BaseEmail) {
      parsedCandidate = candidate.value;
    }
    return validator.isEmail(parsedCandidate);
  }

  private constructor(value: string) {
    super({ value });
  }
}
