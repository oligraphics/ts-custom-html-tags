"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTagsService = void 0;
const custom_tag_model_1 = require("../models/custom-tag.model");
exports.CustomTagsService = new (class CustomHtmlTagsService {
    process(input, handlers, context = {}) {
        let current = input;
        for (const [name, handler] of Object.entries(handlers)) {
            const pattern = this._getPattern(name, handler);
            let match;
            do {
                match = pattern.exec(current);
                if (match) {
                    const attributes = this._parseAttributes(match[1]);
                    const text = match[2];
                    const tag = new custom_tag_model_1.CustomTag(attributes, handler.parseContent ? this.process(text, handlers, context) : text);
                    current = current.replace(match[0], handler.build(tag, context));
                }
            } while (match);
        }
        return current;
    }
    _parseAttributes(value) {
        const pattern = /([a-zA-Z0-9_-]+)="(.*?)"(?: |$)/g;
        let match;
        const result = [];
        do {
            match = pattern.exec(value);
            if (match) {
                const name = match[1];
                const value = match[2];
                result.push({
                    name,
                    value,
                });
            }
        } while (match);
        return result;
    }
    _getPattern(name, handler) {
        const customPattern = handler.customPattern;
        if (customPattern) {
            customPattern.lastIndex = 0;
            return customPattern;
        }
        if (handler.tagIsEscaped) {
            return new RegExp(`&lt;${name} *(.*?) *(?:\/&gt;|&gt;(.*)&lt;\/${name}&gt;)`, 'g');
        }
        else {
            return new RegExp(`<${name} *(.*?) *(?:\/>|>(.*)<\/${name}>)`, 'g');
        }
    }
})();
//# sourceMappingURL=custom-tags.service.js.map