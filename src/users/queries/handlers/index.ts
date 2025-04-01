import { FindOneUserByEmailHandler } from "./find-one-user-by-emai.handler";
import { FindOneUserHandler } from "./find-one-user.handler";

export const queriesHandlers = [
    FindOneUserByEmailHandler,
    FindOneUserHandler
];