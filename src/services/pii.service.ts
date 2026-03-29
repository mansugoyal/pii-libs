import 'reflect-metadata';
import { RsaService } from "./rsa.service";
import { AesService } from "./aes.service";
import { Service } from "typedi";
import { EncryptedPayload } from "../types/pii.types";
import { webcrypto } from "node:crypto";

@Service()
export class PiiService {
    constructor(
        private readonly rsa: RsaService,
        private readonly aes: AesService
    ) { }

    async encryptData(data: any): Promise<EncryptedPayload> {
        // Generate AES key + IV
        const { key: aesKey, iv } = await this.aes.generateKeyAndIv();
        console.log("Generated AES key and IV:", aesKey, iv);

        // Encode data
        const encodedData = new TextEncoder().encode(JSON.stringify(data));
        console.log("Encoded data:", encodedData);

        // Convert IV to Uint8Array
        const ivBuffer = new Uint8Array(Buffer.from(iv, "base64"));
        console.log("IV Buffer:", ivBuffer);

        // Encrypt data using AES service
        const encryptedData = await this.aes.encrypt(
            encodedData,
            aesKey,
            ivBuffer
        );
        console.log("Encrypted data (AES):", encryptedData);

        // Export AES key
        const exportedKey = await webcrypto.subtle.exportKey("raw", aesKey);
        console.log("Exported AES key:", exportedKey);

        const publicKey = await this.rsa.getPublicKey();
        console.log("Public Key:", publicKey);

        // RSA encrypt
        const encryptedKeyBuffer = await webcrypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            exportedKey
        );

        console.log('encryptedKeyBuffer', encryptedKeyBuffer);

        console.log('return', {
            encryptedKey: Buffer.from(encryptedKeyBuffer).toString("base64"),
            encryptedData: Buffer.from(encryptedData).toString("base64"),
            iv,
        });

        return {
            encryptedKey: Buffer.from(encryptedKeyBuffer).toString("base64"),
            encryptedData: Buffer.from(encryptedData).toString("base64"),
            iv,
        };
    }

    async decryptPayload<T>(payload: EncryptedPayload): Promise<T> {
        // Get private key from RSA service
        const privateKey = await this.rsa.getPrivateKey();

        // Decrypt AES key
        const encryptedKeyBuffer = Buffer.from(payload.encryptedKey, "base64");

        const rawAesKey = await webcrypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            privateKey,
            encryptedKeyBuffer
        );

        // Import AES key
        const aesKey = await webcrypto.subtle.importKey(
            "raw",
            rawAesKey,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );

        // ecrypt data using AES service
        const encryptedDataBuffer = new Uint8Array(
            Buffer.from(payload.encryptedData, "base64")
        );

        const ivBuffer = new Uint8Array(
            Buffer.from(payload.iv, "base64")
        );

        // decrypt returns ArrayBuffer
        const decryptedBuffer = await this.aes.decrypt(
            encryptedDataBuffer,
            aesKey,
            ivBuffer
        );

        // Convert ArrayBuffer → string
        const decryptedString = Buffer.from(decryptedBuffer).toString("utf-8");

        // Convert string → object
        return JSON.parse(decryptedString) as T;
    }
}