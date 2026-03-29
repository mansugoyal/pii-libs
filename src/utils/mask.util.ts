export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  return name[0] + "***@" + domain;
}

export function maskPhone(phone: string) {
  return "XXXXXX" + phone.slice(-4);
}