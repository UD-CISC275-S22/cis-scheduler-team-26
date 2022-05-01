import React, { useState } from "react";
import { Course } from "../../Interfaces/course";
import { Button } from "react-bootstrap";
import { RenderCourse } from "./RenderCourse";
import { AddCourseForm } from "./AddCoursePopup";
import "./CoursesList.css";

//icon imports
import { RiAddBoxLine } from "react-icons/ri";
interface coursesListProp {
    setCourses: (newCourses: Course[]) => void;
    courses: Course[];
}

export function CoursesList({
    setCourses,
    courses
}: coursesListProp): JSX.Element {
    //Creating new course info
    const [addingCourse, setAddingCourse] = useState<boolean>(false);
    const [newCourseDepartment, setNewCourseDepartment] = useState<string>("");
    const [newCourseID, setNewCourseID] = useState<number>(0);
    const [newCourseCredits, setNewCourseCredits] = useState<number>(0);

    function deleteCourseByName(name: string, id: number) {
        setCourses(
            courses.filter(
                (course: Course) =>
                    course.courseName !== name && course.id !== id
            )
        );
    }

    return (
        <div>
            {courses.map((curr: Course) => (
                <div key={curr.courseName + curr.id.toString()}>
                    <RenderCourse
                        Course={curr}
                        deleteCourse={() =>
                            deleteCourseByName(curr.courseName, curr.id)
                        }
                    ></RenderCourse>
                </div>
            ))}
            <Button onClick={() => setAddingCourse(true)}>
                <RiAddBoxLine
                    style={{ marginBottom: "2px", fontSize: "20px" }}
                ></RiAddBoxLine>{" "}
                Add Course
            </Button>
            {/*Render the form to add a course if Add Course button is pressed */}
            <AddCourseForm
                addingCourse={addingCourse}
                setAddingCourse={setAddingCourse}
                newCourseDepartment={newCourseDepartment}
                setNewCourseDepartment={setNewCourseDepartment}
                newCourseID={newCourseID}
                setNewCourseID={setNewCourseID}
                newCourseCredits={newCourseCredits}
                setNewCourseCredits={setNewCourseCredits}
                courseList={courses}
                setCourseList={setCourses}
            ></AddCourseForm>
            {/*Render the form to edit a course if Edit button is pressed */}
            {/*editCourse && <EditCourseForm></EditCourseForm>*/}
        </div>
    );
}
