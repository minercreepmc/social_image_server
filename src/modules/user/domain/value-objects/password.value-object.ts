import {
  DomainPrimitive,
  ValueObject,
} from 'src/shared/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';

import validator from 'validator';

export class Password extends ValueObject<string> {
  constructor(value: string) {
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

  protected guard(props: DomainPrimitive<string>): void {
    super.guard(props);
    if (!Password.isValid(props.value)) {
      throw new ArgumentInvalidExeception('Incorrect password');
    }
  }
}
