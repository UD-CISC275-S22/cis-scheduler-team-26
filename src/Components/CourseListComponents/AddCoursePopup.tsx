import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
//icon imports
import { AiOutlineCheck } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

export function AddCourseForm({
    addingCourse,
    setAddingCourse,
    newCourseDepartment,
    setNewCourseDepartment,
    newCourseID,
    setNewCourseID,
    newCourseName,
    setNewCourseName,
    newCourseCredits,
    setNewCourseCredits,
    courseList,
    addCourse
}: {
    addingCourse: boolean;
    setAddingCourse: (bool: boolean) => void;
    newCourseDepartment: string;
    setNewCourseDepartment: (newDep: string) => void;
    newCourseID: number;
    setNewCourseID: (num: number) => void;
    newCourseName: string;
    setNewCourseName: (n: string) => void;
    newCourseCredits: number;
    setNewCourseCredits: (newCred: number) => void;
    courseList: Course[];
    addCourse: (newCode: string, newCredits: number, newName: string) => void;
}): JSX.Element {
    /* Checks if a course already exists in the courseList */
    function doesCourseExist(name: string) {
        const courseNames: string[] = [];
        courseList.map((course: Course) => courseNames.push(course.code));
        return courseNames.includes(name);
    }
    return (
        <Modal
            show={addingCourse}
            onHide={() => setAddingCourse(false)}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formNewCourse">
                    {/* The weird nesting of divs is required here to render properly */}
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>
                            <Form.Label>Course Department</Form.Label>
                            <Form.Control
                                placeholder="ex. CISC"
                                data-testid="addDep"
                                type="text"
                                value={newCourseDepartment}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setNewCourseDepartment(event.target.value)}
                            ></Form.Control>
                        </div>
                        <div>
                            <Form.Label>Course ID</Form.Label>
                            <Form.Control
                                placeholder="ex. 110"
                                data-testid="addId"
                                type="number"
                                value={newCourseID}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) =>
                                    setNewCourseID(
                                        parseInt(event.target.value) || 0
                                    )
                                }
                            ></Form.Control>
                        </div>
                    </div>
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={newCourseName}
                        onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => setNewCourseName(event.target.value)}
                    ></Form.Control>
                    <Form.Label>Course Credits</Form.Label>
                    <Form.Control
                        data-testid="addCredits"
                        type="number"
                        value={newCourseCredits}
                        onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                        ) =>
                            setNewCourseCredits(
                                parseInt(event.target.value) || 0
                            )
                        }
                    ></Form.Control>
                </Form.Group>
                {doesCourseExist(
                    newCourseDepartment.toUpperCase() +
                        " " +
                        newCourseID.toString()
                ) && (
                    <div style={{ color: "red", fontSize: "120%" }}>
                        This course already exists!
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                {/* Confirm button */}
                <Button
                    style={{ backgroundColor: "green", borderColor: "green" }}
                    onClick={() => {
                        if (
                            doesCourseExist(
                                newCourseDepartment +
                                    " " +
                                    newCourseID.toString()
                            )
                        )
                            return;

                        setAddingCourse(false);
                        addCourse(
                            newCourseDepartment + " " + newCourseID,
                            newCourseCredits,
                            newCourseName
                        );
                        setNewCourseCredits(0);
                        setNewCourseDepartment("");
                        setNewCourseID(0);
                        setNewCourseName("");
                    }}
                >
                    <AiOutlineCheck></AiOutlineCheck> Confirm
                </Button>
                <Button
                    style={{ backgroundColor: "red", borderColor: "red" }}
                    onClick={() => {
                        setAddingCourse(false);
                        setNewCourseCredits(0);
                        setNewCourseDepartment("");
                        setNewCourseID(0);
                    }}
                >
                    <ImCancelCircle></ImCancelCircle> Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
