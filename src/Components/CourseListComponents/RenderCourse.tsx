import React, { useState } from "react";
import { Course } from "../../Interfaces/course";
import { FiMoreVertical } from "react-icons/fi";
import "./RenderCourse.css";
import { Button } from "react-bootstrap";

//Renders a specific course
export function RenderCourse({
    Course,
    editCourse,
    deleteCourse
}: {
    Course: Course;
    editCourse: (newName: string, newID: number, newCredits: number) => void;
    deleteCourse: () => void;
}): JSX.Element {
    //Stores the original state of the course for reset button
    const [originalState] = useState<Course>(Course);
    const [isCourseEdited, setIsCourseEdited] = useState<boolean>(false);
    //State determining whether to render expanded information
    const [renderExpanded, setRenderExpanded] = useState<boolean>(false);
    //States for editing course
    const [editingCourse, setEditingCourse] = useState<boolean>(false);
    const [newCourseDepartment, setNewCourseDepartment] = useState<string>(
        Course.courseName
    );
    const [newCourseID, setNewCourseID] = useState<number>(Course.id);
    const [newCourseCredits, setNewCourseCredits] = useState<number>(
        Course.numCredits
    );

    return (
        <div className="courselist-course">
            {!editingCourse ? (
                /* Header of the rendered course */
                <div onClick={() => setRenderExpanded(!renderExpanded)}>
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
                    {/* Body of the rendered course */}
                    {renderExpanded && (
                        <div style={{ marginLeft: "20px" }}>
                            <div>Credits: {Course.numCredits}</div>
                            <div>
                                Prerequisite Courses:{" "}
                                {Course.preReq.map(
                                    (pre: Course): JSX.Element => (
                                        <div
                                            key={Course.courseName + Course.id}
                                        >
                                            {pre.courseName + pre.id}
                                        </div>
                                    )
                                )}
                            </div>
                            <Button onClick={() => setEditingCourse(true)}>
                                Edit
                            </Button>
                            {isCourseEdited && (
                                <Button
                                    onClick={() =>
                                        editCourse(
                                            originalState.courseName,
                                            originalState.id,
                                            originalState.numCredits
                                        )
                                    }
                                >
                                    Reset
                                </Button>
                            )}
                            <Button onClick={deleteCourse}>Delete</Button>
                        </div>
                    )}
                </div>
            ) : (
                //Block to display editing course
                <EditingCourseForm
                    setEditingCourse={setEditingCourse}
                    setIsCourseEdited={setIsCourseEdited}
                    newCourseDepartment={newCourseDepartment}
                    setNewCourseDepartment={setNewCourseDepartment}
                    newCourseID={newCourseID}
                    setNewCourseID={setNewCourseID}
                    newCourseCredits={newCourseCredits}
                    setNewCourseCredits={setNewCourseCredits}
                ></EditingCourseForm>
            )}
        </div>
    );
}

function EditingCourseForm({
    setEditingCourse,
    setIsCourseEdited,
    newCourseDepartment,
    setNewCourseDepartment,
    newCourseID,
    setNewCourseID,
    newCourseCredits,
    setNewCourseCredits
}: {
    setEditingCourse: (n: boolean) => void;
    setIsCourseEdited: (n: boolean) => void;
    newCourseDepartment: string;
    setNewCourseDepartment: (n: string) => void;
    newCourseID: number;
    setNewCourseID: (n: number) => void;
    newCourseCredits: number;
    setNewCourseCredits: (n: number) => void;
}): JSX.Element {
    return (
        <div>
            <div>Editing Course</div>
            {/*Confirm Button */}
            <Button
                style={{ backgroundColor: "green", borderColor: "green" }}
                onClick={() => {
                    setEditingCourse(false);
                }}
            >
                Confirm
            </Button>
            {/*Cancel Button */}
            <Button
                style={{ backgroundColor: "red", borderColor: "red" }}
                onClick={() => {
                    setEditingCourse(false);
                }}
            >
                Cancel
            </Button>
        </div>
    );
}
