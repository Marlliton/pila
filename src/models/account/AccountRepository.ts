import { Account } from "@prisma/client";

export interface AccountRepository {
  findOne: (userId: number) => Promise<Account>;
  create: ({ name, userId }: Account) => Promise<Account>;
  update: ({ name, userId }: Account) => Promise<Account>;
  destroy: (userId: number) => Promise<Account>;
}
