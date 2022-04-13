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
    courses: Course[],
    removeCourse: Course
) {
    setCourses(
        courses.filter((course: Course): boolean => course != removeCourse)
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
    //course info
    const [courseDep, setCourseDep] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [courseCred, setCourseCred] = useState<number>(0);
    const [courseTaken, setTaken] = useState<boolean>(false);
    const [courseIndex, setCourseIndex] = useState<number>(0);
    const [currCourse, setCurrCourse] = useState<Course>({
        id: 0,
        courseName: "0",
        numCredits: 0,
        taken: false,
        preReq: []
    });
    function saveCourse(oldCourse: Course): void {
        const storeCourse: Course = {
            id: oldCourse.id,
            courseName: oldCourse.courseName,
            numCredits: oldCourse.numCredits,
            taken: oldCourse.taken,
            preReq: oldCourse.preReq
        };
        setCurrCourse(storeCourse);
        setCourseIndex(
            courses.findIndex(
                (course: Course): boolean =>
                    course.courseName === storeCourse.courseName &&
                    course.id === storeCourse.id
            )
        );
    }
    function changeCourse(): void {
        const changedCourse: Course = {
            id: courseID,
            courseName: courseDep,
            numCredits: courseCred,
            taken: courseTaken,
            preReq: []
        };
        courses.splice(courseIndex, 1, changedCourse);
        setCourses([...courses]);
    }
    function resetCourse(): void {
        console.log(currCourse.courseName);
        courses.splice(courseIndex, 1, currCourse);
        setCourses([...courses]);
    }
    function addNewCourse(): void {
        setCourses([
            ...courses,
            {
                id: courseID,
                courseName: courseDep,
                numCredits: courseCred,
                preReq: [],
                taken: courseTaken
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
                            <button
                                onClick={() =>
                                    removeCourse(setCourses, courses, curr)
                                }
                                style={{ backgroundColor: "red" }}
                            >
                                Delete
                            </button>
                        )}
<<<<<<< HEAD
                        <Button
                            onClick={() => {
                                setEditCourse(true), saveCourse(curr);
                            }}
                        >
                            Edit
                        </Button>
=======
                        <br></br>
>>>>>>> main
                    </div>
                )
            )}
            <button onClick={() => setShowCourses(false)}>
                Return to Degree Plans
            </button>
            <button onClick={() => setAddCourse(!addingCourse)}>
                Add Course
            </button>
            <Button onClick={() => resetCourse()}>Reset Course</Button>
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
            {addingCourse && (
                <Button onClick={() => setTaken(!courseTaken)}>
                    Click if Course taken
                </Button>
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
                <Button onClick={() => setTaken(!courseTaken)}>
                    Click if Course taken
                </Button>
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
                <button
                    onClick={() => {
                        addNewCourse(), setAddCourse(false);
                    }}
                >
                    Submit
                </button>
            )}
            <button onClick={() => setRemoveCourse(!removingCourse)}>
                Remove Course
            </button>
        </div>
    );
}
