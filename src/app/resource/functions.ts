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
    createRoom(roomId:string,floor:string,roomNumber:string,additionInformation:string):Room {
    
      var temp:Room={"roomId":roomId,"floor":floor,"roomNumber":roomNumber,"additionInformation":additionInformation};    
      return temp;
    }
    createUser(userId:string,title:string,name:string,surname:string,email:string,phone:string,role:string):User {

      var temp:User={"userId":userId,"title":title,"name":name,"surname":surname,"email":email,"phone":phone,"role":role};    
      return temp;
    }
}