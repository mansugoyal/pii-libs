"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const { publicKey, privateKey } = (0, node_crypto_1.generateKeyPairSync)("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
});
console.log("keys/public.pem", publicKey);
console.log("keys/private.pem", privateKey);
console.log("✅ Keys generated successfully");
//# sourceMappingURL=generate-keys.js.map