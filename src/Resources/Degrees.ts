import { Degree } from "../Interfaces/degree";
import { courseList } from "./Courses";

export const DegreeList: Degree[] = [
    {
        title: "Computer Science Bachelor of Arts",
        requiredCourses: courseList,
        requiredCredits: 124
    },
    {
        title: "Computer Science Bachelor of Science",
        requiredCourses: courseList,
        requiredCredits: 124
    }
];
