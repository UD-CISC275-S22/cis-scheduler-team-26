import React from "react";
import "./App.css";

function App(): JSX.Element {
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
            <div className="Header-description">
                Make, manage, and save degree plans for computer science degrees
                offered at UD
            </div>
            <div className="Header-description">
                View sample degree plans and required courses for multiple
                degrees
            </div>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
        </div>
    );
}

export default App;
