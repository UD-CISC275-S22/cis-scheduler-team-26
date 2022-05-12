import React from "react";
import SelectSearch, { SelectSearchOption } from "react-select-search";
import { Course } from "../../Interfaces/course";
import { findCourseByCode } from "./ViewPlanFunctions";

export function CourseSearch({
    courses,
    setAddingCourse
}: {
    courses: Course[];
    setAddingCourse: (c: Course) => void;
}): JSX.Element {
    const sel_search_options: SelectSearchOption[] = courses.map(
        (course: Course) => {
            const opt: SelectSearchOption = {
                name: course.code,
                value: course.code
            };
            return opt;
        }
    );
    function filter_for_sel_search(opts: SelectSearchOption[]) {
        return (opt: string) =>
            opts.filter((val: SelectSearchOption) => val.name.startsWith(opt));
    }
    return (
        <div>
            <h5>Search for course:</h5>
            <SelectSearch
                options={sel_search_options}
                search={true}
                filterOptions={filter_for_sel_search}
                closeOnSelect={false}
                onChange={(selectedVal) =>
                    setAddingCourse(
                        findCourseByCode(courses, selectedVal.toString())
                    )
                }
                placeholder={"ex. CISC 108"}
            ></SelectSearch>
        </div>
    );
}
