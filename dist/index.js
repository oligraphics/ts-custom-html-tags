"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./dto/attributes/attribute.dto"), exports);
__exportStar(require("./dto/attributes/boolean.attribute.dto"), exports);
__exportStar(require("./dto/attributes/number.attribute.dto"), exports);
__exportStar(require("./dto/attributes/string.attribute.dto"), exports);
__exportStar(require("./interfaces/attribute.interface"), exports);
__exportStar(require("./interfaces/attributes.interface"), exports);
__exportStar(require("./interfaces/custom-tag.interface"), exports);
__exportStar(require("./interfaces/custom-tag-handler.interface"), exports);
__exportStar(require("./models/custom-tag.model"), exports);
__exportStar(require("./models/escaped-tag-handler-service.model"), exports);
__exportStar(require("./models/tag-handler-service.model"), exports);
__exportStar(require("./services/custom-tags.service"), exports);
//# sourceMappingURL=index.js.map