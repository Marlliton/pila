import UserPrisma from "../service/prisma/UserPrisma";
import UserService from "./user/UserService";

export function getUserService(): UserService {
  return new UserService(new UserPrisma());
}
