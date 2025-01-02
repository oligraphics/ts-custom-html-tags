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
    const result: IAttribute[] = [];
    let current = value;
    let match: RegExpMatchArray | null;
    do {
      match = / |=(["'])?|$/g.exec(current);
      if (match && (match.index ?? 0) > 0) {
        // Read the attribute name
        const name = current.substring(0, match.index);
        current = current.substring(name.length);
        let value;
        if (match[0].startsWith('=')) {
          // Read the attribute value
          const delimiter = match[1];
          current = current.substring(delimiter ? 2 : 1);
          const endMatch = delimiter
            ? (delimiter === '"' ? /(?:^|(?!\\))."/g : /(?:^|(?!\\)).'/g).exec(
                current,
              )
            : undefined;
          if (endMatch) {
            value = current.substring(
              0,
              endMatch.index > 0 ? endMatch.index + 1 : 0,
            );
            current = current.substring(value.length + 1).trim();
          }
        } else {
          current = current.substring(name.length);
          value = '';
        }
        result.push({
          name,
          value,
        });
      }
    } while (match && (match.index ?? 0) > 0);
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
