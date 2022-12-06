import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../_services/user.service';
import { myFunctions } from '../resource/functions';
import { BookingService } from '../_services/booking.service';
import { Booking } from '../model/booking.model';
import { RoomService } from '../_services/room.service';
import { Room } from '../model/room.model';


@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.sass']
})
export class OthersComponent implements OnInit {
  currentUser!:User;
  myBookings:Booking[]=[];
  constructor(private route: ActivatedRoute,private userService:UserService,private myFunctions: myFunctions,private bookingService: BookingService,private roomService:RoomService) { }

  ngOnInit(): void {
    this.currentUser = this.myFunctions.createUser('','','','','','','');
    this.route.data.subscribe((data)=>{
      this.currentUser=data['user'];
    });
    this.bookingService.getMyBookings(this.currentUser.userId).subscribe(
      {next : (data)=>{
        let temps:Booking[] = data;
        temps.forEach(Booking => {
          let room!:Room; 
          this.roomService.getRoomById(Booking.room.roomId).subscribe(
            {next : (data)=>{
            room = data;
            },
            error : (e)=>{
              console.log(e);
            }
          })

          this.myBookings.push(this.myFunctions.createBooking(Booking.bookingId, this.currentUser, room,Booking.startTime,Booking.day,Booking.month,Booking.year,Booking.endTime))
        });
        this.myBookings = data;
      },
      error : (e)=>{
        console.log(e);
      }
    })
  }

}
