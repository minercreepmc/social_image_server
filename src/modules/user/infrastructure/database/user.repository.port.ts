import { Exist, FindOneById, Save } from '@ddd/domain/ports/repository.port';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

export interface UserRepositoryPort
  extends FindOneById<UserEntity>,
    Save<UserEntity>,
    Exist {
  exist(email: string): Promise<boolean>;
}
