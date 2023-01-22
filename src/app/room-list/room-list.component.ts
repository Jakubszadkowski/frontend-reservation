import { Component, OnInit } from '@angular/core';
import { Room } from '../model/room.model';
import { myFunctions } from '../resource/functions';
import { RoomService } from '../_services/room.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.sass']
})
export class RoomListComponent implements OnInit {

  constructor(private roomService: RoomService,private myFuncions: myFunctions,private token: TokenStorageService) { }
  flag:boolean=false;
  isAdmin:boolean=false;
  newRoom!:Room;
  groundFloor:Room[]=[];
  firstFloor:Room[]=[];
  secondFloor:Room[]=[];
  thirdFloor:Room[]=[];
  forthFloor:Room[]=[];
  flagAddRoom:boolean=false;
  ngOnInit(): void {
    this.newRoom = this.myFuncions.getNewRoom();
    if(this.token.getUser().role=='admin'){
      this.flag=true;
      this.isAdmin=true;
    }
    this.roomService.getRoomsByFloor('0').subscribe({
      next:(data:Room[])=>{
        this.groundFloor=data;
      },
      error:(e)=>{
        console.log(e)
      }
    })
    this.roomService.getRoomsByFloor('1').subscribe({
      next:(data:Room[])=>{
        this.firstFloor=data;
      },
      error:(e)=>{
        console.log(e)
      }
    })
    this.roomService.getRoomsByFloor('2').subscribe({
      next:(data:Room[])=>{
        this.secondFloor=data;
      },
      error:(e)=>{
        console.log(e)
      }
    })
    this.roomService.getRoomsByFloor('3').subscribe({
      next:(data:Room[])=>{
        this.thirdFloor=data;
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
  addRoom():void{
    this.flagAddRoom=!this.flagAddRoom;
  }
  saveRoom():void{
    this.roomService.addRoom(this.newRoom).subscribe({
      next:()=>{
        this.flagAddRoom=false;
        console.log('dodano');
      },
      error:(e)=>{
        alert("Numer jest już używany");
      }
    })
  }
  cancelRoom():void{
    this.newRoom=this.myFuncions.getNewRoom();
    this.flagAddRoom=false;
    console.log(this.newRoom);
  }
}
