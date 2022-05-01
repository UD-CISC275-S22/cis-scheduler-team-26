import React, { useState } from "react";
import { Course } from "../../Interfaces/course";
import { FiMoreVertical } from "react-icons/fi";
import "./RenderCourse.css";

//Renders a specific course
export function RenderCourse({ Course }: { Course: Course }): JSX.Element {
    //Stores the original state of the course for reset button
    const [originalState] = useState<Course>(Course);
    //State determining whether to render expanded information
    const [renderExpanded, setRenderExpanded] = useState<boolean>(false);
    return (
        <div
            className="courselist-course"
            onClick={() => setRenderExpanded(!renderExpanded)}
        >
            <div style={{ display: "flex", flexDirection: "row" }}>
                <h5
                    style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        marginLeft: "10px"
                    }}
                >
                    {Course.courseName + Course.id}
                </h5>
                <FiMoreVertical
                    style={{
                        alignSelf: "flex-end",
                        fontSize: "20px",
                        marginBottom: "7px"
                    }}
                ></FiMoreVertical>
            </div>
            {renderExpanded && (
                <div style={{ marginLeft: "20px" }}>
                    <div>Credits: {Course.numCredits}</div>
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
            )}
        </div>
    );
}
