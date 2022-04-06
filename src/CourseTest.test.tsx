import { courseList } from "./Courses";

test("Testing Initialized Course List", () => {
    expect(courseList.length).toEqual(4);
});
