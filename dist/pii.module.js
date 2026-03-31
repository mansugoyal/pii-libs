"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiiModule = void 0;
require("reflect-metadata");
const rsa_service_1 = require("./services/rsa.service");
const aes_service_1 = require("./services/aes.service");
const pii_service_1 = require("./services/pii.service");
const decrypt_middleware_1 = require("./middleware/decrypt.middleware");
const config_1 = __importDefault(require("config"));
class PiiModule {
    constructor() {
        const publicKey = config_1.default.get("publicKey");
        const privateKey = config_1.default.get("privateKey");
        const rsa = new rsa_service_1.RsaService(publicKey, privateKey);
        const aes = new aes_service_1.AesService();
        this.piiService = new pii_service_1.PiiService(rsa, aes);
    }
    async encryptFunc(data) {
        const result = await this.piiService.encryptData(data);
        return result;
    }
    async decryptFunc(data) {
        const result = await this.piiService.decryptPayload(data);
        return result;
    }
    decryptMiddleware() {
        return (0, decrypt_middleware_1.createDecryptMiddleware)(this.piiService);
    }
    getService() {
        return this.piiService;
    }
}
exports.PiiModule = PiiModule;
//# sourceMappingURL=pii.module.js.map