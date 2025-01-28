import { EscapedTagHandlerServiceModel } from '../../../src';
import { DynamicContext, LogicService } from 'ts-logic-framework';
import { ICustomTag } from '../../../src';

/**
 * Demonstration service that replaces the
 * <code><test test-attribute="some key">content</test></code> tag with
 * <code><b>some key</b>: text</code>
 */
export const TestTagEscapedService =
  new (class TestTagEscapedService extends EscapedTagHandlerServiceModel {
    build(tag: ICustomTag, context: DynamicContext): string {
      const attributeValue = tag.getAttribute<string>('test-attribute');
      return `<b>${LogicService.resolve(
        attributeValue,
        context,
      )}</b>: ${LogicService.resolve(tag.text, context)}`;
    }
  })();
