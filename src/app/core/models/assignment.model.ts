export interface Submission {
    studentId: string;
    fileUrl: string;
    timestamp: string; // ISO string
    marks?: number;
}

export interface Assignment {
    id: string;
    subjectId: string;
    title: string;
    dueDate: string; // ISO string
    description: string;
    attachments?: string[];
    submissions: Submission[];
}
