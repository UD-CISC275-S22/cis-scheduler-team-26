//This applies any changes made in the course list to the courses in all degree plans
//so deleting a course or modifying it changes the instance in a degree plan
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Course } from "../../Interfaces/course";
import { Semester } from "../../Interfaces/semester";

//iterates through every plan in planlist and every semester in plan and
//every course in semester to update instances of oldCourse to newCourse
export function updateCoursesInPlans(
    planlist: DegreePlan[],
    setPlanlist: (d: DegreePlan[]) => void,
    oldCourse: Course,
    newCourse: Course | null //pass null as newCourse to delete it from semesters
) {
    const newPlanlist: DegreePlan[] = [];
    planlist.map((plan: DegreePlan) => {
        const newSemesterList: Semester[] = [];
        plan.semesterList.map((semester: Semester) => {
            const newCourseList: Course[] = [];
            //populate the new list of courses to construct the new semester with
            semester.courseList.map((course: Course) => {
                if (areCoursesEqual(oldCourse, course)) {
                    if (newCourse !== null) newCourseList.push(newCourse);
                } else newCourseList.push(course);
            });
            //Construct the new semester and push it to the back of the new semester list
            newSemesterList.push({
                year: semester.year,
                season: semester.season,
                courseList: newCourseList,
                totalCredits: getTotalCreditsCourselist(newCourseList)
            });
        });
        newPlanlist.push({
            planName: plan.planName,
            semesterList: newSemesterList,
            degree: plan.degree,
            isSaved: plan.isSaved
        });
    });
    setPlanlist(newPlanlist);
    return;
}

//check if courses are equal by their department and id
function areCoursesEqual(c1: Course, c2: Course): boolean {
    return c1.code === c2.code;
}

//canculate the total number of credits over a course list
function getTotalCreditsCourselist(courseList: Course[]): number {
    const numList: number[] = [];
    courseList.map((course: Course) => numList.push(course.credits));
    const sum = 0;
    numList.reduce((prev, curr) => prev + curr, sum);
    return sum;
}
