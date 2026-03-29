export interface EncryptedPayload {
    keyId?: string;
    encryptedKey: string;
    encryptedData: string;
    iv: string;
}
export interface DecryptedPII {
    email?: string;
    phone?: string;
    [key: string]: any;
}
//# sourceMappingURL=pii.types.d.ts.map