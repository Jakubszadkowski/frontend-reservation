import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { DataService } from '../calendar/data.service';
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
  template: `<daypilot-calendar [config]="navigatorConfig" [events]="events"></daypilot-calendar>`
})

export class RoomComponent implements OnInit {
  constructor(private route:ActivatedRoute,private myFuctions:myFunctions,private token: TokenStorageService,private bookingService:BookingService,private ds: DataService) { }
  bookings:Booking[]=[];
  events:DayPilot.EventData[]=[];
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
        this.bookings.forEach(booking => {
        this.events.push({
          id: (this.ds.events.length+1).toString(),
          start:  new DayPilot.Date(booking.year+'-'+booking.month+'-'+booking.day+'T'+booking.startTime+':00'),
          end:  new DayPilot.Date(booking.year+'-'+booking.month+'-'+booking.day+'T'+booking.endTime+':00'),
          text: booking.user.title+' '+booking.user.name+' '+booking.user.surname,
        });
       
      });
      },
      error:(e)=>{
        console.log(e);
      }
    })
    this.ds.events = this.events;
  }
  
}
