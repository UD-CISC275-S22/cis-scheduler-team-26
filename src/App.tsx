import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./Interfaces/degreePlan";
import { PlanList } from "./PlanList";
import { ViewingPlan } from "./ViewingPlan";
import { courseList } from "./Resources/Courses";
import { CoursesListOffcanvas } from "./CoursesList";
import { Course } from "./Interfaces/course";
import { DegreeList } from "./Resources/Degrees";

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
                courseList: [
                    courseList[0],
                    courseList[1],
                    courseList[2],
                    courseList[3]
                ],
                totalCredits: 12
            }
        ],
        degree: DegreeList[0],
        totalCredits: 21
    }
];

function App(): JSX.Element {
    const [courses, setCourses] = useState<Course[]>(courseList);
    const [plans, setPlans] = useState<DegreePlan[]>(INITIAL_PLANS);
    const [viewPlan, setViewPlan] = useState<number>(-1);
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
                <CoursesListOffcanvas
                    setCourses={setCourses}
                    courses={courses}
                ></CoursesListOffcanvas>

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
        </div>
    );
}

export default App;
