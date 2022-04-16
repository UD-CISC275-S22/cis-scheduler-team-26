import React, { useState } from "react";
import { Course } from "./Interfaces/course";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

interface coursesListProp {
    setShowCourses: (newShowCourses: boolean) => void;
    setCourses: (newCourses: Course[]) => void;
    courses: Course[];
}

function removeCourse(
    setCourses: (newCourses: Course[]) => void,
    setOldCourses: (newCourses: Course[]) => void,
    courses: Course[],
    oldCourses: Course[],
    removeCourse: Course
) {
    setCourses(
        courses.filter((course: Course): boolean => course != removeCourse)
    );
    setOldCourses(
        oldCourses.filter((course: Course): boolean => course != removeCourse)
    );
}

export function CoursesList({
    setShowCourses,
    setCourses,
    courses
}: coursesListProp): JSX.Element {
    //buttons
    const [addingCourse, setAddCourse] = useState<boolean>(false);
    const [removingCourse, setRemoveCourse] = useState<boolean>(false);
    const [editCourse, setEditCourse] = useState<boolean>(false);
    const [oldCourses, setOldCourses] = useState<Course[]>(courses);
    //course info
    const [courseDep, setCourseDep] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [courseCred, setCourseCred] = useState<number>(0);
    const [courseIndex, setCourseIndex] = useState<number>(0);
    const [canUndo, setUndo] = useState<boolean>(false);
    function saveCourse(oldCourse: Course): void {
        const storeCourse: Course = { ...oldCourse };
        setCourseIndex(
            courses.findIndex(
                (course: Course): boolean =>
                    course.courseName === storeCourse.courseName &&
                    course.id === storeCourse.id
            )
        );
        oldCourses[
            courses.findIndex(
                (course: Course): boolean =>
                    course.courseName === storeCourse.courseName &&
                    course.id === storeCourse.id
            )
        ] = storeCourse;
        setOldCourses([...oldCourses]);
    }
    function changeCourse(): void {
        setUndo(true);
        const changedCourse: Course = {
            id: courseID,
            courseName: courseDep,
            numCredits: courseCred,
            preReq: []
        };
        courses.splice(courseIndex, 1, changedCourse);
        setCourses([...courses]);
    }
    function resetCourse(curr: Course): void {
        if (canUndo) {
            const index: number = courses.findIndex(
                (course: Course): boolean =>
                    course.id === curr.id &&
                    course.courseName === curr.courseName
            );
            const oldCourse: Course = {
                id: oldCourses[index].id,
                courseName: oldCourses[index].courseName,
                numCredits: oldCourses[index].numCredits,
                preReq: []
            };
            courses.splice(index, 1, oldCourse);
            setCourses([...courses]);
        }
    }
    function addNewCourse(): void {
        setCourses([
            ...courses,
            {
                id: courseID,
                courseName: courseDep,
                numCredits: courseCred,
                preReq: []
            }
        ]);
        setOldCourses([
            ...courses,
            {
                id: courseID,
                courseName: courseDep,
                numCredits: courseCred,
                preReq: []
            }
        ]);
    }
    return (
        <div>
            <h3>List of current Courses:</h3>
            {courses.map(
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
                        {removingCourse && (
                            <Button
                                onClick={() =>
                                    removeCourse(
                                        setCourses,
                                        setOldCourses,
                                        courses,
                                        oldCourses,
                                        curr
                                    )
                                }
                                style={{ backgroundColor: "red" }}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                setEditCourse(true), saveCourse(curr);
                            }}
                        >
                            Edit
                        </Button>
                        <Button onClick={() => resetCourse(curr)}>
                            Reset Course
                        </Button>
                    </div>
                )
            )}
            <Button onClick={() => setShowCourses(false)}>
                Return to Degree Plans
            </Button>
            <Button onClick={() => setAddCourse(!addingCourse)}>
                Add Course
            </Button>
            {addingCourse && (
                <Form.Group controlId="Add Course Dep">
                    <Form.Label>Type Course Department: </Form.Label>
                    <Form.Control
                        type="text"
                        value={courseDep}
                        onChange={(event: ChangeEvent) =>
                            setCourseDep(event.target.value)
                        }
                    />
                </Form.Group>
            )}
            {addingCourse && (
                <Form.Group controlId="Add Course ID">
                    <Form.Label>Type Course ID: </Form.Label>
                    <Form.Control
                        type="number"
                        value={courseID}
                        onChange={(event: ChangeEvent) =>
                            setCourseID(parseInt(event.target.value) || 0)
                        }
                    />
                </Form.Group>
            )}
            {addingCourse && (
                <Form.Group controlId="Add Course Credit">
                    <Form.Label>Type number of Credits: </Form.Label>
                    <Form.Control
                        type="number"
                        value={courseCred}
                        onChange={(event: ChangeEvent) =>
                            setCourseCred(parseInt(event.target.value) || 0)
                        }
                    />
                </Form.Group>
            )}
            {editCourse && (
                <Form.Group controlId="Change Course Dep">
                    <Form.Label>Type Course Department: </Form.Label>
                    <Form.Control
                        type="text"
                        value={courseDep}
                        onChange={(event: ChangeEvent) =>
                            setCourseDep(event.target.value)
                        }
                    />
                </Form.Group>
            )}
            {editCourse && (
                <Form.Group controlId="Change Course ID">
                    <Form.Label>Type Course ID: </Form.Label>
                    <Form.Control
                        type="number"
                        value={courseID}
                        onChange={(event: ChangeEvent) =>
                            setCourseID(parseInt(event.target.value) || 0)
                        }
                    />
                </Form.Group>
            )}
            {editCourse && (
                <Form.Group controlId="Change Course Credit">
                    <Form.Label>Type number of Credits: </Form.Label>
                    <Form.Control
                        type="number"
                        value={courseCred}
                        onChange={(event: ChangeEvent) =>
                            setCourseCred(parseInt(event.target.value) || 0)
                        }
                    />
                </Form.Group>
            )}
            {editCourse && (
                <Button
                    onClick={() => {
                        changeCourse(), setEditCourse(!editCourse);
                    }}
                >
                    Submit
                </Button>
            )}
            {addingCourse && (
                <Button
                    onClick={() => {
                        addNewCourse(), setAddCourse(false);
                    }}
                >
                    Submit
                </Button>
            )}
            <Button onClick={() => setRemoveCourse(!removingCourse)}>
                Remove Course
            </Button>
        </div>
    );
}
