import { Room } from "./room.model";
import { User } from "./user.model";

export interface Booking {
    bookingId: string,
    user: User,
    room: Room,
    day: string,
    month: string,
    year: string,
    startTime: string,
    timeCount: string
}