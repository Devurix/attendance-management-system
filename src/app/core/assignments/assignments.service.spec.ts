import { TestBed } from '@angular/core/testing';
import { AssignmentsService } from './assignments.service';
import { Assignment } from 'app/core/models/assignment.model';

describe('AssignmentsService', () => {
    let service: AssignmentsService;

    beforeEach(() => {
        localStorage.clear();
        TestBed.configureTestingModule({});
        service = TestBed.inject(AssignmentsService);
    });

    it('should add and retrieve assignments', () => {
        const assignment: Assignment = {
            id: 'a1',
            subjectId: 'math',
            title: 'Test',
            dueDate: new Date().toISOString(),
            description: 'desc',
            submissions: [],
        };
        service.add(assignment);
        service.assignments$.subscribe((as) => {
            expect(as.length).toBe(1);
            expect(as[0].id).toBe('a1');
        });
    });
});
