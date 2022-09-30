import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { UserRepositoryPort } from './user.repository.port';

export class UserRepository {
  async findOneById(id: string): UserEntity {}
  async save(entity: UserEntity): UserEntity {}
  async exist(email: Email): boolean {}
}
