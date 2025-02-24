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
      const openingTagPattern = this._getOpeningTagPattern(name, handler);
      const closingTagPattern = this._getClosingTagPattern(name, handler);
      if (handler.debug) {
        console.debug(
          name,
          'Opening pattern:',
          openingTagPattern,
          'Closing pattern:',
          closingTagPattern,
        );
      }
      const matches = [...current.matchAll(openingTagPattern)].reverse();
      for (const match of matches) {
        const openingTagStartIndex = match.index;
        const openingTagEndIndex = openingTagStartIndex + match[0].length;
        closingTagPattern.lastIndex = openingTagEndIndex;
        const selfClosing = match[2] === '/';
        const closingTagMatch = !selfClosing
          ? closingTagPattern.exec(current)
          : undefined;
        if (!selfClosing && !closingTagMatch) {
          console.error('No more closing tags found for tag', name, current);
          break;
        }
        const closingTagEndIndex =
          selfClosing || !closingTagMatch
            ? openingTagEndIndex
            : closingTagMatch.index + closingTagMatch[0].length;
        const text =
          selfClosing || !closingTagMatch
            ? ''
            : current.substring(openingTagEndIndex, closingTagMatch.index);
        const attributes: IAttributes =
          match[1] !== undefined ? this._parseAttributes(match[1].trim()) : [];
        const tag = new CustomTag(
          attributes,
          handler.parseContent ? this.process(text, handlers, context) : text,
        );
        current =
          current.substring(0, openingTagStartIndex) +
          handler.build(tag, context) +
          current.substring(closingTagEndIndex);
      }
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
  _getOpeningTagPattern(name: string, handler: ICustomTagHandler): RegExp {
    const customPattern = handler.customOpeningTagPattern;
    if (customPattern) {
      customPattern.lastIndex = 0;
      return customPattern;
    }
    if (handler.tagIsEscaped) {
      return new RegExp(`&lt;${name}(\\s[^&<>]*)?(\/)?&gt;`, 'g');
    } else {
      return new RegExp(`<${name}(\\s[^<>]*)?(\/)?>`, 'g');
    }
  }
  _getClosingTagPattern(name: string, handler: ICustomTagHandler): RegExp {
    const customPattern = handler.customClosingTagPattern;
    if (customPattern) {
      customPattern.lastIndex = 0;
      return customPattern;
    }
    if (handler.tagIsEscaped) {
      return new RegExp(`&lt;/${name}&gt;`, 'g');
    } else {
      return new RegExp(`</${name}>`, 'g');
    }
  }
})();
