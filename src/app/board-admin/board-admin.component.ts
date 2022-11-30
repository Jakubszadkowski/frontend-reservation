import { Component, OnInit } from '@angular/core';
import { Room } from '../model/room.model';
import { User } from '../model/user.model';
import { myFunctions } from '../resource/functions';
import { BookingService } from '../_services/booking.service';
import { RoomService } from '../_services/room.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.sass']
})
export class BoardAdminComponent implements OnInit {
  title: string = "Centrum zarządzania administratora.";
  users: User[]=[];
  rooms: Room[]=[];
  selected: string='';
  userSelected: User={'userId':'','name':'','surname':'','email':'','phone':'','role':'','title':''};
  constructor(private userService: UserService,private roomService:RoomService,private bookingService: BookingService,private functions:myFunctions) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data:User[])=>{
        this.users = data;
      },
      error : (e)=>{
        console.log(e);
      }
      }
    );
    this.roomService.getAllRooms().subscribe({
      next:(data:Room[])=>{
        this.rooms = data;
      },
      error : (e)=>{
        console.log(e);
      }
    })
  }
  editUser(data:any):void{
    if(data.target!=null){
      this.selected = data.target.value
    }
    if(this.selected == "default")
    {return;}

    this.userService.getUserById(this.selected).subscribe({
      next:(data:User)=>{
        this.userSelected = data;
      },
      error:(e)=>{
        console.log("Error");
        console.log(e);
      },
      complete:()=>{

      }
    })

  }
}
