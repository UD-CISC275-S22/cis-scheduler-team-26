import React, { useState } from "react";
import { CoursesListShow } from "./CoursesList";
import { Course } from "../../Interfaces/course";
import { Button, Offcanvas } from "react-bootstrap";
import { VscOpenPreview } from "react-icons/vsc";
import "./CoursesList.css";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { courseList } from "../../Resources/Courses";
import { DegreeList } from "../../Resources/Degrees";

const INITIAL_PLANS: DegreePlan[] = [
    {
        planName: "Testing Plan",
        semesterList: [
            {
                year: 2022,
                season: "Winter",
                courseList: [courseList[0], courseList[1], courseList[2]],
                totalCredits: 9
            },
            {
                year: 2022,
                season: "Spring",
                courseList: [courseList[3]],
                totalCredits: 3
            }
        ],
        degree: DegreeList[0],
        totalCredits: 12
    }
];
export function CoursesListOffcanvas({
    setCourses,
    courses
}: {
    setCourses: (courses: Course[]) => void;
    courses: Course[];
}): JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    const [plans, setPlans] = useState<DegreePlan[]>(INITIAL_PLANS);
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
                    <Offcanvas.Title>All Courses:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CoursesListShow
                        setCourses={setCourses}
                        courses={courses}
                        plan={plans}
                        setPlanList={setPlans}
                    ></CoursesListShow>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
