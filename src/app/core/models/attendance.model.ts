export interface AttendanceRecord {
    studentId: string;
    subjectId: string;
    date: string; // ISO string
    status: 'present' | 'absent' | 'late';
}
