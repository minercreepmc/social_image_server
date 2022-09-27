import {
  DomainPrimitive,
  ValueObject,
} from 'src/shared/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import validator from 'validator';

export class Email extends ValueObject<string> {
  constructor(value: string) {
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

  protected guard(props: DomainPrimitive<string>): void {
    super.guard(props);
    if (!Email.isValid(props.value)) {
      throw new ArgumentInvalidExeception('Incorrect email');
    }
  }
}
