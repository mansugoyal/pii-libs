"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiiService = void 0;
require("reflect-metadata");
const rsa_service_1 = require("./rsa.service");
const aes_service_1 = require("./aes.service");
const typedi_1 = require("typedi");
const node_crypto_1 = require("node:crypto");
let PiiService = class PiiService {
    constructor(rsa, aes) {
        this.rsa = rsa;
        this.aes = aes;
    }
    async encryptData(data) {
        // Generate AES key + IV
        const { key: aesKey, iv } = await this.aes.generateKeyAndIv();
        // Encode data
        const encodedData = new TextEncoder().encode(JSON.stringify(data));
        // Convert IV to Uint8Array
        const ivBuffer = new Uint8Array(Buffer.from(iv, "base64"));
        // Encrypt data using AES service
        const encryptedData = await this.aes.encrypt(encodedData, aesKey, ivBuffer);
        // Export AES key
        const exportedKey = await node_crypto_1.webcrypto.subtle.exportKey("raw", aesKey);
        const publicKey = await this.rsa.getPublicKey();
        // RSA encrypt
        const encryptedKeyBuffer = await node_crypto_1.webcrypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, exportedKey);
        return {
            encryptedKey: Buffer.from(encryptedKeyBuffer).toString("base64"),
            encryptedData: Buffer.from(encryptedData).toString("base64"),
            iv,
        };
    }
    async decryptPayload(payload) {
        // Get private key from RSA service
        const privateKey = await this.rsa.getPrivateKey();
        // Decrypt AES key
        const encryptedKeyBuffer = Buffer.from(payload.encryptedKey, "base64");
        const rawAesKey = await node_crypto_1.webcrypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encryptedKeyBuffer);
        // Import AES key
        const aesKey = await node_crypto_1.webcrypto.subtle.importKey("raw", rawAesKey, { name: "AES-GCM" }, false, ["decrypt"]);
        // ecrypt data using AES service
        const encryptedDataBuffer = new Uint8Array(Buffer.from(payload.encryptedData, "base64"));
        const ivBuffer = new Uint8Array(Buffer.from(payload.iv, "base64"));
        // decrypt returns ArrayBuffer
        const decryptedBuffer = await this.aes.decrypt(encryptedDataBuffer, aesKey, ivBuffer);
        // Convert ArrayBuffer → string
        const decryptedString = Buffer.from(decryptedBuffer).toString("utf-8");
        // Convert string → object
        return JSON.parse(decryptedString);
    }
};
exports.PiiService = PiiService;
exports.PiiService = PiiService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [rsa_service_1.RsaService,
        aes_service_1.AesService])
], PiiService);
//# sourceMappingURL=pii.service.js.map