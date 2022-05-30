import { Accounts } from "@prisma/client";

export interface AccountRepository {
  findAll: () => Promise<Accounts[]>;
  findOne: (accountId: number) => Promise<Accounts>;
  create: ({ name, userId }: Accounts) => Promise<Accounts>;
  update: (accountId: number, { name, userId }: Accounts) => Promise<Accounts>;
  destroy: (accountId: number) => Promise<Accounts>;
}
