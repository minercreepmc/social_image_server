import { Result } from '@core/domain/base-classes/result';
import { Exception } from '@exceptions';

export interface Guard {
  guard(): Result<Exception | any>;
}
