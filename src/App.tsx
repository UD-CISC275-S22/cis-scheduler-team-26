import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./Interfaces/degreePlan";
import { PlanList } from "./PlanList";
import { ViewingPlan } from "./ViewingPlan";
import { courseList } from "./Courses";

const INITIAL_PLANS: DegreePlan[] = [
    {
        planName: "Testing Plan",
        semesterList: [
            {
                year: 2022,
                season: "Winter",
                courseList: courseList,
                totalCredits: 0
            }
        ],
        degree: {
            title: "Test Degree",
            requiredCourses: [],
            requiredCredits: 150
        },
        totalCredits: 100
    }
];

function App(): JSX.Element {
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
            {viewPlan === -1 ? (
                <div>
                    <div className="Header-description">
                        Make, manage, and save degree plans for computer science
                        degrees offered at UD
                    </div>
                    <div className="Header-description">
                        View sample degree plans and required courses for
                        multiple degrees
                    </div>
                    <p>
                        Edit <code>src/App.tsx</code> and save. This page will
                        automatically reload.
                    </p>
                    <PlanList
                        planList={plans}
                        setPlanList={setPlans}
                        setViewPlan={setViewPlan}
                    ></PlanList>
                </div>
            ) : (
                <ViewingPlan
                    plan={plans[viewPlan]}
                    planList={plans}
                    setPlans={setPlans}
                    setViewPlan={setViewPlan}
                ></ViewingPlan>
            )}
        </div>
    );
}

export default App;
