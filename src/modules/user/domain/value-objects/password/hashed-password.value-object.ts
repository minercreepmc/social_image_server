import { ValueObject } from "@core/domain/base-classes/value-object.base";
import { Password } from "./password.interface";

export class HashedPassword extends ValueObject<string> implements Password  {
  get value() {
    return this.props.value;
  }

  static create(value: string | Password)  {
  }

  
}
