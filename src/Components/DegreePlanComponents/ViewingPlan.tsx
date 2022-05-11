import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Season, Semester } from "../../Interfaces/semester";
import { movePopup } from "./moveCoursePopup";
import { addSemesterPopup } from "./addSemesterPopup";
import { DegreeRequirements } from "./ShowDegreeRequirements";
import { PrintSemesters } from "./PrintSemesters";
import { ExportCSV } from "./exportCSV";
import {
    deletePlanFromStorageByName,
    savePlanToStorage
} from "../../StorageFunctions";
import "./ViewingPlan.css";

//Icon imports for buttons
import { TiEdit } from "react-icons/ti";
import { AiOutlineClear } from "react-icons/ai";
import { FiSave } from "react-icons/fi";

interface planListProp {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setViewPlan: (newCurrPlan: number) => void;
    courses: Course[];
}
const emptySem: Semester = {
    year: -1,
    season: "Fall",
    courseList: []
};

function emptyCourseList(curr: Semester): Semester {
    return { ...curr, courseList: [] };
}
function clearHelp(clearSem: Semester[]): Semester[] {
    return clearSem.map((curr: Semester): Semester => emptyCourseList(curr));
}
function clearAllCourses(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
) {
    const newPlans = planList.map(
        (curr: DegreePlan): DegreePlan =>
            curr === plan
                ? { ...curr, semesterList: clearHelp(curr.semesterList) }
                : curr
    );
    setPlans(newPlans);
}

export function ViewingPlan({
    plan,
    planList,
    setPlans,
    courses
}: planListProp): JSX.Element {
    const [edit, setEdit] = useState<boolean>(false);
    const [season, setSeason] = useState<Season>("Fall");
    const [year, setYear] = useState<number>(2022);
    const [editingSem, setEditingSem] = useState<Semester>(emptySem);
    const [addSem, setAddSem] = useState<boolean>(false);
    const [addingCourse, setAddingCourse] = useState<Course>(courses[0]);
    const [move, setMove] = useState<boolean>(false);
    const [moveSem, setMoveSem] = useState<Semester>(plan.semesterList[0]);
    const [moveCourse, setMoveCourse] = useState<Course>({
        code: "",
        credits: -1,
        preReq: "",
        name: "",
        descr: "",
        restrict: "",
        breadth: "",
        typ: ""
    });

    //save the plan to storage every time its changed if isPlanSaved is true
    if (plan.isSaved) savePlanToStorage(plan);

    return (
        <div style={{ display: "flex", marginBottom: "200px" }}>
            <div style={{ width: "160%" }}>
                <h1>{plan.planName}</h1>
                <h3>{plan.degree.title}</h3>
                <br></br>
                {plan.semesterList.map(
                    (semester: Semester): JSX.Element => (
                        <div
                            key={semester.season + semester.year}
                            className="degree-plan-semester-table-list"
                        >
                            <PrintSemesters
                                plan={plan}
                                planList={planList}
                                setPlans={setPlans}
                                edit={edit}
                                editingSem={editingSem}
                                setEditingSem={setEditingSem}
                                addingCourse={addingCourse}
                                setAddingCourse={setAddingCourse}
                                courses={courses}
                                setMove={setMove}
                                setMoveSem={setMoveSem}
                                setMoveCourse={setMoveCourse}
                                semester={semester}
                            ></PrintSemesters>
                        </div>
                    )
                )}
                {move &&
                    movePopup(
                        move,
                        setMove,
                        moveSem,
                        setMoveSem,
                        plan,
                        setPlans,
                        planList,
                        moveCourse,
                        setEditingSem
                    )}
                {addSem &&
                    addSemesterPopup(
                        plan,
                        planList,
                        setPlans,
                        season,
                        setSeason,
                        year,
                        setYear,
                        addSem,
                        setAddSem
                    )}
                {edit && (
                    <div>
                        <Button onClick={() => setAddSem(true)}>
                            Add Semester
                        </Button>
                    </div>
                )}
                <Button onClick={() => setEdit(!edit)}>
                    <TiEdit></TiEdit>Edit Semesters
                </Button>
                <Button
                    onClick={() => clearAllCourses(plan, planList, setPlans)}
                    style={{ backgroundColor: "red", borderColor: "red" }}
                >
                    <AiOutlineClear></AiOutlineClear>
                    Clear All Semesters
                </Button>
                {/* Render unsave plan button is plan is saved.
                Otherwise render save plan button */}
                {plan.isSaved ? (
                    <Button
                        onClick={() => {
                            changeIsPlanSavedByName(
                                plan.planName,
                                planList,
                                setPlans
                            );
                            deletePlanFromStorageByName(plan.planName);
                        }}
                    >
                        <FiSave style={{ fontSize: "120%" }}></FiSave> Unsave
                        Plan
                    </Button>
                ) : (
                    <Button
                        onClick={() =>
                            changeIsPlanSavedByName(
                                plan.planName,
                                planList,
                                setPlans
                            )
                        }
                    >
                        <FiSave style={{ fontSize: "120%" }}></FiSave> Save Plan
                    </Button>
                )}
                <ExportCSV plan={plan}></ExportCSV>
            </div>
            {/*Components to show all the requirements for this plan's degree and which have been fulfilled */}
            <DegreeRequirements
                degree={plan.degree}
                semesterList={plan.semesterList}
            ></DegreeRequirements>
        </div>
    );
}

//Flips the isSaved variable of DegreePlan with name
//Just for use in the button in viewingPlan save/unsave plan
function changeIsPlanSavedByName(
    name: string,
    planList: DegreePlan[],
    setPlanList: (d: DegreePlan[]) => void
) {
    setPlanList(
        planList.map((plan: DegreePlan) => {
            if (plan.planName !== name) return plan;
            return { ...plan, isSaved: !plan.isSaved };
        })
    );
}
