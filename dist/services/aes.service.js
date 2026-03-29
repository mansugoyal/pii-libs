"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AesService = void 0;
const node_crypto_1 = require("node:crypto");
const typedi_1 = require("typedi");
let AesService = class AesService {
    async generateKeyAndIv() {
        const key = await node_crypto_1.webcrypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
        const iv = node_crypto_1.webcrypto.getRandomValues(new Uint8Array(12));
        return {
            key,
            iv: Buffer.from(iv).toString("base64"),
        };
    }
    async encrypt(data, key, iv) {
        return node_crypto_1.webcrypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, data);
    }
    async decrypt(encryptedData, key, iv) {
        return node_crypto_1.webcrypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encryptedData);
    }
};
exports.AesService = AesService;
exports.AesService = AesService = __decorate([
    (0, typedi_1.Service)()
], AesService);
//# sourceMappingURL=aes.service.js.map