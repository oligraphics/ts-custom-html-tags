import { TestTagService } from './services/test-tag.service';
import { readFileSync } from 'fs';
import { CustomTagsService } from '../../src/services/custom-tags.service';
import { join } from 'node:path';
import { DynamicContextService } from 'ts-logic-framework';

const context = DynamicContextService.createContext({
  a: 'Apples',
  b: 'Pears',
});
const handlers = { test: TestTagService };
const html = readFileSync(join(__dirname, '../resources/test.html')).toString(
  'utf-8',
);
console.log(CustomTagsService.process(html, handlers, context));
