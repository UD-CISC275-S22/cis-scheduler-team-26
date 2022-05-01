import "./ShowDegreeRequirements.css";
import React from "react";
import { Course } from "../../Interfaces/course";
import { Degree } from "../../Interfaces/degree";
import { Semester } from "../../Interfaces/semester";

export function DegreeRequirements({
    degree, //degree is the degree to get requirements from
    semesterList //courses is a list of the
}: {
    degree: Degree;
    semesterList: Semester[];
}): JSX.Element {
    /* Checks if a course is in the list
    I dont use array.includes method because its too sensitive, it returns false unless everything is the same
    This checks for equality just using the course name and id. */
    function isCourseInList(course: Course, list: Course[]): boolean {
        const check: string = course.courseName + course.id.toString();
        const checklist: string[] = [];
        list.map((course: Course) =>
            checklist.push(course.courseName + course.id.toString())
        );
        return checklist.includes(check);
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
            <div className="degree-requirements-body">
                {degree.requiredCourses.map((course: Course) =>
                    renderCourse(course, isCourseInList(course, courses))
                )}
            </div>
        </div>
    );
}

//component to render a single course
function renderCourse(course: Course, isFulfilled: boolean): JSX.Element {
    return (
        <div
            className="degree-requirements-course"
            key={course.courseName + course.id.toString()}
        >
            {course.courseName + course.id.toString() + " " + isFulfilled}
        </div>
    );
}
