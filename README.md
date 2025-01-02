# ts-custom-html-tags
 Micro Framework to write simple services that replace custom HTML tags with actual HTML

# How To Use

## 1. Basics

```ts
// Create a tag handler
/**
 * Demonstration service that replaces the
 * <code><test test-attribute="some key">content</test></code> tag with
 * <code><b>some key</b>: text</code>
 */
export const TestTagService =
  new (class TestTagService extends TagHandlerServiceModel {
    build(tag: ICustomTag, context: DynamicContext): string {
      const attributeValue = tag.getAttribute<string>('test-attribute');
      return `<b>${LogicService.resolve(
        attributeValue,
        context,
      )}</b>: ${LogicService.resolve(tag.text, context)}`;
    }
  })();
// Create a handlers map
// Each key represents the tag name
const handlers = { test: TestTagService };
// Get some input
const input = '<test test-attribute="hello">world</test>';
// Process the tags
const result = CustomTagsService.process(input, handlers);
// Print the result
console.log(result);
// Output: <b>hello</b>: world
```

## 2. With dynamic context variables

```ts
// Create a context
const context = DynamicContextService.createContext({
  a: 'Apples',
  b: 'Pears',
});
// Create a handlers map
const handlers = { test: TestTagService };
// Get some input
const input = '<test test-attribute="{a}">{b}</test>';
// Process the tags
const result = CustomTagsService.process(input, handlers, context);
// Print the result
console.log(result);
// Output: <b>Apples</b>: Pears
```

## 3. Disable nested parsing

```ts
export const TestTagService =
  new (class TestTagService extends TagHandlerServiceModel {
    // Disable parsing of custom tags within this tag
    get parseContent() {
      return false;
    }
    build(tag: ICustomTag, context: DynamicContext): string {
      // Tag builder logic
      // ...
    }
  })();
```