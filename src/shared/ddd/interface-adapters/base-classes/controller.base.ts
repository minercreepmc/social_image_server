import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export abstract class BaseController {
  protected constructor(protected readonly commandBus: CommandBus) {}
}
