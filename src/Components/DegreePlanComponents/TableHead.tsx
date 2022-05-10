import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Season, Semester } from "../../Interfaces/semester";

interface tableHeadProp {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    edit: boolean;
    semester: Semester;
}

function removeSemHelp(
    curr: DegreePlan,
    season: Season,
    year: number
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.filter(
            (sem: Semester): boolean => sem.season != season || sem.year != year
        )
    };
}
function removeSemester(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    season: Season,
    year: number
) {
    setPlans(
        planList.map(
            (curr: DegreePlan): DegreePlan =>
                curr === plan ? removeSemHelp(curr, season, year) : curr
        )
    );
}

export function TableHead({
    plan,
    planList,
    setPlans,
    edit,
    semester
}: tableHeadProp): JSX.Element {
    return (
        <thead>
            {edit ? (
                <tr>
                    <th colSpan={2} style={{ fontSize: "30px" }}>
                        {semester.season + " " + semester.year}
                    </th>
                    <th>
                        <Button
                            style={{
                                backgroundColor: "red",
                                borderColor: "red"
                            }}
                            onClick={() =>
                                removeSemester(
                                    plan,
                                    planList,
                                    setPlans,
                                    semester.season,
                                    semester.year
                                )
                            }
                        >
                            Delete Semester
                        </Button>
                    </th>
                </tr>
            ) : (
                <tr>
                    <th colSpan={3} style={{ fontSize: "30px" }}>
                        {semester.season + " " + semester.year}
                    </th>
                </tr>
            )}
        </thead>
    );
}
