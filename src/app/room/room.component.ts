import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../model/booking.model';
import { Room } from '../model/room.model';
import { User } from '../model/user.model';
import { myFunctions } from '../resource/functions';
import { BookingService } from '../_services/booking.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})

export class RoomComponent implements OnInit {
  constructor(private route:ActivatedRoute,private myFuctions:myFunctions,private token: TokenStorageService,private bookingService:BookingService) { }
  bookings:Booking[]=[];
  currentRoom:Room =this.myFuctions.createRoom('','','',{'additional':'','properties':'','count':''});
  currentUser:User = this.myFuctions.createUser('','','','','','','');
  ngOnInit(): void {
    this.currentUser=this.token.getUser();
    this.route.data.subscribe((data)=>{
      this.currentRoom=data['room'];
    });
    this.bookingService.getBookingBtRoom(this.currentRoom.roomId).subscribe({
      next:(data:Booking[])=>{
        this.bookings=data;
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }

}
