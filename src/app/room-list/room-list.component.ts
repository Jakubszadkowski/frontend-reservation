import { Component, OnInit } from '@angular/core';
import { Room } from '../model/room.model';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.sass']
})
export class RoomListComponent implements OnInit {

  constructor(private roomService: RoomService) { }
  groundFloor:Room[]=[];
  firstFloor:Room[]=[];
  secondFloor:Room[]=[];
  thirdFloor:Room[]=[];
  forthFloor:Room[]=[];
  ngOnInit(): void {
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
  // rooms:Room[][]=new Array<Array<Room>>();
  // ngOnInit(): void{
  //   for (let index = 0; index < 5; index++) {
  //     this.roomService.getRoomsByFloor(index.toString()).subscribe({
  //       next:(data:Room[])=>{
  //         this.rooms[index]=data;
  //       },
  //       error:(e)=>{console.log(e)}
  //     })
  //   }
  //   console.log(this.rooms)
  // }
}
