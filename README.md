# ts-custom-html-tags
 Micro Framework to write simple services that replace custom HTML tags with actual HTML

# How To Use

## 1. Basics

```ts
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