import React, { useState } from "react";
import { CoursesList } from "./CoursesList";
import { Course } from "../../Interfaces/course";
import { Button, Offcanvas } from "react-bootstrap";
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
                    ></CoursesList>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
