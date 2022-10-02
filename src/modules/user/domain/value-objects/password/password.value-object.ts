import { Result } from '@core/domain/base-classes/result';
import { ValueObject } from '@core/domain/base-classes/value-object.base';
import { Exception, ArgumentInvalidExeception } from '@exceptions';

import validator from 'validator';
import { Password } from './password.interface';

export class BasePassword extends ValueObject<string> implements Password {
  get value() {
    return this.props.value;
  }

  public static create(value: string) {
    const password = new BasePassword(value);
    return password.guard();
  }

  public guard(): Result<Exception | BasePassword> {
    if (!BasePassword.isValid(this)) {
      return Result.fail(
        ArgumentInvalidExeception.create('Incorrect password'),
      );
    }

    return Result.ok(this);
  }
  public static isValid(candidate: string | BasePassword) {
    let parsedCandidate: string;
    if (typeof candidate === 'string') {
      parsedCandidate = candidate.trim();
    } else if (candidate instanceof BasePassword) {
      parsedCandidate = candidate.value;
    }

    return validator.isStrongPassword(parsedCandidate, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      returnScore: false,
    });
  }

  protected constructor(value: string) {
    super({ value });
  }
}
