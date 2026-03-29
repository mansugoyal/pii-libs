import { Request, Response, NextFunction } from "express";
import { PiiService } from "../services/pii.service";
export declare const createDecryptMiddleware: (piiService: PiiService) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=decrypt.middleware.d.ts.map