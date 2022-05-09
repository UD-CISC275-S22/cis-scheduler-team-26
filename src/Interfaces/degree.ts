export interface Degree {
    /** The name of the degree */
    title: string;
    /** A list of all the courses required to get this degree */
    requiredCourses: string[];
    /** The total number of credits required to get this degree */
    requiredCredits: number;
}
