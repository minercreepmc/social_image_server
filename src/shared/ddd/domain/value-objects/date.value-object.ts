import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import {
  DomainPrimitive,
  ValueObject,
} from '../base-classes/value-object.base';

export type DateVOValue = Date | string | number;

export class DateVO extends ValueObject<Date> {
  constructor(value: DateVOValue) {
    const date = new Date(value);
    super({ value: date });
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

  protected guard(props: DomainPrimitive<Date>): void {
    super.guard(props);
    if (DateVO.isValid(props.value)) {
      throw new ArgumentInvalidExeception('Incorrect date');
    }
  }
}
