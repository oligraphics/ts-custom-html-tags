import { ICustomTag } from '../interfaces/custom-tag.interface';
import { DynamicContext } from 'ts-logic-framework';
import { ICustomTagHandler } from '../interfaces/custom-tag-handler.interface';

export abstract class TagHandlerServiceModel implements ICustomTagHandler {
  get tagIsEscaped() {
    return false;
  }
  get customPattern() {
    return undefined;
  }
  get parseContent() {
    return true;
  }
  abstract build(tag: ICustomTag, context: DynamicContext): string;
}
