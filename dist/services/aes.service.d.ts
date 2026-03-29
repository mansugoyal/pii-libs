import { webcrypto } from "node:crypto";
export declare class AesService {
    generateKeyAndIv(): Promise<{
        key: webcrypto.CryptoKey;
        iv: string;
    }>;
    encrypt(data: ArrayBuffer | Uint8Array, key: webcrypto.CryptoKey, iv: Uint8Array): Promise<ArrayBuffer>;
    decrypt(encryptedData: ArrayBuffer | Uint8Array, key: webcrypto.CryptoKey, iv: Uint8Array): Promise<ArrayBuffer>;
}
//# sourceMappingURL=aes.service.d.ts.map