import 'reflect-metadata';
import { RsaService } from "./rsa.service";
import { AesService } from "./aes.service";
import { EncryptedPayload } from "../types/pii.types";
export declare class PiiService {
    private readonly rsa;
    private readonly aes;
    constructor(rsa: RsaService, aes: AesService);
    encryptData(data: any): Promise<EncryptedPayload>;
    decryptPayload<T>(payload: EncryptedPayload): Promise<T>;
}
//# sourceMappingURL=pii.service.d.ts.map