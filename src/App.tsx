import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./Interfaces/degreePlan";
import { PlanList } from "./PlanList";

const INITIAL_PLANS: DegreePlan[] = [
    {
        planName: "Testing Plan",
        semesterList: [],
        degree: {
            title: "Test Degree",
            requiredCourses: [],
            requiredCredits: 150
        },
        totalCredits: 100
    }
];

function App(): JSX.Element {
    const [plans, setPlans] = useState<DegreePlan[]>([]);
    const [viewPlan, setViewPlan] = useState<number>(-1);
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <h3>Jack Kingham</h3>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
                <div>Iclyn Taero</div>
            </p>
            <div>Developed by: Sean Williams</div>
            <PlanList
                planList={plans}
                setPlanList={setPlans}
                setViewPlan={setViewPlan}
            ></PlanList>
        </div>
    );
}

export default App;
