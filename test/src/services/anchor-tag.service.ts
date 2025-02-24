import { EscapedTagHandlerServiceModel, ICustomTag } from '../../../src';

export const AnchorTagService =
  new (class AnchorTagService extends EscapedTagHandlerServiceModel {
    get debug() {
      return true;
    }
    build(tag: ICustomTag): string {
      const href = tag.getAttribute('href');
      const target = tag.getAttribute('target') ?? 'blank';
      return `<a href="${href}" target="${target}">${tag.text}</a>`;
    }
  })();
