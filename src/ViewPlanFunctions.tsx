import { Course } from "./Interfaces/course";
import { DegreePlan } from "./Interfaces/degreePlan";
import { Semester } from "./Interfaces/semester";

export function calculateScore(
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
) {
    function scoreTotal(curr: Semester): Semester {
        return {
            ...curr,
            totalCredits: curr.courseList.reduce(
                (currentTotal: number, currCourse: Course) =>
                    currentTotal + currCourse.numCredits,
                0
            )
        };
    }
    function scoreSemester(curr: DegreePlan): DegreePlan {
        return {
            ...curr,
            semesterList: curr.semesterList.map(
                (check: Semester): Semester => scoreTotal(check)
            )
        };
    }
    function scorePlan(curr: DegreePlan): DegreePlan {
        return {
            ...curr,
            totalCredits: curr.semesterList.reduce(
                (currentTotal: number, currSem: Semester) =>
                    currentTotal + currSem.totalCredits,
                0
            )
        };
    }
    let newPlans: DegreePlan[] = planList.map(
        (curr: DegreePlan): DegreePlan => scoreSemester(curr)
    );
    newPlans = newPlans.map((curr: DegreePlan): DegreePlan => scorePlan(curr));
    setPlans(newPlans);
}

export function find_course(
    checkPlan: DegreePlan,
    findCourse: Course
): boolean {
    if (
        checkPlan.semesterList.find(
            (curr: Semester): boolean =>
                curr.courseList.find(
                    (check: Course): boolean =>
                        check.courseName === findCourse.courseName &&
                        check.id === findCourse.id &&
                        check.numCredits === findCourse.numCredits
                ) != undefined
        ) != undefined
    ) {
        return true;
    }
    return false;
}
