import React, { useState } from "react";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import "./RenderCourse.css";
import { Button, Form } from "react-bootstrap";
import { updateCoursesInPlans } from "./UpdateCoursesInPlansFunction";

//icon imports
import { BsTrash } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineRollback, AiOutlineCheck } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

//Renders a specific course
export function RenderCourse({
    Course,
    deleteCourse,
    editCourse,
    resetCourse,
    planList,
    setPlanList
}: {
    Course: Course;
    deleteCourse: () => void;
    editCourse: (newName: string, newID: number, newCreds: number) => void;
    resetCourse: () => void;
    planList: DegreePlan[];
    setPlanList: (d: DegreePlan[]) => void;
}): JSX.Element {
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
    //fancy color states
    const [backgroundColorIndex, setBackgroundColorIndex] = useState<number>(0);
    const colors = ["white", "lightgray"];

    return (
        <div
            className="courselist-course"
            style={{ backgroundColor: colors[backgroundColorIndex] }}
        >
            {!editingCourse ? (
                <div
                    onClick={() => setRenderExpanded(!renderExpanded)}
                    onMouseOver={() => setBackgroundColorIndex(1)}
                    onMouseLeave={() => setBackgroundColorIndex(0)}
                >
                    {/* Header of the rendered course */}
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
                                <TiEdit
                                    style={{ marginBottom: "4px" }}
                                ></TiEdit>{" "}
                                Edit
                            </Button>
                            <Button onClick={() => resetCourse()}>
                                <AiOutlineRollback
                                    style={{
                                        marginBottom: "5px"
                                    }}
                                ></AiOutlineRollback>{" "}
                                Reset
                            </Button>
                            <Button
                                onClick={deleteCourse}
                                style={{
                                    backgroundColor: "red",
                                    borderColor: "red"
                                }}
                            >
                                <BsTrash
                                    style={{ marginBottom: "3px" }}
                                ></BsTrash>{" "}
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                //Block to display editing course
                <EditingCourseForm
                    Course={Course}
                    editCourse={() =>
                        editCourse(
                            newCourseDepartment,
                            newCourseID,
                            newCourseCredits
                        )
                    }
                    setEditingCourse={setEditingCourse}
                    newCourseDepartment={newCourseDepartment}
                    setNewCourseDepartment={setNewCourseDepartment}
                    newCourseID={newCourseID}
                    setNewCourseID={setNewCourseID}
                    newCourseCredits={newCourseCredits}
                    setNewCourseCredits={setNewCourseCredits}
                    updateCoursesInPlans={() =>
                        updateCoursesInPlans(planList, setPlanList, Course, {
                            id: newCourseID,
                            courseName: newCourseDepartment,
                            numCredits: newCourseCredits,
                            preReq: []
                        })
                    }
                ></EditingCourseForm>
            )}
        </div>
    );
}

function EditingCourseForm({
    Course,
    editCourse,
    setEditingCourse,
    newCourseDepartment,
    setNewCourseDepartment,
    newCourseID,
    setNewCourseID,
    newCourseCredits,
    setNewCourseCredits,
    updateCoursesInPlans
}: {
    Course: Course;
    editCourse: () => void;
    setEditingCourse: (n: boolean) => void;
    newCourseDepartment: string;
    setNewCourseDepartment: (n: string) => void;
    newCourseID: number;
    setNewCourseID: (n: number) => void;
    newCourseCredits: number;
    setNewCourseCredits: (n: number) => void;
    updateCoursesInPlans: () => void;
}): JSX.Element {
    return (
        <div>
            <Form.Group controlId="Change Course Dep">
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* Form for new course department */}
                    <Form.Control
                        type="text"
                        value={newCourseDepartment}
                        onChange={(event: ChangeEvent) =>
                            setNewCourseDepartment(event.target.value)
                        }
                    />
                    {/* Form for new course ID */}
                    <Form.Control
                        type="number"
                        value={newCourseID}
                        onChange={(event: ChangeEvent) =>
                            setNewCourseID(parseInt(event.target.value) || 0)
                        }
                    />
                </div>
                {/* Form for new course credits */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginTop: "5px" }}>Credits: </div>
                    <Form.Control
                        type="number"
                        value={newCourseCredits}
                        onChange={(event: ChangeEvent) =>
                            setNewCourseCredits(
                                parseInt(event.target.value) || 0
                            )
                        }
                    />
                </div>
            </Form.Group>
            {/*Confirm Button */}
            <Button
                style={{ backgroundColor: "green", borderColor: "green" }}
                onClick={() => {
                    setEditingCourse(false);
                    editCourse();
                    updateCoursesInPlans();
                }}
            >
                <AiOutlineCheck></AiOutlineCheck> Confirm
            </Button>
            {/*Cancel Button */}
            <Button
                style={{ backgroundColor: "red", borderColor: "red" }}
                onClick={() => {
                    setEditingCourse(false);
                    setNewCourseCredits(Course.numCredits);
                    setNewCourseDepartment(Course.courseName);
                    setNewCourseID(Course.id);
                }}
            >
                <ImCancelCircle></ImCancelCircle> Cancel
            </Button>
        </div>
    );
}
