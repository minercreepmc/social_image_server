import { Exception } from '@exceptions/exception.base';
import { Guard } from '../../guard';
import { DateVO } from '../value-objects/date.value-object';
import { ID } from '../value-objects/id.value-object';
import { Result } from './result';

export interface BaseEntityProps<T> {
  id: ID;
  props: T;
  createdAt: DateVO;
  updatedAt: DateVO;
}

export interface CreateEntityProps<T> {
  id: ID;
  props: T;
}

export abstract class Entity<EntityProps> {
  protected abstract _id: ID;
  private readonly _createdAt: DateVO;
  protected _updatedAt: DateVO;
  protected readonly props: EntityProps;

  protected constructor({ id, props }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    const now = DateVO.now();
    this._createdAt = now;
    this._updatedAt = now;
    this.props = props;
  }

  private setId(id: ID): void {
    this._id = id;
  }

  protected static guard(props: unknown): Result<Exception> {
    const guardResult = Guard.isEmpty(props);
    if (guardResult.isFailure) {
      return guardResult;
    }

    return Result.ok();
  }
}
