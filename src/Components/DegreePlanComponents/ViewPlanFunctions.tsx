import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";

export function calculateCredits(
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
) {
    function scoreTotal(curr: Semester): Semester {
        return {
            ...curr,
            totalCredits: curr.courseList.reduce(
                (currentTotal: number, currCourse: Course) =>
                    currentTotal + currCourse.credits,
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
    const newPlans: DegreePlan[] = planList.map(
        (curr: DegreePlan): DegreePlan => scoreSemester(curr)
    );
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
                        check.code === findCourse.code &&
                        check.credits === findCourse.credits
                ) != undefined
        ) != undefined
    ) {
        return true;
    }
    return false;
}
