import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { variable } from '../resource/variable';
import { Booking } from '../model/booking.model';

const httpOptions = {
    headers: new HttpHeaders({ "Access-Control-Allow-Origin": "http://localhost:4200",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS" })
  };

@Injectable({
    providedIn: 'root'
  })

export class BookingService {
    constructor(private http: HttpClient) { }

    getMyBookings(userId:string):Observable<any>{
        return this.http.get<Booking[]>(variable.API_URL + 'booking/getAllUserBookings/'+userId, httpOptions);
    }
    getBookingBtRoom(roomId:string):Observable<any>{
      return this.http.get<Booking[]>(variable.API_URL+'booking/getAllBookingsByRoomId/'+roomId,httpOptions);
    }
}