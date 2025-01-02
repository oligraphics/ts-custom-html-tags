"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTag = void 0;
class CustomTag {
    attributes;
    text;
    constructor(attributes, text) {
        this.attributes = attributes;
        this.text = text;
    }
    getAttribute(name) {
        return this.attributes.find((a) => a.name === name)?.value;
    }
}
exports.CustomTag = CustomTag;
//# sourceMappingURL=custom-tag.model.js.map