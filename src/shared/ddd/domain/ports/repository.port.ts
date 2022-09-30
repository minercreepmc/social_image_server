import { DeepPartial } from '@shared/types/deep-partial.type';
import { BaseEntityProps } from '../base-classes/entity.base';
export type QueryParams<EntityProps> = DeepPartial<
  BaseEntityProps<EntityProps>
>;

export interface FindOne<Entity, EntityProps> {
  findOne(params: QueryParams<EntityProps>): Promise<Entity>;
}

export interface FindOneById<Entity> {
  findOneById(id: string): Promise<Entity>;
}

export interface Save<Entity> {
  save(entity: Entity): Promise<Entity>;
}

export abstract class Exist{
  abstract exist(field: any): Promise<boolean>;
}

export interface RepositoryPort<Entity, EntityProps>
  extends FindOne<Entity, EntityProps>,
    Save<Entity>,
    FindOneById<Entity> {}
