import { Course } from "../Interfaces/course";
export const courseList: Course[] = [
    {
        code: "EGGG 101",
        name: "Introduction to Engineering",
        descr: "Introduction to profession, including disciplines of chemical, civil, computer, electrical, environmental, and mechanical engineering.  Prepares students for success through integration of:  technical problem solving and engineering design, ethical decision-making, teamwork, and communicating to diverse audiences.",
        credits: 2,
        preReq: "",
        restrict: "",
        breadth: "University: ; A&S: ",
        typ: "Fall"
    },
    {
        code: "ENGL 110",
        name: "Seminar in Composition",
        descr: "",
        credits: 3,
        preReq: "",
        restrict:
            "Required of all students. Should be taken first year on campus.",
        breadth: "University: ; A&S: ",
        typ: "Fall, Winter, Spring, Summer"
    },
    {
        code: "CISC 108",
        name: "Introduction to Computer Science I",
        descr: "Computing and principles of programming with an emphasis on systematic program design. Topics include functional programming, data abstraction, procedural abstraction, use of control and state, recursion, testing, and object-oriented programming concepts. Requires no prior programming experience, open to any major, but intended primarily for majors and minors in computer science or mathematics.",
        credits: 3,
        preReq: "",
        restrict: "",
        breadth:
            "University: Mathematics, Natural Sciences and Technology; A&S: GROUP D: A&S Math, Nat Sci & Technology",
        typ: "Fall and Spring"
    },
    {
        code: "CISC 181",
        name: "Introduction to Computer Science II",
        descr: "Principles of computer science illustrated and applied through programming in an object oriented language. Programming projects illustrate computational problems, styles and issues that arise in computer systems development and in all application areas of computation.",
        credits: 3,
        preReq: "Grade of C- or better in CISC 108 or CISC 106.",
        restrict: "",
        breadth:
            "University: Mathematics, Natural Sciences and Technology; A&S: GROUP D: A&S Math, Nat Sci & Technology",
        typ: "Fall, Summer and Spring"
    },
    {
        code: "CISC 210",
        name: "Introduction to Systems Programming",
        descr: "",
        credits: 3,
        preReq: "A grade of C- or better in CISC 106 or CISC 108.",
        restrict: "",
        breadth: "University: ; A&S: ",
        typ: "Fall and Spring"
    },
    {
        code: "CISC 220",
        name: "Data Structures",
        descr: "Review of data type abstraction, recursion, arrays, stacks, queues, multiple stacks and linked lists. Emphasis on dynamic storage management, garbage collection, trees, graphs, tables, sorting and searching.",
        credits: 3,
        preReq: "A minimum grade of C- in CISC 210.",
        restrict: "",
        breadth: "University: ; A&S: ",
        typ: "Fall, Summer and Spring"
    },
    {
        code: "CISC 260",
        name: "Machine Organization and Assembly Language",
        descr: "Introduction to the basics of machine organization. Programming tools and techniques at the machine and assembly levels. Assembly language programming and computer arithmetic techniques.",
        credits: 3,
        preReq: "A minimum grade of C- in CISC 210.",
        restrict: "",
        breadth: "University: ; A&S: ",
        typ: "Fall and Spring"
    },
    {
        code: "CISC 275",
        name: "Introduction to Software Engineering",
        descr: "Object oriented software design and development through use of an object oriented programming language. Topics include team programming, design patterns, graphical user interfaces, software engineering tools (e.g., integrated development environments, version control, build management, bug tracking, automated testing).",
        credits: 3,
        preReq: "Minimum grade of C- in CISC 181 and CISC 220.",
        restrict: "",
        breadth: "University: ; A&S: ",
        typ: "Fall and Spring"
    },
    {
        code: "MATH 241",
        name: "Analytic Geometry and Calculus A",
        descr: "Functions, limits, continuity, derivatives. Polynomial, rational, exponential, hyperbolic, logarithmic, trigonometric and inverse trigonometric functions. Definite and indefinite integrals and the Fundamental Theorem of Calculus. Simple differential equations (separable ODE, linear ODE). ODE models leading to exponential growth and decay.",
        credits: 4,
        preReq: "MATH 117 or acceptable score on the Math Placement Exam in accordance with current standards determined by the Department of Mathematical Sciences. See https://www.mathsci.udel.edu/courses-placement/ud-math-placement for more information.",
        restrict:
            "Students who received credit in MATH 242 or MATH 243 are not eligible to take this course without permission.",
        breadth:
            "University: Mathematics, Natural Sciences and Technology; A&S: GROUP D: A&S Math, Nat Sci & Technology",
        typ: "Fall, Winter, Spring, Summer"
    },
    {
        code: "MATH 242",
        name: "Analytic Geometry and Calculus B",
        descr: "Brief review of MATH 241; evaluation of limits by L\u2019Hospital\u2019s rule; applications of integration; integration techniques; parametric curves; polar coordinates; infinite sequences and series. Includes use of computers to perform symbolic, numerical and graphical analysis.",
        credits: 4,
        preReq: "MATH 241 or MATH 232.",
        restrict:
            "Students who received credit in MATH 243 are not eligible to take this course without permission.",
        breadth:
            "University: Mathematics, Natural Sciences and Technology; A&S: GROUP D: A&S Math, Nat Sci & Technology",
        typ: "Fall, Winter, Spring, Summer"
    }
];
