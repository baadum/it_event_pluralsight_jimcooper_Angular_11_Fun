import { Routes } from '@angular/router';

import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component';
import { EventsListComponent } from './events/events-list.component';
import { EventListResolver } from './events/events-list-resolver.service';
import { EventResolver } from './events/event-resolver.service';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { SessionListComponent } from './events/event-details/session-list.component';

// compile-time safety with ":Routes"
export const appRoutes:Routes = [
    // whenever the url matches, show this component in the router-outlet component
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] }, // 'events/new' matches 'events/:id' (ordering this first is important bc processes it first)
        // don't need a complicated service for canDeactivate; just a function is fine (registered as a provider in the app module)
    { path: 'events', component: EventsListComponent, resolve: {events: EventListResolver} },
    { path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver} }, // /events/1; id = parameter
    // errors
    { path: '404', component: Error404Component },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: 'events/:id', component: SessionListComponent },
    // default
    { path: '', redirectTo: 'events', pathMatch: 'full' },
    { path: 'user',
     loadChildren: () => import('./events/user/user.module')
     .then(m => m.UserModule)
    } 
]

// FIXME: 
// go to '/events/event/id' (no matching route), goes to root 'localhost:4200', doesn't redirect to '/events'?

// TODO: 
// { path: '**', Component: PageNotFoundComponent } (https://medium.com/@nishu0505/error-cannot-match-any-routes-4188350b348f) 
