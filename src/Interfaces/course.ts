export interface Course {
    /** The course number */
    id: number;
    /** The name of this course */
    courseName: string;
    /** The number of credits this course is worth */
    numCredits: number;
    /** A list of the courses required to take this course */
    preReq: Course[];
    /** Whether or not this course has been taken */
    taken: boolean;
}
