import { User } from "./user.model";

export interface Session {
    userId: string,
    user: User
}