import { Exception } from '@exceptions/exception.base';
import { ArgumentNotProvidedException } from '@exceptions/argument-not-provided.exception';
import { Guard } from '../../guard';
import { Result } from './result';

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

  protected static guard(value: unknown): Result<Exception> {
    if (Guard.isEmpty(value)) {
      return Result.fail(
        ArgumentNotProvidedException.create(
          'Value object prop cannot be null or undefined',
        ),
      );
    }

    return Result.ok();
  }
}
