import { Degree } from "./degree";
import { Semester } from "./semester";

export interface DegreePlan {
    /** A list of all the semesters in this plan */
    semesterList: Semester[];
    /** The total number of credits required to get this degree */
    degree: Degree;
}
