import { useEffect } from "react";
import { DegreePlan } from "./Interfaces/degreePlan";

//This function saves a plan to local storage
//It makes sure to replace any saved plan with the same name
export function savePlanToStorage(plan: DegreePlan) {
    return;
}

//This function deletes a plan from local storage
//It deletes by name because plan names should be unique
//It fails gracefully if a plan with name does not exist in local storage
export function deletePlanFromStorageByName(name: string) {
    const tmpPlans: DegreePlan[] = JSON.parse(
        localStorage.getItem("plans") || ""
    );
    if (tmpPlans === []) return;
    //remove the old list of plans
    localStorage.removeItem("plans");
    //Save the new list of plans
    localStorage.setItem(
        "plans",
        JSON.stringify(
            tmpPlans.filter((tmpplan: DegreePlan) => tmpplan.planName !== name)
        )
    );
}

//This should only be called once on page load
//Defining it here so as to not clutter up app component
//NOTE THAT THE LIST OF SAVES PLANS IS STORED UNDER KEY "plans"
export function loadPlansFromStorage(
    plans: DegreePlan[],
    setPlans: (d: DegreePlan[]) => void
) {
    useEffect(() => {
        const savedPlansString = localStorage.getItem("plans");
        const startPlans = [...plans];
        if (savedPlansString !== null) {
            const planstmp: DegreePlan[] = JSON.parse(savedPlansString);
            startPlans.push(...planstmp);
        }
        setPlans(startPlans);
    }, [setPlans]);
}
