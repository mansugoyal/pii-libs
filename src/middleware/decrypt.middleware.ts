import { Request, Response, NextFunction } from "express";
import { PiiService } from "../services/pii.service";
import { EncryptedPayload } from "../types/pii.types";

export const createDecryptMiddleware = (piiService: PiiService) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: EncryptedPayload = req.body;
            
            req.body = piiService.decryptPayload(payload);
            next();
        } catch (err) {
            console.error("Decryption error:", err);
            return res.status(400).json({ error: "Decryption failed" });
        }
    };
};