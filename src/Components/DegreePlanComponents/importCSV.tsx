import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester, validSeason } from "../../Interfaces/semester";
import { Course } from "../../Interfaces/course";
import { courseList } from "../../Resources/Courses";
export function ImportData(): JSX.Element {
    const [content, setContent] = useState<string>("No file data uploaded");

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Might have removed the file, need to check that the files exist
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const filename = event.target.files[0];
            // Create a reader
            const reader = new FileReader();
            // Create lambda callback to handle when we read the file
            reader.onload = (loadEvent) => {
                // Target might be null, so provide default error value
                const newContent =
                    loadEvent.target?.result || "Data was not loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                setContent(newContent as string);
            };
            // Actually read the file
            reader.readAsText(filename);
        }
    }
    function loadCSVData(raw: string): DegreePlan {
        const lines = raw.split("\n");
        const metadata = lines[0].split(",");
        const planName = metadata[0];
        const semesters = getSemesters(lines.slice(2));
        return { planName, degreeType, semesters, isSaved: false };
    }
    function getSemesters(rows: string[]): Semester[] {
        return rows.map((row: string): Semester => {
            const cells = row.split(",");
            const year = parseInt(cells[0]);
            const season = validSeason(cells[1]);
            const courseStrings = cells.slice(2);
            return { year, season, courseList: getCourses(courseStrings) };
        });
    }
    function makeNewCourse(cs: string): Course {
        return {
            code: cs,
            name: "",
            descr: "",
            credits: 3,
            preReq: "",
            restrict: "",
            breadth: "",
            typ: ""
        };
    }
    function getCourses(cs: string[]): Course[] {
        return cs.map(
            (courseString: string): Course =>
                courseList.find(
                    (course: Course): boolean => course.code === courseString
                ) || makeNewCourse(courseString)
        );
    }
    console.log(content.split(""));
    return (
        <div>
            <pre style={{ overflow: "scroll", height: "100px" }}>{content}</pre>
            <Form.Group controlId="exampleForm">
                <Form.Label>Upload a file</Form.Label>
                <Form.Control type="file" onChange={uploadFile} />
            </Form.Group>
        </div>
    );
}
