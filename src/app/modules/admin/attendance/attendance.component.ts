import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AttendanceRecord } from 'app/core/models/attendance.model';
import { AttendanceService } from 'app/core/attendance/attendance.service';

@Component({
    selector: 'attendance-page',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    template: `
    <h2 class="text-xl font-bold mb-4">Attendance Records</h2>
    <table mat-table [dataSource]="records$ | async" class="w-full" *ngIf="records$ | async as records">
        <ng-container matColumnDef="studentId">
            <th mat-header-cell *matHeaderCellDef>Student</th>
            <td mat-cell *matCellDef="let record">{{record.studentId}}</td>
        </ng-container>
        <ng-container matColumnDef="subjectId">
            <th mat-header-cell *matHeaderCellDef>Subject</th>
            <td mat-cell *matCellDef="let record">{{record.subjectId}}</td>
        </ng-container>
        <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let record">{{record.date | date:'shortDate'}}</td>
        </ng-container>
        <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let record">{{record.status}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <p *ngIf="(records$ | async)?.length === 0" class="text-center">No attendance data</p>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class AttendanceComponent {
    displayedColumns = ['studentId', 'subjectId', 'date', 'status'];
    records$: Observable<AttendanceRecord[]> = this._attendanceService.records$;

    constructor(private _attendanceService: AttendanceService) {}
}
