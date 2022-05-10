import { Course } from "../Interfaces/course";
import allCoursesJSON from "./catalog.json";

export const courseList: Course[] = [];
/*
Some of our project is built assuming all courses exist in an array
Its certainly better to use the record type but I don't have time to
refactor large parts of the project. If we had more time this is definetly
something we would change.
*/
const all_courses_record: Record<string, Record<string, Course>> = JSON.parse(
    JSON.stringify(allCoursesJSON)
);
Object.entries(all_courses_record).map((courses) => {
    Object.entries(courses[1]).map((courseObj) => {
        courseList.push({
            ...courseObj[1],
            //I know this looks funky but it is required
            credits: parseInt(courseObj[1].credits.toString())
        });
    });
});
