import { Degree } from "../Interfaces/degree";
//import { courseList } from "./Courses";

export const DegreeList: Degree[] = [
    {
        title: "Computer Science Bachelor of Arts",
        requiredCourses: [
            //Major requirements
            {
                id: 108,
                courseName: "CISC",
                numCredits: 3,
                preReq: []
            },
            {
                id: 181,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 108,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 210,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 108,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 220,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 210,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 260,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 210,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 275,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 181,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    },
                    {
                        id: 220,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 210,
                courseName: "MATH",
                numCredits: 3,
                preReq: []
            },
            {
                id: 241,
                courseName: "MATH",
                numCredits: 4,
                preReq: [
                    {
                        id: 117,
                        courseName: "MATH",
                        numCredits: 4,
                        preReq: []
                    }
                ]
            },
            //University Requirements
            {
                id: 110,
                courseName: "ENGL",
                numCredits: 3,
                preReq: []
            }
            //Theres also a number of other university requirements such as breadth reqs
            //Not sure how to reflect those here
        ],
        requiredCredits: 124
    },
    {
        title: "Computer Science Bachelor of Science",
        requiredCourses: [
            //Major requirements
            {
                id: 108,
                courseName: "CISC",
                numCredits: 3,
                preReq: []
            },
            {
                id: 181,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 108,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 210,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 108,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 220,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 210,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 260,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 210,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 275,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 181,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    },
                    {
                        id: 220,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 303,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 220,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    },
                    {
                        id: 210,
                        courseName: "MATH",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 320,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 220,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    },
                    {
                        id: 210,
                        courseName: "MATH",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 361,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 220,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    },
                    {
                        id: 260,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 372,
                courseName: "CISC",
                numCredits: 3,
                preReq: [
                    {
                        id: 220,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    },
                    {
                        id: 260,
                        courseName: "CISC",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                //This or math350. not sure how to implement conditional requirements
                id: 205,
                courseName: "MATH",
                numCredits: 4,
                preReq: [
                    {
                        id: 210,
                        courseName: "MATH",
                        numCredits: 3,
                        preReq: []
                    }
                ]
            },
            {
                id: 210,
                courseName: "MATH",
                numCredits: 3,
                preReq: []
            },
            {
                id: 241,
                courseName: "MATH",
                numCredits: 4,
                preReq: [
                    {
                        id: 117,
                        courseName: "MATH",
                        numCredits: 4,
                        preReq: []
                    }
                ]
            },
            {
                id: 242,
                courseName: "MATH",
                numCredits: 4,
                preReq: [
                    {
                        id: 241,
                        courseName: "MATH",
                        numCredits: 4,
                        preReq: []
                    }
                ]
            },
            //University Requirements
            {
                id: 110,
                courseName: "ENGL",
                numCredits: 3,
                preReq: []
            }
            //Theres also a number of other university requirements such as breadth reqs
            //Not sure how to reflect those here
        ],
        requiredCredits: 124
    }
];
