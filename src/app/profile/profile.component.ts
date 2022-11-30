import { Component, OnInit } from '@angular/core';
import { Booking } from '../model/booking.model';
import { User } from '../model/user.model';
import { BookingService } from '../_services/booking.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { myFunctions } from '../resource/functions';
import { RoomService } from '../_services/room.service';
import { Room } from '../model/room.model';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  currentUser!: User;
  editedUser!: User;
  bookings: Booking[] =[];
  flag:boolean =false;
  
  constructor(private token: TokenStorageService,private bookingService: BookingService,private myFunctions: myFunctions, private roomService:RoomService,private userService:UserService) { }

  ngOnInit(): void {
    this.flag=false;
    
    this.currentUser = this.token.getUser();
    this.editedUser = {
      "userId": this.currentUser.userId,
      "name": "",
      "surname":"" ,    
      "title":"",
      "email": "",
      "phone": "",
      "role": this.currentUser.role
    };
    this.editedUser = this.currentUser;
    this.bookingService.getMyBookings(this.token.getUser().userId).subscribe(
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

          this.bookings.push(this.myFunctions.createBooking(Booking.bookingId, this.currentUser, room,Booking.startTime,Booking.day,Booking.month,Booking.year,Booking.timeCount))
        });
        this.bookings = data;
      },
      error : (e)=>{
        console.log(e);
      }
    })
  }
  editingPerson():void{
    this.editedUser={...this.currentUser};
    this.flag=true;
  }
  cancelEdit():void{
    this.currentUser={...this.editedUser}
    this.currentUser=this.editedUser
    //this.editedUser=this.currentUser;
    console.log("User 1 = ");
    console.log(this.currentUser)
    console.log("User 2 = ");
    console.log(this.editedUser)
    this.flag=false;
  }
  saveUser():void{
      this.userService.editUser(this.currentUser).subscribe(
        {
          next:() => {
            this.token.saveUser(this.currentUser);
            this.flag=false;
          },
          error : (e)=>{
            console.log(e);
          } 
      })
  }
}
