import { Course } from "./course";

export type Season = "Fall" | "Winter" | "Spring" | "Summer";

export function validSeason(check: string): Season {
    if (check === "Winter") {
        return "Winter";
    } else if (check === "Spring") {
        return "Spring";
    } else if (check === "Summer") {
        return "Summer";
    } else {
        return "Fall";
    }
}

export interface Semester {
    /** The year this semester is in */
    year: number;
    /** Winter, Spring, Summer, or Fall */
    season: Season;
    /** A list of all the courses being taken this semester */
    courseList: Course[];
}
