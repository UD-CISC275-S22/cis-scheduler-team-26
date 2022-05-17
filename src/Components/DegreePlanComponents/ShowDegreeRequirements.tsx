import "./ShowDegreeRequirements.css";
import React from "react";
import { Course } from "../../Interfaces/course";
import { Degree } from "../../Interfaces/degree";
import { Semester } from "../../Interfaces/semester";

//icon imports
import { AiOutlineCheck } from "react-icons/ai";
import { MdDoNotDisturbAlt } from "react-icons/md";

export function DegreeRequirements({
    degree, //degree is the degree to get requirements from
    semesterList //list of semesters in the plan
}: {
    degree: Degree;
    semesterList: Semester[];
}): JSX.Element {
    const courses = getCourses(semesterList);
    return (
        <div className="degree-requirements">
            <h1>Requirements</h1>
            <div>
                Completed {getTotalCredits(courses)} of {degree.requiredCredits}{" "}
                required credits
            </div>
            <div className="degree-requirements-body">
                {degree.requiredCourses.map((courseCode: string) =>
                    renderCourse(
                        courseCode,
                        isCourseInList(courseCode, courses)
                    )
                )}
            </div>
            <div className="degree-breadth-body">
                {calculateCAH(courses, degree)}
                {calculateHCC(courses, degree)}
                {calculateSBS(courses, degree)}
                {calculateMNST(courses, degree)}
            </div>
        </div>
    );

    /* Checks if a course is in the list
    I dont use array.includes method because its too sensitive, it returns false unless everything is the same
    This checks for equality just using the course name and id. */
    function isCourseInList(course: string, list: Course[]): boolean {
        const checklist: string[] = [];
        list.map((course: Course) => checklist.push(course.code));
        return checklist.includes(course);
    }

    /* Takes in a list of semesters and returns a list of all courses in the semesters.
    I do this here so I dont need to do it in the ViewingPlan file. */
    function getCourses(semesters: Semester[]): Course[] {
        const courses: Course[] = [];
        semesters.map((semester: Semester) => {
            semester.courseList.map((course: Course) => {
                courses.push(course);
            });
        });
        return courses;
    }

    /* Takes a list of courses and returns the total number of credits over that list */
    function getTotalCredits(courses: Course[]): number {
        const creditsList: number[] = [];
        courses.map((course: Course) => creditsList.push(course.credits));
        const total = creditsList.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        return total;
    }
}

//component to render a single course
function renderCourse(course: string, isFulfilled: boolean): JSX.Element {
    const color = isFulfilled ? "lightgreen" : "lightpink";
    return (
        <div
            className="degree-requirements-course"
            data-testid="requirements-course-colored"
            style={{ backgroundColor: color }}
            key={course}
        >
            <div className="degree-requirements-course-text">
                {course}{" "}
                {isFulfilled ? (
                    <AiOutlineCheck></AiOutlineCheck>
                ) : (
                    <MdDoNotDisturbAlt></MdDoNotDisturbAlt>
                )}
            </div>
        </div>
    );
}
function calculateCAH(courses: Course[], degree: Degree): JSX.Element {
    const credits = courses.reduce(
        (currTotal: number, currCourse: Course) =>
            currCourse.breadth.includes("Creative Arts and Humanities")
                ? currTotal + currCourse.credits
                : currTotal,
        0
    );
    return (
        <div className="breadth-req-text">
            Creative Arts and Humanities:
            {credits >= degree.breadthRequirements[0] ? (
                <div className="fulfilled-breadth-text">Satisfied</div>
            ) : (
                <div className="unfulfilled-breadth-text">
                    Need {degree.breadthRequirements[0] - credits} more credits
                </div>
            )}
        </div>
    );
}
function calculateHCC(courses: Course[], degree: Degree): JSX.Element {
    const credits = courses.reduce(
        (currTotal: number, currCourse: Course) =>
            currCourse.breadth.includes("History and Cultural Change")
                ? currTotal + currCourse.credits
                : currTotal,
        0
    );
    return (
        <div className="breadth-req-text">
            History and Cultural Change:
            {credits >= degree.breadthRequirements[1] ? (
                <div className="fulfilled-breadth-text">Satisfied</div>
            ) : (
                <div className="unfulfilled-breadth-text">
                    Need {degree.breadthRequirements[1] - credits} more credits
                </div>
            )}
        </div>
    );
}
function calculateSBS(courses: Course[], degree: Degree): JSX.Element {
    const credits = courses.reduce(
        (currTotal: number, currCourse: Course) =>
            currCourse.breadth.includes("Social and Behavioral Sciences")
                ? currTotal + currCourse.credits
                : currTotal,
        0
    );
    return (
        <div className="breadth-req-text">
            Social and Behavioral Sciences:
            {credits >= degree.breadthRequirements[2] ? (
                <div className="fulfilled-breadth-text">Satisfied</div>
            ) : (
                <div className="unfulfilled-breadth-text">
                    Need {degree.breadthRequirements[2] - credits} more credits
                </div>
            )}
        </div>
    );
}
function calculateMNST(courses: Course[], degree: Degree): JSX.Element {
    const credits = courses.reduce(
        (currTotal: number, currCourse: Course) =>
            currCourse.breadth.includes(
                "Mathematics, Natural Sciences and Technology"
            ) && !degree.requiredCourses.includes(currCourse.code, 0)
                ? currTotal + currCourse.credits
                : currTotal,
        0
    );
    return (
        <div className="breadth-req-text">
            Mathematics, Natural Sciences and Technology:
            {credits >= degree.breadthRequirements[3] ? (
                <div className="fulfilled-breadth-text">Satisfied</div>
            ) : (
                <div className="unfulfilled-breadth-text">
                    Need {degree.breadthRequirements[3] - credits} more credits
                </div>
            )}
        </div>
    );
}
