import { ArgumentNotProvidedException } from 'src/shared/exceptions/argument-not-provided.exception';
import { Guard } from '../../guard';
import { DateVO } from '../value-objects/date.value-object';
import { ID } from '../value-objects/id.value-object';

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

  constructor({ id, props }: CreateEntityProps<EntityProps>) {
    this.guardProps(props);
    this.setId(id);
    const now = DateVO.now();
    this._createdAt = now;
    this._updatedAt = now;
    this.props = props;
    // TODO: validate
  }

  private setId(id: ID): void {
    this._id = id;
  }

  private guardProps(props: EntityProps): void {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Entity props should not be empty',
      );
    }
  }

  public abstract validate(): void;
}
