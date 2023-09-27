import { createHash, randomBytes } from "crypto";

export const reverse = (str: string): string => {
  return str.split("").reverse().join("");
};

export const hashPassword = (password: string): string => {
  const reversePassword = reverse(password);
  const salt = createHash("sha256").update(reversePassword).digest("hex");
  const hashedPassword = createHash("sha256")
    .update(salt + password)
    .digest("hex");

  return hashedPassword;
};
