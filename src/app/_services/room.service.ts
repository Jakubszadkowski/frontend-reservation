import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { variable } from '../resource/variable';
import { Room } from '../model/room.model';

const httpOptions = {
    headers: new HttpHeaders({ "Access-Control-Allow-Origin": "http://localhost:4200",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS" })
  };

@Injectable({
    providedIn: 'root'
  })

export class RoomService {
    constructor(private http: HttpClient) { }
    addRoom(temp:Room):Observable<any>{
      return this.http.post(variable.API_URL+'room/createRoom',temp,httpOptions);
    }
    getAllRooms():Observable<any>{
      return this.http.get<Room[]>(variable.API_URL+'room/getAllRooms',httpOptions);
    }
    getRoomById(roomId:string):Observable<any>{
        return this.http.get(variable.API_URL + 'room/getRoomById/'+roomId, httpOptions);
    }
    getRoomsByFloor(floor:string):Observable<any>{
      return this.http.get<Room[]>(variable.API_URL+'room/getAllRoomsFromFloor/'+floor,httpOptions)
    }
    patchRoom(room:Room):Observable<any>{
      return this.http.patch(variable.API_URL + 'room/patchRoom',room,httpOptions);
    }

}