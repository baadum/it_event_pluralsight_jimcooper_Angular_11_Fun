import { style } from "@angular/animations";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
    <h1>{{event.name | uppercase}}</h1>
    <div>Date: {{event.date | date:'shortDate'}}</div>
    <div>Time: {{event.time}}</div>
    <div>Price: {{event.price | currency:'USD'}}</div>
    <div>
        <span>Location: {{event.location?.address}} </span>
        <span>&nbsp;</span>
        <span>{{event.location?.city}}, {{event.location?.country}}</span>
    </div>
    </div>

    `,
    styles: [
        `
        .thumbnail {min-height: 250px;}
        .pad-left { margin-left: 10px;}
        .well_div { color: #bbb;}
        `
    ]
})


export class EventThumbnailComponent {
   @Input() event: any

}