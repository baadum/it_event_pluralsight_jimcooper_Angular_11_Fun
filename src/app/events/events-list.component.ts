import { Component, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IEvent } from "./shared/event.module";
import { EventService } from "./shared/event.service";

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html'
})


export class EventsListComponent {
  events!: IEvent[];
    
 constructor( private eventService: EventService,
  private route: ActivatedRoute){

 }
 ngOnInit() {
  this.events= this.route.snapshot.data['events']
 }


}