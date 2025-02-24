import { ICustomTag } from './custom-tag.interface';
import { DynamicContext } from 'ts-logic-framework';

export type ICustomTagHandler = {
  /**
   * Whether to show console output
   */
  get debug(): boolean;
  /**
   * Whether the tag uses &lt;&gt; instead of <>
   */
  get tagIsEscaped(): boolean;
  /**
   * Supply a custom regular expression to parse the opening tag.
   */
  get customOpeningTagPattern(): RegExp | undefined;
  /**
   * Supply a custom regular expression to parse the closing tag.
   */
  get customClosingTagPattern(): RegExp | undefined;
  /**
   * Whether to parse custom tags within the content of this tag
   */
  get parseContent(): boolean;
  /**
   * Build the output
   */
  build(tag: ICustomTag, context: DynamicContext): string;
};
