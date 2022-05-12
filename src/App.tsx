import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./Interfaces/degreePlan";
import { PlanList } from "./Components/DegreePlanComponents/PlanList";
import { ViewingPlan } from "./Components/DegreePlanComponents/ViewingPlan";
import { courseList } from "./Resources/Courses";
import { CoursesListOffcanvas } from "./Components/CourseListComponents/CourseListOffcanvas";
import { Course } from "./Interfaces/course";
import { Button } from "react-bootstrap";
import { BsArrowReturnLeft } from "react-icons/bs";
import { loadPlansFromStorage } from "./StorageFunctions";
import { ImportData } from "./Components/DegreePlanComponents/importCSV";
/*
const INITIAL_PLANS: DegreePlan[] = [
    {
        planName: "Testing Plan",
        semesterList: [
            {
                year: 2022,
                season: "Winter",
                courseList: [courseList[0], courseList[1], courseList[2]]
            },
            {
                year: 2022,
                season: "Spring",
                courseList: [courseList[3]]
            }
        ],
        degree: DegreeList[0],
        isSaved: false
    }
];
*/
function App(): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(courseList);
    const [plans, setPlans] = useState<DegreePlan[]>([]);
    const [viewPlan, setViewPlan] = useState<number>(-1);

    //Function to load the saved degree plans from storage
    loadPlansFromStorage(plans, setPlans);

    return (
        <div className="App">
            <header className="App-header">
                University Of Delaware
                <br />
                Computer Science Degree Planner
                <span className="Developer-names">
                    Developed by: Jack Kingham, Sean Williams, Iclyn Taero
                </span>
            </header>
            {/*Display list of plans if courseList isn't open and we're not viewing a specific plan */}
            {viewPlan === -1 && (
                <div>
                    <div className="Header-description">
                        Make, manage, and save degree plans for computer science
                        degrees offered at UD
                    </div>
                    <div className="Header-description">
                        View sample degree plans and required courses for
                        multiple degrees
                    </div>
                </div>
            )}
            <div className="main-page-items">
                <div className="header-buttons">
                    {viewPlan !== -1 && (
                        <Button
                            onClick={() => setViewPlan(-1)}
                            className="return-to-plan-list-button"
                        >
                            <BsArrowReturnLeft></BsArrowReturnLeft> Return to
                            Plan List
                        </Button>
                    )}
                    <CoursesListOffcanvas
                        setCourses={setCourses}
                        courses={courses}
                        planList={plans}
                        setPlanList={setPlans}
                    ></CoursesListOffcanvas>
                </div>

                {/*Display specific plan if planList isn't open */}
                {viewPlan === -1 ? (
                    <PlanList
                        planList={plans}
                        setPlanList={setPlans}
                        setViewPlan={setViewPlan}
                    ></PlanList>
                ) : (
                    <ViewingPlan
                        plan={plans[viewPlan]}
                        planList={plans}
                        setPlans={setPlans}
                        setViewPlan={setViewPlan}
                        courses={courses}
                    ></ViewingPlan>
                )}
            </div>
            <ImportData></ImportData>
        </div>
    );
}

export default App;
