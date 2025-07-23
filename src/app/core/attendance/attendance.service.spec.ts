import { TestBed } from '@angular/core/testing';
import { AttendanceService } from './attendance.service';
import { AttendanceRecord } from 'app/core/models/attendance.model';

describe('AttendanceService', () => {
    let service: AttendanceService;

    beforeEach(() => {
        localStorage.clear();
        TestBed.configureTestingModule({});
        service = TestBed.inject(AttendanceService);
    });

    it('should add and retrieve records', () => {
        const record: AttendanceRecord = {
            studentId: 's1',
            subjectId: 'math',
            date: new Date().toISOString(),
            status: 'present',
        };
        service.add(record);
        service.records$.subscribe((records) => {
            expect(records.length).toBe(1);
            expect(records[0].studentId).toBe('s1');
        });
    });
});
