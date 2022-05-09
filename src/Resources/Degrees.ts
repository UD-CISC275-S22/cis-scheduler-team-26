import { Degree } from "../Interfaces/degree";
//import { courseList } from "./Courses";

export const DegreeList: Degree[] = [
    {
        title: "Computer Science Bachelor of Arts",
        requiredCourses: [
            //Major requirements
            "CISC 108",
            "CISC 181",
            "CISC 210",
            "CISC 220",
            "CISC 260",
            "CISC 275",
            "MATH 210",
            "MATH 241",
            //University Requirements
            "ENGL 110"
            //Theres also a number of other university requirements such as breadth reqs
            //Not sure how to reflect those here
        ],
        requiredCredits: 124
    },
    {
        title: "Computer Science Bachelor of Science",
        requiredCourses: [
            //Major requirements
            "CISC 108",
            "CISC 181",
            "CISC 210",
            "CISC 220",
            "CISC 260",
            "CISC 275",
            "CISC 303",
            "CISC 320",
            "CISC 361",
            "CISC 372",
            "MATH 205",
            "MATH 210",
            "MATH 241",
            "MATH 242",
            //University Requirements
            "ENGL 110"
            //Theres also a number of other university requirements such as breadth reqs
            //Not sure how to reflect those here
        ],
        requiredCredits: 124
    }
];
