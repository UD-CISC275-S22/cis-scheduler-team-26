import { Degree } from "./degree";
import { Semester } from "./semester";

export interface DegreePlan {
    /** A name for this plan, does not need to be unique */
    planName: string;
    /** A list of all the semesters in this plan */
    semesterList: Semester[];
    /** The degree from which to draw requirements */
    degree: Degree;
    /** Is the plan saved in local storage */
    isSaved: boolean;
}
