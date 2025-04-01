import { User } from "@/users/entities/user.entity";
import { Query } from "@nestjs/cqrs";

export class FindOneUserQuery extends Query<User> {
    constructor(
        public readonly id: number,
    ) 
    {super()}
}
