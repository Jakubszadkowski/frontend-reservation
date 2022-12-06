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
  selectedIdRoom:string='';
  userFlag: boolean = false;
  roomFlag: boolean = false;
  userSelected: User[]=[];
  roomSelected: Room[]=[];
  roles:string[]=["user","admin"];
  selectedRole:string=this.roles[0];
  constructor(private userService: UserService,private roomService:RoomService,private bookingService: BookingService,private functions:myFunctions) { }

  ngOnInit(): void {
    this.userSelected[0]=this.functions.createUser('','','','','','','');
    this.roomSelected[0]=this.functions.createRoom('','','',{'additional':'','count':'','properties':''});
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
        this.userSelected[0] = {...data};
        this.userSelected[1] = {...data};
      },
      error:(e)=>{
        console.log("Error");
        console.log(e);
      }
    })

  }
  showEditUsers():void{
    this.userSelected[1]={...this.userSelected[0]};
    this.userFlag= true;
  }
  cancelUser():void{
    this.userSelected[0]={...this.userSelected[1]}
    this.userSelected[0]=this.userSelected[1]
    //this.editedUser=this.currentUser;
    console.log("User 1 = ");
    console.log(this.userSelected[0])
    console.log("User 2 = ");
    console.log(this.userSelected[1])
    this.userFlag=false;
  }
  saveUser():void{
    this.userSelected[0].role=this.selectedRole;
    this.userService.patchUser(this.userSelected[0]).subscribe({
      error:(e)=>console.log(e),
      complete:()=>this.userFlag=false
    })
  }
  onSelected(val:string):void{
    this.selectedRole=val;
  }
  editRoom(data:any):void{
    if(data.target!=null){
      this.selectedIdRoom = data.target.value
    }
    if(this.selected == "default")
      {return;}

    this.roomSelected[0] = this.functions.getRoomFromArray(this.rooms,this.selectedIdRoom);
    this.roomSelected[1] = this.roomSelected[0];
    console.log(this.roomSelected[0]);
  }
  showEditRoom():void{
    this.roomSelected[1]={...this.roomSelected[0]};
    this.roomFlag= true;
  }
  saveRoom():void{
    this.roomService.patchRoom(this.roomSelected[0]).subscribe({
      error:(e)=>console.log(e),
      complete:()=>this.roomFlag=false
    })
  }
  cancelRoom():void{
    this.roomSelected[0]={...this.roomSelected[1]}
    this.roomSelected[0]=this.roomSelected[1]
    //this.editedUser=this.currentUser;
    console.log("Room 1 = ");
    console.log(this.roomSelected[0])
    console.log("Room 2 = ");
    console.log(this.roomSelected[1])
    this.roomFlag=false;
  }
}
