import 'reflect-metadata';
import { RsaService } from "./services/rsa.service";
import { AesService } from "./services/aes.service";
import { PiiService } from "./services/pii.service";
import { createDecryptMiddleware } from "./middleware/decrypt.middleware";
import config from 'config';

export class PiiModule {
  private readonly piiService;

  constructor() {
    const publicKey = config.get<string>("publicKey");
    const privateKey = config.get<string>("privateKey");

    const rsa = new RsaService(publicKey, privateKey);
    const aes = new AesService();

    this.piiService = new PiiService(rsa, aes);
  }

  async encryptFunc(data: any) {
    console.log("Encrypting data:", data);
    const result = await this.piiService.encryptData(data);
    console.log("Encryption result:", result);
    return result;
  }

  async decryptFunc(data: any) {
    console.log("Decrypting data:", data);
    const result = await this.piiService.decryptPayload(data);
    console.log("Decryption result:", result);
    return result;
  }

  decryptMiddleware() {
    return createDecryptMiddleware(this.piiService);
  }

  getService() {
    return this.piiService;
  }
}