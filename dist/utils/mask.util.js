"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskEmail = maskEmail;
exports.maskPhone = maskPhone;
function maskEmail(email) {
    const [name, domain] = email.split("@");
    return name[0] + "***@" + domain;
}
function maskPhone(phone) {
    return "XXXXXX" + phone.slice(-4);
}
//# sourceMappingURL=mask.util.js.map