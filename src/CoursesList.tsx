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
    const [addingCourse, setAddCourse] = useState<boolean>(false);
    const [removingCourse, setRemoveCourse] = useState<boolean>(false);
    const [editCourse, setEditCourse] = useState<boolean>(false);
    const [courseDep, setCourseDep] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [courseCred, setCourseCred] = useState<number>(0);
    const [courseTaken, setTaken] = useState<boolean>(false);
    let storeCourse: Course;
    function changeCourse(oldCourse: Course): void {
        storeCourse = oldCourse;
        removeCourse(setCourses, courses, oldCourse);
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
                        <Button
                            onClick={() => {
                                setEditCourse(true), changeCourse(curr);
                            }}
                        >
                            Edit
                        </Button>
                    </div>
                )
            )}
            <button onClick={() => setShowCourses(false)}>
                Return to Degree Plans
            </button>
            <button onClick={() => setAddCourse(!addingCourse)}>
                Add Course
            </button>
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
                <Button onClick={() => setTaken(true)}>
                    Click if Course taken
                </Button>
            )}
            {editCourse && (
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
            {editCourse && (
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
            {editCourse && (
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
                <Button onClick={() => setTaken(true)}>
                    Click if Course taken
                </Button>
            )}
            {editCourse && (
                <Button
                    onClick={() =>
                        setCourses([
                            ...courses,
                            {
                                id: courseID,
                                courseName: courseDep,
                                numCredits: courseCred,
                                preReq: [],
                                taken: courseTaken
                            }
                        ])
                    }
                >
                    Submit
                </Button>
            )}
            {addingCourse && (
                <button
                    onClick={() =>
                        setCourses([
                            ...courses,
                            {
                                id: courseID,
                                courseName: courseDep,
                                numCredits: courseCred,
                                preReq: [],
                                taken: courseTaken
                            }
                        ])
                    }
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
