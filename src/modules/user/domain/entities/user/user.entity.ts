import { Result } from '@ddd/domain/base-classes/result';
import { Exception } from '@exceptions/exception.base';
import { AggregateRoot } from '@ddd/domain/base-classes/aggregate-root.base';
import { CreateEntityProps } from '@ddd/domain/base-classes/entity.base';
import { UUID } from '@ddd/domain/value-objects/uuid.value-object';
import { Email } from '../../value-objects/email';
import { Password } from '../../value-objects/password';
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

  public static create(createProps: CreateUserProps): Result<UserEntity> {
    const result = Result.resultBulk([
      super.guard(createProps),
      UserEntity.guard(createProps),
    ]);

    if (result.isFailure) {
      return Result.fail(result.error);
    }

    const uuidOrError = UUID.create();

    if (uuidOrError.isFailure) {
      return Result.fail(uuidOrError.error);
    }

    const uuid = uuidOrError.value;
    const props: UserProps = { ...createProps, role: UserRole.guest };

    const newUser = new UserEntity({ id: uuid, props });
    return Result.ok(newUser);
  }

  protected static guard(props: CreateUserProps): Result<Exception> {
    return Result.ok();
  }

  private constructor({ id, props }: CreateEntityProps<UserProps>) {
    super({ id, props });
  }
}
