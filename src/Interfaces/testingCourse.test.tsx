import { getCourseList, addCourse, removeCourse } from "./course";

test("Testing the initialized course list", () => {
    expect(getCourseList().length).toEqual(5);
});

test("Testing addCourse function", () => {
    addCourse({
        id: 220,
        courseName: "CISC",
        numCredits: 3,
        preReq: [],
        taken: false
    });
    addCourse({
        id: 260,
        courseName: "CISC",
        numCredits: 3,
        preReq: [],
        taken: false
    });
    addCourse({
        id: 1000,
        courseName: "CISC",
        numCredits: 3,
        preReq: [],
        taken: false
    });
    expect(getCourseList().length).toEqual(8);
});

test("Testing removeCourse function", () => {
    removeCourse(1000, "CISC");
    expect(getCourseList().length).toEqual(7);
});
