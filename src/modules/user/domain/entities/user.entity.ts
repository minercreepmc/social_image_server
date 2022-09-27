import { AggregateRoot } from 'src/shared/ddd/domain/base-classes/aggregate-root.base';
import { CreateEntityProps } from 'src/shared/ddd/domain/base-classes/entity.base';
import { UUID } from 'src/shared/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidExeception } from 'src/shared/exceptions/argument-invalid.exception';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';
import { UserRole } from './user.type';

export interface CreateUserProps {
  email: Email;
  password: Password;
}

export interface UserProps extends CreateUserProps {
  role: UserRole;
}

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: UUID;

  public static create(createProps: CreateUserProps) {
    const id = UUID.generate();

    const props: UserProps = { ...createProps, role: UserRole.guest };

    const newUser = new UserEntity({ id, props });
    return newUser;
  }

  public static isValid(candidate: object) {
    if (!(candidate instanceof UserEntity)) return false;
    return true;
  }

  protected guard(props: UserProps): void {
    super.guard(props);
    if (!UserEntity.isValid(props)) {
      throw new ArgumentInvalidExeception('Incorrect user');
    }
  }

  private constructor({ id, props }: CreateEntityProps<UserProps>) {
    super({ id, props });
  }
}
