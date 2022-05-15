import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { CSVLink } from "react-csv";
import { Course } from "../../Interfaces/course";
import { Semester } from "../../Interfaces/semester";
import { CgExport } from "react-icons/cg";

export function ExportCSV({ plan }: { plan: DegreePlan }): JSX.Element {
    const data = plan.semesterList.map((sem: Semester) => ({
        year: sem.year,
        season: sem.season,
        courseList: sem.courseList.map((course: Course) => course.code)
    }));

    return (
        <CSVLink filename="DegreePlan" data={data}>
            <Button className={"makeInformationButton"}>
                <CgExport
                    style={{ marginTop: "-5px", fontSize: "120%" }}
                ></CgExport>
                Export to CSV
            </Button>
        </CSVLink>
    );
}
