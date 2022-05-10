import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";

export function findCourseInPlan(
    checkPlan: DegreePlan,
    findCourse: Course
): boolean {
    if (
        checkPlan.semesterList.find(
            (curr: Semester): boolean =>
                curr.courseList.find(
                    (check: Course): boolean =>
                        check.code === findCourse.code &&
                        check.credits === findCourse.credits
                ) != undefined
        ) != undefined
    ) {
        return true;
    }
    return false;
}
export function findCourseByCode(courses: Course[], check: string): Course {
    const found = courses.find(
        (currCourse: Course): boolean => currCourse.code === check
    );
    if (found === undefined) {
        return courses[0];
    } else {
        return found;
    }
}
