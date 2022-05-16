import React from "react";
import SelectSearch, { SelectSearchOption } from "react-select-search";
import { Course } from "../../Interfaces/course";
import { findCourseByCode } from "./ViewPlanFunctions";
import "./CourseSearchComponent.css";

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
        return (opt: string) => {
            if (opt === "") return [];
            else
                return opts.filter((val: SelectSearchOption) =>
                    //The weird replace stuff here just removes whitespace from the strings
                    val.name
                        .replace(/\s+/g, "")
                        .toUpperCase()
                        .startsWith(opt.replace(/\s+/g, "").toUpperCase())
                );
        };
    }
    return (
        <div>
            <h5>Search for course:</h5>
            <SelectSearch
                options={sel_search_options}
                search={true}
                filterOptions={filter_for_sel_search}
                closeOnSelect={true}
                onChange={(selectedVal) => {
                    setAddingCourse(
                        findCourseByCode(courses, selectedVal.toString())
                    );
                }}
                placeholder={"ex. CISC 108"}
            ></SelectSearch>
        </div>
    );
}
