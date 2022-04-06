import { getCourseList } from "./course";

test("Testing the course list", () => {
    expect(getCourseList().length).toEqual(5);
});
