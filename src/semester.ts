import { Course } from "./course";

export type Season = "Winter" | "Spring" | "Summer" | "Fall";

export interface Semester {
    /** The year this semester is in */
    year: number;
    /** Winter, Spring, Summer, or Fall */
    season: Season;
    /** A list of all the courses being taken this semester */
    courseList: Course[];
    /** The total number of credits being taken this semester */
    totalCredits: number; //This might not be useful
}
