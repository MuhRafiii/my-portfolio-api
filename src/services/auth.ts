import bcrypt from "bcrypt";
import { prisma } from "../clients/prisma";
import { AuthError } from "../errors/authError";
import { signToken } from "../utils/jwt";

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new AuthError("Username and password are required", 400);
  }

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    throw new AuthError("Invalid username or password", 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new AuthError("Invalid username or password", 401);
  }

  const token = signToken({ id: admin.id, username: admin.username });

  return {
    admin_id: admin.id,
    username: admin.username,
    token,
  };
};
