import { Info } from "./info.model";

export interface Room {
    roomId: string,
    floor: string,
    roomNumber: string,
    additionInformation: Info
}