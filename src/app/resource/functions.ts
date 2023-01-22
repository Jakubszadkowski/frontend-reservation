import { Injectable } from "@angular/core";
import { Booking } from "../model/booking.model";
import { Info } from "../model/info.model";
import { Room } from "../model/room.model";
import { User } from "../model/user.model";


@Injectable({
    providedIn: 'root'
  })

export class myFunctions{
    
    createBooking(bookingId: string, user: User, room: Room, day: string,month:string,year:string, startTime:string, endTime: string):Booking {
    
    var temp:Booking={"bookingId":bookingId,"day":day,"month":month,"year":year,"startTime":startTime,"room":room,"user":user,"endTime":endTime};    
    return temp;
    }
    createRoom(roomId:string,floor:string,roomNumber:string,additionInformation:Info):Room {
    
      var temp:Room={"roomId":roomId,"floor":floor,"roomNumber":roomNumber,"additionInformation":additionInformation};    
      return temp;
    }
    getNewRoom():Room{
      var temp1:Info={'properties':"",'count':'','additional':''}
      var temp:Room={"roomId":'',"floor":'',"roomNumber":'',"additionInformation":temp1};    
      return temp;
    }
    createUser(userId:string,title:string,name:string,surname:string,email:string,phone:string,role:string):User {

      var temp:User={"userId":userId,"title":title,"name":name,"surname":surname,"email":email,"phone":phone,"role":role};    
      return temp;
    }
    getRoomFromArray(arr:Room[],id:string):Room{
      console.log("id = ",id);
      for (let index = 0; index < arr.length; index++) {
        if(arr[index].roomId.includes(id)){
          return arr[index];
        }
      }
      return this.createRoom('','','',{"additional":'','count':'','properties':''})
    }
  }