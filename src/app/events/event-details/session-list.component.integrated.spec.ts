import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionListComponent } from "./session-list.component"
import { VoterService } from "./voter.service"
import { AuthService } from "../user/auth.service"
import { DurationPipe } from "../shared/duration.pipe";
import { By } from "@angular/platform-browser";
import { CollapsibleWellComponent, UpvoteComponent } from "src/app/common";

describe('SessionListComponent', () => {
     
    let mockAuthService,
        mockVoterService,
        fixture : ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement

    beforeEach(() => {
        mockAuthService = {isAuthenticated:() => true, currentUser: {userName: 'Joe'}}
        mockVoterService = { userHasVoted:() => true}
        TestBed.configureTestingModule({
            //schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],  for 'collapsible-well' and upvote tag
            declarations: [
                SessionListComponent, // test only single comp, without children - shallow integration test 
                DurationPipe,
                CollapsibleWellComponent, // with this child it's deep integration test
                UpvoteComponent // with this child it's deep integration test
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService},
                { provide: VoterService, useValue: mockVoterService}
            ]
        })
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    })

    describe('initial display', () => {

        it('should have the correct title', () => {
            component.sessions = [
                {
                    name: 'Session 1', id: 3, presenter: 'Joe', duration: 1,
                    level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']
                }
            ]
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;
            component.ngOnChanges();

            fixture.detectChanges();
            
            // expect(element.querySelector('[well-title]').textContent).toContain('Session 1')
            // it's possible only one way : from debugEl to nativeElement
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1')  // if you want test text content - this is most popular method
        })
    })
})