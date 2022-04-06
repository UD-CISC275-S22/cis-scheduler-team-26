export interface Course {
    /** The course number */
    id: number;
    /** The name of this course */
    courseName: string;
    /** The number of credits this course is worth */
    numCredits: number;
    /** A list of the courses required to take this course */
    preReq: string[];
    /** Whether or not this course has been taken */
    taken: boolean;
}
//create empty course list to begin with
const courseList: Course[] = [];
/** Add courses to the course list*/
export function addCourse({
    id,
    courseName,
    numCredits,
    preReq,
    taken
}: Course): void {
    courseList.push({ id, courseName, numCredits, preReq, taken });
}
export function removeCourse(rid: number, rcourseName: string) {
    const index = courseList.findIndex(
        (Course): boolean =>
            Course.id === rid && Course.courseName === rcourseName
    );
    courseList.splice(index, 1);
}
/**Makes the first semester of classes for you */
/**The parameters are for adding a breadth that the person
 * chooses to take for the first semester.*/
function setUpCourseList(
    BTid: number,
    BTcourseName: string,
    BTnumCredits: number,
    BTpreReq: string[],
    BTtaken: boolean
): void {
    addCourse({
        id: 101,
        courseName: "EGGG",
        numCredits: 3,
        preReq: [],
        taken: false
    });
    addCourse({
        id: 108,
        courseName: "CISC",
        numCredits: 3,
        preReq: [],
        taken: false
    });
    addCourse({
        id: 241,
        courseName: "MATH",
        numCredits: 3,
        preReq: [],
        taken: false
    });
    addCourse({
        id: 110,
        courseName: "ENGL",
        numCredits: 3,
        preReq: [],
        taken: false
    });
    addCourse({
        id: BTid,
        courseName: BTcourseName,
        numCredits: BTnumCredits,
        preReq: BTpreReq,
        taken: BTtaken
    });
}
export function getCourseList(): Course[] {
    return courseList;
}
setUpCourseList(151, "ARTH", 3, [], false);
