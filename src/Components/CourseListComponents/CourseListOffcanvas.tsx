import React, { useState } from "react";
import { CoursesList } from "./CoursesList";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Button, Offcanvas } from "react-bootstrap";
import { VscOpenPreview } from "react-icons/vsc";
import "./CoursesList.css";

export function CoursesListOffcanvas({
    setCourses,
    courses,
    planList,
    setPlanList
}: {
    setCourses: (courses: Course[]) => void;
    courses: Course[];
    planList: DegreePlan[];
    setPlanList: (d: DegreePlan[]) => void;
}): JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    //List of unmodified courses. It will only be update when adding or removing a course
    const [unmodifiedCourses, setUnmodifiedCourses] =
        useState<Course[]>(courses);
    return (
        <div className="offcanvas-component">
            <Button
                onClick={() => setShow(true)}
                className="offcanvas-show-button"
            >
                <VscOpenPreview></VscOpenPreview> View All Courses
            </Button>
            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement={"end"}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ fontSize: "40px" }}>
                        All Courses:
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CoursesList
                        courses={courses}
                        setCourses={setCourses}
                        unmodifiedCourses={unmodifiedCourses}
                        setUnmodifiedCourses={setUnmodifiedCourses}
                        planList={planList}
                        setPlanList={setPlanList}
                    ></CoursesList>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
