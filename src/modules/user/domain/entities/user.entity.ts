import { AggregateRoot } from 'src/shared/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from 'src/shared/ddd/domain/value-objects/uuid.value-object';

export interface CreateUserProps {
  email: string;
  password: string;
}

export interface UserProps extends CreateUserProps {
  role: string;
}

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: UUID;
}
