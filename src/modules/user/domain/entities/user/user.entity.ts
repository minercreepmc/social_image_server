import { Result } from '@core/domain/base-classes/result';
import { AggregateRoot } from '@core/domain/base-classes/aggregate-root.base';
import { CreateEntityProps } from '@core/domain/base-classes/entity.base';
import { UUID } from '@core/domain/value-objects/id';
import { Exception } from '@exceptions';
import { CreateUserProps, User, UserProps, UserRole } from './user.interface';

export class UserEntity extends AggregateRoot<UserProps> implements User {
  protected readonly _id: UUID;

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  public static create(createProps: CreateUserProps): Result<Exception | User> {
    const uuidOrError = UUID.create();

    if (uuidOrError.isFailure) {
      return Result.fail(uuidOrError.value);
    }

    const uuid = uuidOrError.value;
    const props: UserProps = { ...createProps, role: UserRole.guest };

    const newUser = new UserEntity({ id: uuid, props });
    return newUser.guard();
  }

  public guard(): Result<Exception | UserEntity> {
    return Result.ok(this);
  }

  private constructor({ id, props }: CreateEntityProps<UserProps>) {
    super({ id, props });
  }
}
