import 'reflect-metadata';
import { PiiService } from "./services/pii.service";
export declare class PiiModule {
    private readonly piiService;
    constructor();
    encryptFunc(data: any): Promise<import(".").EncryptedPayload>;
    decryptFunc(data: any): Promise<unknown>;
    decryptMiddleware(): (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => import("express").Response<any, Record<string, any>> | undefined;
    getService(): PiiService;
}
//# sourceMappingURL=pii.module.d.ts.map