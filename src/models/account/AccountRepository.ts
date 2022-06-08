import { Account } from "@prisma/client";

export interface AccountRepository {
  findOne: (userId: number) => Promise<Account>;
  create: ({ total, userId }: Account) => Promise<Account>;
  update: ({ total, userId }: Account) => Promise<Account>;
  destroy: (userId: number) => Promise<Account>;
}
