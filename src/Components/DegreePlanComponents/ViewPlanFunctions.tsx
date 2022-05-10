import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Season, Semester } from "../../Interfaces/semester";

function findCourseInPlan(checkPlan: DegreePlan, findCourse: Course): boolean {
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

function removeSemHelp(
    curr: DegreePlan,
    season: Season,
    year: number
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.filter(
            (sem: Semester): boolean => sem.season != season || sem.year != year
        )
    };
}
export function removeSemester(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    season: Season,
    year: number
) {
    setPlans(
        planList.map(
            (curr: DegreePlan): DegreePlan =>
                curr === plan ? removeSemHelp(curr, season, year) : curr
        )
    );
}
function addCourseToSemList(currSem: Semester, addingCourse: Course) {
    return {
        ...currSem,
        courseList: [...currSem.courseList, addingCourse]
    };
}
function addCourseHelp(
    curr: DegreePlan,
    editingSem: Semester,
    addingCourse: Course
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.map(
            (currSem: Semester): Semester =>
                currSem.season === editingSem.season &&
                currSem.year === editingSem.year
                    ? addCourseToSemList(currSem, addingCourse)
                    : currSem
        )
    };
}
export function addCourse(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    editingSem: Semester,
    addingCourse: Course
) {
    if (!findCourseInPlan(plan, addingCourse)) {
        setPlans(
            planList.map(
                (curr: DegreePlan): DegreePlan =>
                    curr === plan
                        ? addCourseHelp(curr, editingSem, addingCourse)
                        : curr
            )
        );
    }
}
function removeCourseFromSemester(check: Semester, course: Course): Semester {
    return {
        ...check,
        courseList: check.courseList.filter(
            (currCourse: Course): boolean => currCourse != course
        )
    };
}
export function removeCourseHelp(
    course: Course,
    sem: Semester,
    curr: DegreePlan
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.map(
            (check: Semester): Semester =>
                check === sem ? removeCourseFromSemester(check, course) : check
        )
    };
}
export function removeCourse(
    course: Course,
    sem: Semester,
    plan: DegreePlan,
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
) {
    setPlans(
        plans.map(
            (curr: DegreePlan): DegreePlan =>
                curr === plan ? removeCourseHelp(course, sem, curr) : curr
        )
    );
}
function clearCourses(curr: DegreePlan, editingSem: Semester): Semester[] {
    return curr.semesterList.map(
        (check: Semester): Semester =>
            check === editingSem ? { ...check, courseList: [] } : check
    );
}
export function clearSem(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    editingSem: Semester
) {
    const newPlans: DegreePlan[] = planList.map(
        (curr: DegreePlan): DegreePlan =>
            curr === plan
                ? { ...curr, semesterList: clearCourses(curr, editingSem) }
                : curr
    );
    setPlans(newPlans);
}
