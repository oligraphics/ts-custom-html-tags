import { ICustomTag } from '../interfaces/custom-tag.interface';
import { DynamicContext } from 'ts-logic-framework';
import { ICustomTagHandler } from '../interfaces/custom-tag-handler.interface';
export declare abstract class TagHandlerServiceModel implements ICustomTagHandler {
    get tagIsEscaped(): boolean;
    get customPattern(): undefined;
    abstract build(tag: ICustomTag, context: DynamicContext): string;
}
//# sourceMappingURL=tag-handler-service.model.d.ts.map