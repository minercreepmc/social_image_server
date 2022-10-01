import { Guard } from '@ddd/guard';
import { RequestDTO } from '@ddd/interface-adapters/base-classes/request.dto.base';
import { ArgumentNotProvidedException } from '@exceptions/argument-not-provided.exception';
import { Exception } from '@exceptions/exception.base';
import { Result } from './result';

export abstract class Command<DTO> {
  protected constructor(readonly dto?: RequestDTO<DTO>) {}

  protected static guard(props: unknown): Result<Exception> {
    if (Guard.isEmpty(props)) {
      return Result.fail(
        new ArgumentNotProvidedException('Command props should not be empty'),
      );
    }
    return Result.ok();
  }
}
