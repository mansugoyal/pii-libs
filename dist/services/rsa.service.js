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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsaService = void 0;
require("reflect-metadata");
require("dotenv").config();
const node_crypto_1 = require("node:crypto");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("config"));
let RsaService = class RsaService {
    constructor(publicKeyPem = config_1.default.get("publicKey"), privateKeyPem = config_1.default.get("privateKey")) {
        this.publicKeyPem = publicKeyPem;
        this.privateKeyPem = privateKeyPem;
        this.cachedPublicKey = null;
        this.cachedPrivateKey = null;
    }
    formatKey(key) {
        return key.replaceAll(String.raw `\n`, "\n");
    }
    async getPublicKey() {
        if (!this.cachedPublicKey) {
            console.log("Original Public Key PEM:", this.publicKeyPem);
            const pem = this.formatKey(this.publicKeyPem);
            console.log("Formatted Public Key PEM:", pem);
            const pemContents = pem
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll(/\s/g, "");
            console.log("PEM Contents (Base64):", pemContents);
            const binaryDer = Buffer.from(pemContents, "base64");
            console.log("Binary DER of Public Key:", binaryDer);
            this.cachedPublicKey = await node_crypto_1.webcrypto.subtle.importKey("spki", binaryDer, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["encrypt"]);
            console.log("Imported Public Key:", this.cachedPublicKey);
        }
        if (!this.cachedPublicKey) {
            throw new Error("Public key could not be loaded");
        }
        return this.cachedPublicKey;
    }
    async getPrivateKey() {
        if (!this.cachedPrivateKey) {
            const pem = this.formatKey(this.privateKeyPem);
            const pemContents = pem
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll(/\s/g, "");
            const binaryDer = Buffer.from(pemContents, "base64");
            this.cachedPrivateKey = await node_crypto_1.webcrypto.subtle.importKey("pkcs8", binaryDer, { name: "RSA-OAEP", hash: "SHA-256" }, false, ["decrypt"]);
        }
        return this.cachedPrivateKey;
    }
};
exports.RsaService = RsaService;
exports.RsaService = RsaService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object, Object])
], RsaService);
//# sourceMappingURL=rsa.service.js.map