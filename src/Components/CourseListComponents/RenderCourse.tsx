import React from "react";
import { Course } from "../../Interfaces/course";
import "./RenderCourse.css";

//Renders a specific course
export function RenderCourse({ Course }: { Course: Course }): JSX.Element {
    return (
        <div className="courselist-course">
            {Course.courseName + Course.id}
            <div>Worth {Course.numCredits} Credits</div>
            <div>
                Prerequisite Courses:{" "}
                {Course.preReq.map(
                    (pre: Course): JSX.Element => (
                        <div key={Course.courseName + Course.id}>
                            {pre.courseName + pre.id}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
