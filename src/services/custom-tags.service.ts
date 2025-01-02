import { ICustomTagHandler } from '../interfaces/custom-tag-handler.interface';
import { CustomTag } from '../models/custom-tag.model';
import { IAttributes } from '../interfaces/attributes.interface';
import { DynamicContext } from 'ts-logic-framework';
import { IAttribute } from '../interfaces/attribute.interface';

export const CustomTagsService = new (class CustomHtmlTagsService {
  process(
    input: string,
    handlers: { [name: string]: ICustomTagHandler },
    context: DynamicContext = {},
  ): string {
    let current = input;
    for (const [name, handler] of Object.entries(handlers)) {
      const pattern = this._getPattern(name, handler);
      let match: RegExpMatchArray | null;
      do {
        match = pattern.exec(current);
        if (match) {
          const attributes: IAttributes = this._parseAttributes(match[1]);
          const text = match[2];
          const tag = new CustomTag(
            attributes,
            handler.parseContent ? this.process(text, handlers, context) : text,
          );
          current = current.replace(match[0], handler.build(tag, context));
        }
      } while (match);
    }
    return current;
  }
  _parseAttributes(value: string): IAttributes {
    const pattern = /([a-zA-Z0-9_-]+)="(.*?)"(?: |$)/g;
    let match: RegExpMatchArray | null;
    const result: IAttribute[] = [];
    do {
      match = pattern.exec(value);
      if (match) {
        const name = match[1];
        const value = match[2];
        result.push({
          name,
          value,
        });
      }
    } while (match);
    return result;
  }
  _getPattern(name: string, handler: ICustomTagHandler): RegExp {
    const customPattern = handler.customPattern;
    if (customPattern) {
      customPattern.lastIndex = 0;
      return customPattern;
    }
    if (handler.tagIsEscaped) {
      return new RegExp(
        `&lt;${name} *(.*?) *(?:\/&gt;|&gt;(.*)&lt;\/${name}&gt;)`,
        'g',
      );
    } else {
      return new RegExp(`<${name} *(.*?) *(?:\/>|>(.*)<\/${name}>)`, 'g');
    }
  }
})();
