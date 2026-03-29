"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDecryptMiddleware = void 0;
const createDecryptMiddleware = (piiService) => {
    return (req, res, next) => {
        try {
            const payload = req.body;
            req.body = piiService.decryptPayload(payload);
            next();
        }
        catch (err) {
            console.error("Decryption error:", err);
            return res.status(400).json({ error: "Decryption failed" });
        }
    };
};
exports.createDecryptMiddleware = createDecryptMiddleware;
//# sourceMappingURL=decrypt.middleware.js.map