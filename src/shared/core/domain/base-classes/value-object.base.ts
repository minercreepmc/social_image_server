import { Exception } from '@exceptions';
import { Result } from './result';
import { Guard, GuardUtils } from '@core/guard';

type Primitive = string | boolean | number;
export interface DomainPrimitive<T extends Primitive | Date> {
  value: T;
}
type ValueObjectProps<T> = T extends Primitive | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> implements Guard {
  protected readonly props: ValueObjectProps<T>;
  abstract get value(): T;

  protected constructor(props: ValueObjectProps<T>) {
    this.props = props;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;

    return JSON.stringify(vo) === JSON.stringify(this);
  }

  public guard(): Result<Exception | ValueObject<T>> {
    const emptyGuardResult = GuardUtils.isEmpty(this);
    if (emptyGuardResult.isFailure) {
      return emptyGuardResult;
    }

    return Result.ok();
  }
}
