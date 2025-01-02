import { ICustomTagHandler } from '../interfaces/custom-tag-handler.interface';
import { IAttributes } from '../interfaces/attributes.interface';
import { DynamicContext } from 'ts-logic-framework';
export declare const CustomTagsService: {
    process(input: string, handlers: {
        [name: string]: ICustomTagHandler;
    }, context?: DynamicContext): string;
    _parseAttributes(value: string): IAttributes;
    _getPattern(name: string, handler: ICustomTagHandler): RegExp;
};
//# sourceMappingURL=custom-tags.service.d.ts.map