import { Result } from '@core/domain/base-classes/result';
import * as argon2 from 'argon2';

export class PasswordUtil {
  static async hashPassword(plainPassword: string) {
    const hash = await argon2.hash(plainPassword);
    return hash;
  }
}
