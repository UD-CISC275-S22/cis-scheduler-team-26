import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./Interfaces/degreePlan";
import { PlanList } from "./PlanList";
import { ViewingPlan } from "./ViewingPlan";
import { courseList } from "./Resources/Courses";
import { CoursesList } from "./CoursesList";
import { Course } from "./Interfaces/course";
import { Button } from "react-bootstrap";
import { DegreeList } from "./Resources/Degrees";
import { TestComponent } from "./OffcanvasComponent";

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
    const [showCourses, setShowCourses] = useState<boolean>(false);
    return (
        /*App has three mutually exclusive states:
                Viewing coursesList
                Viewing planList
                Viewing specific plan
        
        
        */
        <div className="App">
            <header className="App-header">
                University Of Delaware
                <br />
                Computer Science Degree Planner
                <span className="Developer-names">
                    Developed by: Jack Kingham, Sean Williams, Iclyn Taero
                </span>
            </header>
            {/*Display courseList if showCourses is true */}
            {showCourses && (
                <CoursesList
                    setShowCourses={setShowCourses}
                    setCourses={setCourses}
                    courses={courses}
                ></CoursesList>
            )}
            {/*component testing Offcanvas element */}
            <TestComponent></TestComponent>
            {/*Display list of plans if courseList isn't open and we're not viewing a specific plan */}
            {!showCourses && viewPlan === -1 && (
                <div>
                    <div className="Header-description">
                        Make, manage, and save degree plans for computer science
                        degrees offered at UD
                    </div>
                    <div className="Header-description">
                        View sample degree plans and required courses for
                        multiple degrees
                    </div>
                    <br></br>
                    <PlanList
                        planList={plans}
                        setPlanList={setPlans}
                        setViewPlan={setViewPlan}
                    ></PlanList>
                </div>
            )}
            {/*Display specific plan if coursesList isn't open and planList isn't open */}
            {!showCourses && viewPlan !== -1 && (
                <ViewingPlan
                    plan={plans[viewPlan]}
                    planList={plans}
                    setPlans={setPlans}
                    setViewPlan={setViewPlan}
                    courses={courses}
                ></ViewingPlan>
            )}
            <br></br>
            {/*Display button to open courseList if courseList isn't already open */}
            {!showCourses && (
                <Button onClick={() => setShowCourses(!showCourses)}>
                    View/Edit Course List
                </Button>
            )}
        </div>
    );
}

export default App;
