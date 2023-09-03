// angular
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


// components
import { EventsAppComponent } from './events-app.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { appRoutes } from './routes';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component';

// services

import { EventsListComponent } from './events/events-list.component';
import { NavBarComponent } from './nav/navbar.component';
import { EventService } from './events/shared/event.service';
import { AuthService } from './events/user/auth.service';
import { EventListResolver } from './events/events-list-resolver.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { SessionListComponent } from './events/event-details/session-list.component';
import { DurationPipe } from './events/shared/duration.pipe';
import { JQ_TOKEN,
   TOASTR_TOKEN,
   Toastr, 
   CollapsibleWellComponent,
   SimpleModalComponent,  
   ModalTriggerDirective,
   LocationValidator,
   EventResolver
  } from './common/index';
import { UpvoteComponent } from './events/event-details/upvote.component';
import { VoterService } from './events/event-details/voter.service';

let toastr:Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  // imports are used for importing other modules
  imports: [
    BrowserModule, // makes core angular services and directives available; p much for every app
    // preloadingStrategy for downloaded automatically lazy-loaded modules
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}), // ALSO: need to tell angular where our web server is hosted; needs to know where its urls are relative to (index.html base href)
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  // declarations are for components and pipes
  // declarations depend on imports
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    SessionListComponent,
    CreateSessionComponent,
    LocationValidator,
    CollapsibleWellComponent,
    SimpleModalComponent,
    DurationPipe,
    ModalTriggerDirective,
    UpvoteComponent,
  ],
  // providers are for services
  providers: [
    EventService,
    AuthService,
    { provide: TOASTR_TOKEN, useValue: toastr},
    { provide: JQ_TOKEN, useValue: jQuery},
    EventListResolver,
    // { provide: EventService, useValue: EventService }, // longhand version; when this is requested, use this to fulfill it
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState // could define it in another file, but for ease of use... see below
    },
    EventResolver,
    VoterService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent) {
  // need to know whether they've saved or not 
  // first parameter fed to the canDeactivate function is the component
  // return false;

  if(component.isDirty) {
    return window.confirm('You have not saved this event. Do you really want to cancel?');
  }
  return true;
}