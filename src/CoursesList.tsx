import React, { useState } from "react";
import { Course } from "./Interfaces/course";
import { courseList } from "./Resources/Courses";
import { Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

interface coursesListProp {
    setShowCourses: (newShowCourses: boolean) => void;
}

export function CoursesList({ setShowCourses }: coursesListProp): JSX.Element {
    const [courseListC, setCourseList] = useState<Course[]>(courseList);
    const [addingCourse, setAddCourse] = useState<boolean>(false);
    const [removingCourse, setRemoveCourse] = useState<boolean>(false);
    const [courseDep, setCourseDep] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [courseCred, setCourseCred] = useState<number>(0);
    function addCourse() {
        const newCourse: Course = {
            id: courseID,
            courseName: courseDep,
            numCredits: courseCred,
            preReq: [],
            taken: false
        };
        setCourseList([...courseListC, newCourse]);
        console.log(courseListC[courseListC.length - 1]);
    }
    function removeCourse() {
        setCourseList(
            courseListC.filter(
                (course: Course): boolean =>
                    course.id !== courseID && course.courseName !== courseDep
            )
        );
    }
    return (
        <div>
            <h3>List of current Courses:</h3>
            {courseListC.map(
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
                    </div>
                )
            )}
            <button onClick={() => setShowCourses(false)}>
                Return to Degree Plans
            </button>
            <button onClick={() => setAddCourse(true)}>Add Course</button>
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
            {addingCourse && <button onClick={addCourse}>Submit</button>}
            <button onClick={() => setRemoveCourse(true)}>Remove Course</button>
            {removingCourse && (
                <Form.Group controlId="Removing Course Dep">
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
            {removingCourse && (
                <Form.Group controlId="Removing Course ID">
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
            {removingCourse && <button onClick={removeCourse}>Submit</button>}
        </div>
    );
}
