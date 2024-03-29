import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OthersComponent } from './others/others.component';
import { OtherListComponent } from './other-list/other-list.component';
import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { DayPilotModule } from "daypilot-pro-angular";
import { CalendarComponent } from './calendar/calendar.component';
import { DataService } from './calendar/data.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    BoardAdminComponent,
    OthersComponent,
    OtherListComponent,
    RoomComponent,
    RoomListComponent,
    CalendarComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DayPilotModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
