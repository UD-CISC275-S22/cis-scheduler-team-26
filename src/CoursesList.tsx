import React from "react";
import { Course } from "./Interfaces/course";
import { courseList } from "./Resources/Courses";

interface coursesListProp {
    setShowCourses: (newShowCourses: boolean) => void;
}

export function CoursesList({ setShowCourses }: coursesListProp): JSX.Element {
    return (
        <div>
            <h3>List of current Courses:</h3>
            {courseList.map(
                (curr: Course): JSX.Element => (
                    <div key={curr.courseName + curr.id}>
                        {curr.courseName + curr.id}
                        <div>Worth {curr.numCredits} Credits</div>
                        <div>
                            Prerequisite Courses:{" "}
                            {curr.preReq.map(
                                (pre: Course): JSX.Element => (
                                    <div key={curr.courseName + curr.id}>
                                        {pre.courseName + pre.id}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )
            )}
            <button onClick={() => setShowCourses(false)}>
                Return to Degree Plans
            </button>
        </div>
    );
}
