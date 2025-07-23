import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AttendanceRecord } from 'app/core/models/attendance.model';

const STORAGE_KEY = 'attendanceRecords';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
    private _records$ = new BehaviorSubject<AttendanceRecord[]>(this._load());

    /** Load records from localStorage */
    private _load(): AttendanceRecord[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as AttendanceRecord[]) : [];
    }

    /** Persist records to localStorage */
    private _save(records: AttendanceRecord[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }

    /** Observable stream of records */
    get records$(): Observable<AttendanceRecord[]> {
        return this._records$.asObservable();
    }

    /** Add a new record */
    add(record: AttendanceRecord): void {
        const records = [...this._records$.value, record];
        this._records$.next(records);
        this._save(records);
    }
}
