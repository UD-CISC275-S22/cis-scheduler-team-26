import React, { useState } from "react";
import { CoursesList } from "./CoursesList";
import { Course } from "../../Interfaces/course";
import { Button, Offcanvas } from "react-bootstrap";
import { VscOpenPreview } from "react-icons/vsc";
import "./CoursesList.css";

export function CoursesListOffcanvas({
    setCourses,
    courses
}: {
    setCourses: (courses: Course[]) => void;
    courses: Course[];
}): JSX.Element {
    const [show, setShow] = useState<boolean>(false);
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
                    ></CoursesList>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}