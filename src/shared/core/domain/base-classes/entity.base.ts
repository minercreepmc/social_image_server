import { Exception } from '@exceptions';
import { Guard, GuardUtils } from '@core/guard';
import { Result } from './result';
import { ID } from '../value-objects/id';
import { DateVO } from '../value-objects/date';

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

export abstract class Entity<EntityProps> implements Guard {
  protected abstract _id: ID;
  private readonly _createdAt: DateVO;
  protected _updatedAt: DateVO;
  protected readonly props: EntityProps;

  public guard(): Result<Exception | Entity<EntityProps>> {
    const guardResult = GuardUtils.isEmpty(this);
    if (guardResult.isFailure) {
      return guardResult;
    }

    return Result.ok(this);
  }

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
}
