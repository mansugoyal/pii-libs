import 'reflect-metadata';
require("dotenv").config();
import { webcrypto } from "node:crypto";
import { Service } from "typedi";
import config from 'config';

@Service()
export class RsaService {
    private cachedPublicKey: CryptoKey | null = null;
    private cachedPrivateKey: CryptoKey | null = null;

    constructor(
        private readonly publicKeyPem = config.get<string>("publicKey"),
        private readonly privateKeyPem = config.get<string>("privateKey")
    ) { }

    private formatKey(key: string): string {
        return key.replaceAll(String.raw`\n`, "\n");
    }

    async getPublicKey(): Promise<CryptoKey> {
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

            this.cachedPublicKey = await webcrypto.subtle.importKey(
                "spki",
                binaryDer,
                { name: "RSA-OAEP", hash: "SHA-256" },
                false,
                ["encrypt"]
            );
            console.log("Imported Public Key:", this.cachedPublicKey);
        }
        if (!this.cachedPublicKey) {
            throw new Error("Public key could not be loaded");
        }
        

        return this.cachedPublicKey;
    }

    async getPrivateKey(): Promise<CryptoKey> {
        if (!this.cachedPrivateKey) {
            const pem = this.formatKey(this.privateKeyPem);

            const pemContents = pem
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replaceAll(/\s/g, "");

            const binaryDer = Buffer.from(pemContents, "base64");

            this.cachedPrivateKey = await webcrypto.subtle.importKey(
                "pkcs8",
                binaryDer,
                { name: "RSA-OAEP", hash: "SHA-256" },
                false,
                ["decrypt"]
            );
        }

        return this.cachedPrivateKey;
    }
}