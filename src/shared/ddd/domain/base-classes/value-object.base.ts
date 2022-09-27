import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import { ArgumentNotProvidedException } from 'src/shared/exceptions/argument-not-provided.exception';
import { Guard } from '../../guard';

type Primitive = string | boolean | number;
export interface DomainPrimitive<T extends Primitive | Date> {
  value: T;
}
type ValueObjectProps<T> = T extends Primitive | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.guard(props);
    this.props = props;
  }

  abstract get value(): T;

  protected guard(props: ValueObjectProps<T>): void {
    if (Guard.isEmpty(props))
      throw new ArgumentNotProvidedException('Argument was not provided');
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;

    return JSON.stringify(vo) === JSON.stringify(this);
  }
}
