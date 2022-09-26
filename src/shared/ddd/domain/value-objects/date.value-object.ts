import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import {
  DomainPrimitive,
  ValueObject,
} from '../base-classes/value-object.base';

export class DateVO extends ValueObject<Date> {
  constructor(value: Date | string | number) {
    const date = new Date(value);
    super({ value: date });
  }

  get value(): Date {
    return this.props.value;
  }

  static now() {
    return new DateVO(Date.now());
  }

  protected guard({ value }: DomainPrimitive<Date>): void {
    if (!(value instanceof Date)) {
      throw new ArgumentInvalidExeception('Incorrect date');
    }
  }
}
