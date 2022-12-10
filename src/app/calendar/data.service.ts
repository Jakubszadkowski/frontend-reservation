import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayPilot } from '@daypilot/daypilot-lite-angular';

@Injectable()
export class DataService {

  events: DayPilot.EventData[] = [
    {
      id: "1",
      start: DayPilot.Date.today().addHours(10),
      end: DayPilot.Date.today().addHours(12),
      text: "Event 1"
    },
	{
      id: "2",
      start: DayPilot.Date.today().addHours(14),
      end: DayPilot.Date.today().addHours(16),
      text: "Event 2"
    }
  ];

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

}
