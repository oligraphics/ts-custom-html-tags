import { TagHandlerServiceModel } from './tag-handler-service.model';

export abstract class EscapedTagHandlerServiceModel extends TagHandlerServiceModel {
  get tagIsEscaped() {
    return true;
  }
}