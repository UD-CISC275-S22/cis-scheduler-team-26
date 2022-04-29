import React, { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { Course } from "../../Interfaces/course";
import "./CoursesList.css";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

interface coursesListProp {
    setCourses: (newCourses: Course[]) => void;
    courses: Course[];
    plan: DegreePlan[];
    setPlanList: (newPlan: DegreePlan[]) => void;
}

function removeCourse(
    setCourses: (newCourses: Course[]) => void,
    setOldCourses: (newCourses: Course[]) => void,
    setPlanList: (newPlan: DegreePlan[]) => void,
    plan: DegreePlan[],
    courses: Course[],
    oldCourses: Course[],
    removeCourse: Course
) {
    setCourses(
        courses.filter((course: Course): boolean => course !== removeCourse)
    );
    setOldCourses(
        oldCourses.filter((course: Course): boolean => course !== removeCourse)
    );
    setPlanList(
        plan.map(
            (plan: DegreePlan): DegreePlan => ({
                ...plan,
                semesterList: plan.semesterList.map(
                    (sem: Semester): Semester => ({
                        ...sem,
                        courseList: sem.courseList.filter(
                            (course: Course): boolean => course !== removeCourse
                        )
                    })
                )
            })
        )
    );
}

export function CoursesListShow({
    setCourses,
    courses,
    plan,
    setPlanList
}: coursesListProp): JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div className="offcanvas-component">
            <Button
                onClick={() => setShow(true)}
                className="offcanvas-show-button"
            >
                View Courses List
            </Button>
            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement={"end"}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>All Courses:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CoursesList
                        setCourses={setCourses}
                        courses={courses}
                        plan={plan}
                        setPlanList={setPlanList}
                    ></CoursesList>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

function CoursesList({
    setCourses,
    courses,
    plan,
    setPlanList
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
        const changedCourse: Course = {
            id: courseID,
            courseName: courseDep,
            numCredits: courseCred,
            preReq: []
        };
        const oldCourse: Course = courses[courseIndex];
        courses.splice(courseIndex, 1, changedCourse);
        setCourses([...courses]);
        setPlanList(
            plan.map(
                (plan: DegreePlan): DegreePlan => ({
                    ...plan,
                    semesterList: plan.semesterList.map(
                        (sem: Semester): Semester => ({
                            ...sem,
                            courseList: sem.courseList.map(
                                (course: Course): Course =>
                                    course.courseName !==
                                        oldCourse.courseName &&
                                    course.id !== oldCourse.id
                                        ? course
                                        : changedCourse
                            )
                        })
                    )
                })
            )
        );
    }
    function resetCourse(curr: Course): void {
        const index: number = courses.findIndex(
            (course: Course): boolean =>
                course.id === curr.id && course.courseName === curr.courseName
        );
        const oldCourse: Course = { ...oldCourses[index] };
        courses.splice(index, 1, oldCourse);
        setCourses([...courses]);
        console.log("current Course: ");
        console.log(curr.courseName);
        console.log(curr.id);
        console.log("old course: ");
        console.log(oldCourse.courseName);
        //issue is that when i make a change to the 2 courses, and i reset the first change, it changes both
        //to the same thing
        setPlanList(
            plan.map(
                (plan: DegreePlan): DegreePlan => ({
                    ...plan,
                    semesterList: plan.semesterList.map(
                        (sem: Semester): Semester => ({
                            ...sem,
                            courseList: sem.courseList.map(
                                (course: Course): Course =>
                                    course.courseName !== curr.courseName ||
                                    course.id !== curr.id
                                        ? course
                                        : oldCourse
                            )
                        })
                    )
                })
            )
        );
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
                                        setPlanList,
                                        plan,
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
            <Button onClick={() => setAddCourse(!addingCourse)}>
                Add Course
            </Button>
            {/*Render the form to add a course if Add Course button is pressed */}
            {addingCourse && (
                <AddCourseForm
                    courseDep={courseDep}
                    setCourseDep={setCourseDep}
                    courseID={courseID}
                    setCourseID={setCourseID}
                    courseCred={courseCred}
                    setCourseCred={setCourseCred}
                    addCourse={addNewCourse}
                    setAddingCourse={setAddCourse}
                ></AddCourseForm>
            )}
            {/*Render the form to edit a course if Edit button is pressed */}
            {editCourse && (
                <EditCourseForm
                    courseDep={courseDep}
                    setCourseDep={setCourseDep}
                    courseID={courseID}
                    setCourseID={setCourseID}
                    courseCred={courseCred}
                    setCourseCred={setCourseCred}
                    editingCourse={editCourse}
                    setEditingCourse={setEditCourse}
                    changeCourse={changeCourse}
                ></EditCourseForm>
            )}
            <Button onClick={() => setRemoveCourse(!removingCourse)}>
                Remove Course
            </Button>
        </div>
    );
}

//Form to add a new course to master course list
function AddCourseForm({
    courseDep,
    setCourseDep,
    courseID,
    setCourseID,
    courseCred,
    setCourseCred,
    addCourse,
    setAddingCourse
}: {
    courseDep: string;
    setCourseDep: (name: string) => void;
    courseID: number;
    setCourseID: (id: number) => void;
    courseCred: number;
    setCourseCred: (num: number) => void;
    addCourse: () => void;
    setAddingCourse: (val: boolean) => void;
}): JSX.Element {
    return (
        <div>
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
            <Button
                onClick={() => {
                    addCourse(), setAddingCourse(false);
                }}
            >
                Submit
            </Button>
        </div>
    );
}

//Form to edit a specific course
function EditCourseForm({
    courseDep,
    setCourseDep,
    courseID,
    setCourseID,
    courseCred,
    setCourseCred,
    editingCourse,
    setEditingCourse,
    changeCourse
}: {
    courseDep: string;
    setCourseDep: (name: string) => void;
    courseID: number;
    setCourseID: (id: number) => void;
    courseCred: number;
    setCourseCred: (num: number) => void;
    editingCourse: boolean;
    setEditingCourse: (val: boolean) => void;
    changeCourse: () => void;
}): JSX.Element {
    return (
        <div>
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
            <Button
                onClick={() => {
                    changeCourse(), setEditingCourse(!editingCourse);
                }}
            >
                Submit
            </Button>
        </div>
    );
}
