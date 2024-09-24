import bcrypt from "bcrypt";

export async function hashedPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(13);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePasswords(
  providedPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(providedPassword, hashedPassword);
}
