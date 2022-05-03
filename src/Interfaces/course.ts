export interface Course {
    //The Department and Course number
    code: string;
    //The name of the course
    name: string;
    //The description of the course
    descr: string;
    //The credit count
    credits: number;
    //The Prereq courses
    preReq: string;
    //Text that says if the course is restricted to certain majors, etc
    restrict: string;
    //Not sure exactally how useful this is yet
    breadth: string;
    //The semesters this course is typically offerered in
    typ: string;
}
