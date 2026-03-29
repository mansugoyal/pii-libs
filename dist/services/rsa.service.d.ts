import 'reflect-metadata';
export declare class RsaService {
    private readonly publicKeyPem;
    private readonly privateKeyPem;
    private cachedPublicKey;
    private cachedPrivateKey;
    constructor(publicKeyPem?: string, privateKeyPem?: string);
    private formatKey;
    getPublicKey(): Promise<CryptoKey>;
    getPrivateKey(): Promise<CryptoKey>;
}
//# sourceMappingURL=rsa.service.d.ts.map