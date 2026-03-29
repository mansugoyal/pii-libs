import { webcrypto } from "node:crypto";
import { Service } from "typedi";

@Service()
export class AesService {
    async generateKeyAndIv() {
        const key = await webcrypto.subtle.generateKey(
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );

        const iv = webcrypto.getRandomValues(new Uint8Array(12));

        return {
            key,
            iv: Buffer.from(iv).toString("base64"),
        };
    }


    async encrypt(data: ArrayBuffer | Uint8Array, key: webcrypto.CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> {
        return webcrypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv as unknown as ArrayBuffer },
            key,
            data as unknown as ArrayBuffer
        );
    }

    async decrypt(encryptedData: ArrayBuffer | Uint8Array, key: webcrypto.CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> {
        return webcrypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv as unknown as ArrayBuffer },
            key,
            encryptedData as unknown as ArrayBuffer
        );
    }
}