//This applies any changes made in the course list to the courses in all degree plans
//so deleting a course or modifying it changes the instance in a degree plan
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Course } from "../../Interfaces/course";
import { Semester } from "../../Interfaces/semester";

//iterates through every plan in planlist and every semester in plan and
//every course in semester to update instances of oldCourse to newCourse
export function changeCoursesInPlans(
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
            semester.courseList.map((course: Course) => {
                if (areCoursesEqual(oldCourse, course)) {
                    if (newCourse === null) return;
                    else newCourseList.push(newCourse);
                } else newCourseList.push(course);
            });
            newSemesterList.push({
                year: semester.year,
                season: semester.season,
                courseList: newCourseList,
                totalCredits: 0 //THIS MUST BE CHANGED, CALCULATE THE NEW NUMBER OF CREDITS
            });
        });
    });
    return;
}

function areCoursesEqual(c1: Course, c2: Course): boolean {
    return (
        c1.courseName + c1.id.toString() === c2.courseName + c2.id.toString()
    );
}
