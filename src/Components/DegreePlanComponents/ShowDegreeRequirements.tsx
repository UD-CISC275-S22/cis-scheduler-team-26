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
    semesterList, //courses is a list of the
    credits
}: {
    degree: Degree;
    semesterList: Semester[];
    credits: number;
}): JSX.Element {
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
    const courses = getCourses(semesterList);

    return (
        <div className="degree-requirements">
            <h1>Requirements</h1>
            <div>
                Completed {credits} of {degree.requiredCredits} required credits
            </div>
            <div className="degree-requirements-body">
                {degree.requiredCourses.map((courseCode: string) =>
                    renderCourse(
                        courseCode,
                        isCourseInList(courseCode, courses)
                    )
                )}
            </div>
        </div>
    );
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
