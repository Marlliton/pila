import { Accounts } from "@prisma/client";

export interface AccountRepository {
  findAll: () => Promise<Accounts[]>;
  findOne: (userId: number) => Promise<Accounts>;
  create: ({ name, userId }: Accounts) => Promise<Accounts>;
  update: ({ name, userId }: Accounts) => Promise<Accounts>;
  destroy: (accountId: number) => Promise<Accounts>;
}
