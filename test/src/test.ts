import { TestTagService } from './services/test-tag.service';
import { readFileSync } from 'fs';
import { CustomTagsService } from '../../src';
import { join } from 'node:path';
import { DynamicContextService } from 'ts-logic-framework';
import { TestTagEscapedService } from './services/test-tag-escaped.service';
import { AnchorTagService } from './services/anchor-tag.service';

const context = DynamicContextService.createContext({
  a: 'Apples',
  b: 'Pears',
});
const handlers = {
  test: TestTagService,
  'test-escaped': TestTagEscapedService,
  a: AnchorTagService,
};
const html = readFileSync(join(__dirname, '../resources/test.html')).toString(
  'utf-8',
);
console.log(CustomTagsService.process(html, handlers, context));
