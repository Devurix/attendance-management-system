import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assignment } from 'app/core/models/assignment.model';

const STORAGE_KEY = 'assignments';

@Injectable({ providedIn: 'root' })
export class AssignmentsService {
    private _assignments$ = new BehaviorSubject<Assignment[]>(this._load());

    private _load(): Assignment[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Assignment[]) : [];
    }

    private _save(assignments: Assignment[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
    }

    get assignments$(): Observable<Assignment[]> {
        return this._assignments$.asObservable();
    }

    add(assignment: Assignment): void {
        const assignments = [...this._assignments$.value, assignment];
        this._assignments$.next(assignments);
        this._save(assignments);
    }
}
