import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {DayPilot, DayPilotCalendarComponent, DayPilotNavigatorComponent} from "daypilot-pro-angular";
import { AppComponent } from '../app.component';
import { RoomComponent } from '../room/room.component';
import { BookingService } from '../_services/booking.service';
import { DataService } from './data.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})

  export class CalendarComponent implements AfterViewInit {

    @ViewChild("navigator") navigator!: DayPilotNavigatorComponent;
    @ViewChild("calendar") calendar!: DayPilotCalendarComponent;
    @Input()
    name:string='';
    get date(): DayPilot.Date {
      return this.config.startDate as DayPilot.Date;
    }
  
    set date(value: DayPilot.Date) {
      this.config.startDate = value;
    }
  
    navigatorConfig: DayPilot.NavigatorConfig = {
      showMonths: 2,
      skipMonths: 3,
      selectMode: "Week",
      cellWidth: 30,
      cellHeight: 30,
      dayHeaderHeight: 30,
      titleHeight: 30
    };
  
    events: DayPilot.EventData[] = [];
  
    config: DayPilot.CalendarConfig = {
      locale: 'pl-pl',
      viewType: "Week",
      headerDateFormat: "d MMMM yyyy",
      businessBeginsHour:8,
      businessEndsHour:21,
      startDate: DayPilot.Date.today(),
      cellHeight: 30,
      cellDuration: 30,
      dayBeginsHour: 8,
      dayEndsHour: 22,
      headerHeight: 30,
      hourWidth: 40,
      allowEventOverlap: false,
      onTimeRangeSelected: async (args) => {
        if(this.app.isLoggedIn){
          const modal = await DayPilot.Modal.prompt("Dodać rezerwacje?:", this.roomComponent.currentUser.title+' '+this.roomComponent.currentUser.name+' '+this.roomComponent.currentUser.surname);
          const dp = args.control;
          dp.clearSelection();
          if (!modal.result) { return; }
          dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result
          });
          this.bookingService.createBooking({
            'bookingId':'',
            'user': this.roomComponent.currentUser,
            'room': this.roomComponent.currentRoom,
            'day': args.start.toString("dd"),
            'month': args.start.toString("MM"),
            'year': args.start.toString("yyyy"),
            'startTime': args.start.toString("HH:mm"),
            'endTime': args.end.toString("HH:mm")
          }).subscribe({
            error:(e)=>
            console.log(e),
            complete:()=>
            console.log("ok")
          })
          console.log(this.events);
        }
      }
    };
  
    constructor(private roomComponent:RoomComponent,private ds: DataService,private app:AppComponent,private bookingService:BookingService) {}
  
    ngAfterViewInit(): void {
      var from = this.calendar.control.visibleStart();
      var to = this.calendar.control.visibleEnd();
      this.ds.getEvents(from, to).subscribe(result => {
        this.events = result;
      });
    }
  
    viewChange(): void {
      var from = this.calendar.control.visibleStart();
      var to = this.calendar.control.visibleEnd();
    }

    navigatePrevious(event: MouseEvent): void {
      event.preventDefault();
      this.config.startDate = (this.config.startDate as DayPilot.Date).addDays(-7);
    }
  
    navigateNext(event: MouseEvent): void {
      event.preventDefault();
      this.config.startDate = (this.config.startDate as DayPilot.Date).addDays(7);
    }
  
    navigateToday(event: MouseEvent): void {
      event.preventDefault();
      this.config.startDate = DayPilot.Date.today();
    }
  
  }