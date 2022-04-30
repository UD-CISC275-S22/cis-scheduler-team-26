import React from "react";
import { Course } from "../../Interfaces/course";

//Renders a specific course
export function RenderCourse(course: Course): JSX.Element {
    return <div>{course.courseName}</div>;
}
