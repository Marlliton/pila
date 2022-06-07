import { User } from "@prisma/client";
export interface UserRepository {
  findAll: () => Promise<User[]>;
  findOne: (userId: number) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
  verifyUserExists: (userId: number) => Promise<boolean>;
  create: ({ name, email, password }: User) => Promise<User>;
  update: (userId: number, { name, email }: User) => Promise<User>;
  destroy: (userId: number) => Promise<User>;
}
