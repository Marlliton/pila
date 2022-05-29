import { User } from "@prisma/client";
import { UserRepository } from "./UserRepository";
export default class UserService implements UserRepository {
  #repository: UserRepository;
  constructor(repo: UserRepository) {
    this.#repository = repo;
  }
  verifyUserExists(email: string): Promise<boolean> {
    return this.#repository.verifyUserExists(email);
  }

  findAll(): Promise<User[]> {
    return this.#repository.findAll();
  }
  findOne(userId: number): Promise<User> {
    return this.#repository.findOne(userId);
  }
  create(user: User): Promise<User> {
    return this.#repository.create(user);
  }
  update(userId: number, user: User): Promise<User> {
    return this.#repository.update(userId, user);
  }
  destroy(userId: number): Promise<User> {
    return this.#repository.destroy(userId);
  }
}
