import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { CoursesList } from "./CoursesList";
import { Course } from "./Interfaces/course";
import "./OffcanvasComponent.css";

interface coursesListProp {
    setShowCourses: (newShowCourses: boolean) => void;
    setCourses: (newCourses: Course[]) => void;
    courses: Course[];
}

//Little test demonstrating use of the Offcanvas react-bootstrap element
export function TestComponent({
    setShowCourses,
    setCourses,
    courses
}: coursesListProp): JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div className="offcanvas-component">
            <Button
                onClick={() => setShow(true)}
                className="offcanvas-show-button"
            >
                Show Offcanvas Component
            </Button>
            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement={"end"}
                style={{ innerWidth: "600px" }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Degree Plan</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CoursesList
                        setShowCourses={setShowCourses}
                        setCourses={setCourses}
                        courses={courses}
                    ></CoursesList>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
