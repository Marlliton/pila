import { Account } from "@prisma/client";

export interface AccountRepository {
  findOne: (userId: number) => Promise<Account>;
  create: (name: string, userId: number, balance: number) => Promise<Account>;
  update: (name: string, userId: number, balance?: number) => Promise<Account>;
  destroy: (userId: number) => Promise<Account>;
  updateBalance: (accountId: number, balance: number) => Promise<void>;
  getBalance: (accountId: number) => Promise<any>;
}
