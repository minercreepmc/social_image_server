import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import { ArgumentNotProvidedException } from 'src/shared/exceptions/argument-not-provided.exception';
import { Guard } from '../../guard';
import { Result, ResultError } from './result.base';

type Primitive = string | boolean | number;
export interface DomainPrimitive<T extends Primitive | Date> {
  value: T;
}
type ValueObjectProps<T> = T extends Primitive | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  protected constructor(props: ValueObjectProps<T>) {
    this.props = props;
  }

  abstract get value(): T;

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;

    return JSON.stringify(vo) === JSON.stringify(this);
  }

  protected static guard(value: unknown): Result<unknown> {
    if (Guard.isEmpty(value)) {
      return Result.fail(
        new ArgumentNotProvidedException(
          'Value object prop cannot be null or undefined',
        ),
      );
    }

    return Result.ok<unknown>(value);
  }
}
