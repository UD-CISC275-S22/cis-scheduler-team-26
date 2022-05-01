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
    newCourseCredits,
    setNewCourseCredits,
    courseList,
    setCourseList
}: {
    addingCourse: boolean;
    setAddingCourse: (bool: boolean) => void;
    newCourseDepartment: string;
    setNewCourseDepartment: (newDep: string) => void;
    newCourseID: number;
    setNewCourseID: (num: number) => void;
    newCourseCredits: number;
    setNewCourseCredits: (newCred: number) => void;
    courseList: Course[];
    setCourseList: (courses: Course[]) => void;
}): JSX.Element {
    /* Checks if a course already exists in the courseList */
    function doesCourseExist(name: string) {
        const courseNames: string[] = [];
        courseList.map((course: Course) =>
            courseNames.push(course.courseName + course.id.toString())
        );
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
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>
                            <Form.Label>Course Department</Form.Label>
                            <Form.Control
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
                    <Form.Label>Course Credits</Form.Label>
                    <Form.Control
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
                    newCourseDepartment + newCourseID.toString()
                ) && (
                    <div style={{ color: "red" }}>
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
                            !doesCourseExist(
                                newCourseDepartment + newCourseID.toString()
                            )
                        ) {
                            setAddingCourse(false);
                            setCourseList([
                                ...courseList,
                                {
                                    id: newCourseID,
                                    courseName: newCourseDepartment,
                                    numCredits: newCourseCredits,
                                    preReq: []
                                }
                            ]);
                            setNewCourseCredits(0);
                            setNewCourseDepartment("");
                            setNewCourseID(0);
                        }
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
