export interface Degree {
    /** The name of the degree */
    title: string;
    /** A list of all the courses required to get this degree */
    requiredCourses: string[];

    /**Corresponds to number of required credits
     * Pos 0: Creative Arts and Humanities
     * Pos 1: History and Cultural Change
     * Pos 2: Social and Behavioral Sciences
     * Pos 3: Mathematics, Natural Sciences and Technology
     */
    breadthRequirements: number[];
    /** The total number of credits required to get this degree */
    requiredCredits: number;
}
