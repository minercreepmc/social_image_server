import { Result } from '@ddd/domain/base-classes/result';
import { Guard } from '@ddd/guard';
import { Exception } from '@exceptions/exception.base';
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

  public static create(createProps: CreateUserProps): Result<UserEntity> {
    const result = Guard.resultBulk([
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

  public static isValid(candidate: object) {
    if (!(candidate instanceof UserEntity)) return false;
    return true;
  }

  protected static guard(props: CreateUserProps): Result<Exception> {
    if (!UserEntity.isValid(props)) {
      return Result.fail(new ArgumentInvalidExeception('Incorrect user'));
    }

    return Result.ok();
  }

  private constructor({ id, props }: CreateEntityProps<UserProps>) {
    super({ id, props });
  }
}
