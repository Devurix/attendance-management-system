import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Assignment } from 'app/core/models/assignment.model';
import { AssignmentsService } from 'app/core/assignments/assignments.service';

@Component({
    selector: 'assignments-page',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    template: `
    <h2 class="text-xl font-bold mb-4">Assignments</h2>
    <table mat-table [dataSource]="assignments$ | async" class="w-full" *ngIf="assignments$ | async as rows">
        <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let row">{{row.title}}</td>
        </ng-container>
        <ng-container matColumnDef="dueDate">
            <th mat-header-cell *matHeaderCellDef>Due</th>
            <td mat-cell *matCellDef="let row">{{row.dueDate | date:'shortDate'}}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <p *ngIf="(assignments$ | async)?.length === 0" class="text-center">No assignments found</p>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class AssignmentsComponent {
    displayedColumns = ['title', 'dueDate'];
    assignments$: Observable<Assignment[]> = this._assignmentsService.assignments$;

    constructor(private _assignmentsService: AssignmentsService) {}
}
