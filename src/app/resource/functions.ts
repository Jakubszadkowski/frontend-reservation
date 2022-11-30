import { Injectable } from "@angular/core";
import { Booking } from "../model/booking.model";
import { Room } from "../model/room.model";
import { User } from "../model/user.model";


@Injectable({
    providedIn: 'root'
  })

export class myFunctions{
    
    createBooking(bookingId: string, user: User, room: Room, day: string,month:string,year:string, startTime:string, timeCount: string):Booking {
    
    var temp:Booking={"bookingId":bookingId,"day":day,"month":month,"year":year,"startTime":startTime,"room":room,"user":user,"timeCount":timeCount};    
    return temp;
    }
}