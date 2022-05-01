import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { removeCourseHelp, addCourse } from "./ViewingPlan";

export function movePopup(
    move: boolean,
    setMove: (newMove: boolean) => void,
    moveSem: Semester,
    setMoveSem: (newSem: Semester) => void,
    plan: DegreePlan,
    setPlans: (newPlans: DegreePlan[]) => void,
    planList: DegreePlan[],
    course: Course
): JSX.Element {
    function setMovingSem(
        setMoveSem: (newSem: Semester) => void,
        sem: string,
        moveSem: Semester,
        plan: DegreePlan
    ): Semester {
        const found = plan.semesterList.find(
            (currSem: Semester): boolean =>
                currSem.season + " " + currSem.year === sem
        );
        if (found === undefined) {
            setMoveSem(moveSem);
            return moveSem;
        } else {
            setMoveSem(found);
            return found;
        }
    }
    return (
        <Modal show={move} onHide={() => setMove(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Move Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*ID*/}
                <Form.Group controlId="formPlanID" as={Row}>
                    <Col>
                        <Form.Group controlId="moveToSemester">
                            <Form.Label>New Semester:</Form.Label>
                            <Form.Select
                                value={moveSem.season + " " + moveSem.year}
                                onChange={(
                                    event: React.ChangeEvent<HTMLSelectElement>
                                ) =>
                                    (moveSem = setMovingSem(
                                        setMoveSem,
                                        event.target.value,
                                        moveSem,
                                        plan
                                    ))
                                }
                            >
                                {plan.semesterList.map((curr: Semester) => (
                                    <option
                                        key={curr.season + " " + curr.year}
                                        value={curr.season + " " + curr.year}
                                    >
                                        {curr.season + " " + curr.year}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outlined"
                    className="m-2"
                    onClick={() => setMove(false)}
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    className="m-2"
                    onClick={() =>
                        moveCourse(
                            plan,
                            planList,
                            setPlans,
                            moveSem,
                            course,
                            setMove
                        )
                    }
                    color="primary"
                >
                    Move Course
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
function moveCourse(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    moveSem: Semester,
    course: Course,
    setMove: (newMove: boolean) => void
) {
    const sem = plan.semesterList.find(
        (currSem: Semester): boolean =>
            currSem.courseList.find(
                (currCourse: Course): boolean => currCourse === course
            ) != undefined
    );
    if (sem != undefined && sem != moveSem) {
        const removedCourse: DegreePlan = removeCourseHelp(course, sem, plan);
        const newPlans: DegreePlan[] = planList.map(
            (curr: DegreePlan): DegreePlan =>
                curr === plan ? removedCourse : curr
        );
        addCourse(removedCourse, newPlans, setPlans, moveSem, course);
    }
    setMove(false);
}
