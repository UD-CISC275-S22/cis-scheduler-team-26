import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { CSVLink } from "react-csv";

interface exportInterfaces {
    plan: DegreePlan;
}
export function ExportCSV({ plan }: exportInterfaces): JSX.Element {
    const [csvData, updateDegree] = useState<DegreePlan>(plan);
    const [data, updateData] = useState(
        csvData.semesterList.map((semester: Semester) => ({
            SemesterSeason: semester.season,
            year: semester.year,
            ClassesTaking: semester.courseList.map(
                (course: Course): string => course.name
            ),
            TotalCredits: 0
        }))
    );
    function getData() {
        updateDegree(plan);
        updateData(
            csvData.semesterList.map((semester: Semester) => ({
                SemesterSeason: semester.season,
                year: semester.year,
                ClassesTaking: semester.courseList.map(
                    (course: Course): string => course.name
                ),
                TotalCredits: 0
            }))
        );
    }
    const csvHeaders = [
        { label: "Season", key: "SemesterSeason" },
        { label: "Year", key: "year" },
        { label: "Courses", key: "ClassesTaking" },
        { label: "Number of Credits", key: "TotalCredits" }
    ];

    return (
        <div>
            <CSVLink headers={csvHeaders} filename="DegreePlan" data={data}>
                <Button className={"makeInformationButton"} onClick={getData}>
                    Export to CSV
                </Button>
            </CSVLink>
        </div>
    );
}
