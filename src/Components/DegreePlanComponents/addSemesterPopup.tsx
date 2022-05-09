import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Season, Semester, validSeason } from "../../Interfaces/semester";

export function addSemesterPopup(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    season: Season,
    setSeason: (newSeason: Season) => void,
    year: number,
    setYear: (newYear: number) => void,
    addSem: boolean,
    setAddSem: (newAddSem: boolean) => void
): JSX.Element {
    return (
        <Modal show={addSem} onHide={() => setAddSem(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add Semester</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formPlanID" as={Row}>
                    <Col>
                        <Form.Group controlId="semesterYear">
                            <Form.Label>Year:</Form.Label>
                            <Form.Control
                                type="number"
                                value={year}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setYear(parseInt(event.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="semesterSeason">
                            <Form.Label>Season:</Form.Label>
                            <Form.Select
                                value={season}
                                onChange={(
                                    event: React.ChangeEvent<HTMLSelectElement>
                                ) => setSeason(validSeason(event.target.value))}
                            >
                                <option value="Fall">Fall</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outlined"
                    className="m-2"
                    onClick={() => setAddSem(false)}
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    className="m-2"
                    onClick={() =>
                        addSemester(plan, planList, setPlans, season, year)
                    }
                    color="primary"
                >
                    Add Semester
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
function seasonNumber(season: Season) {
    const check: string = validSeason(season);
    if (check === "Fall") {
        return 0;
    } else if (check === "Winter") {
        return 1;
    } else if (check === "Spring") {
        return 2;
    } else {
        return 3;
    }
}
function addSemester(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    season: Season,
    year: number
) {
    const alreadyContains = plan.semesterList.find(
        (check: Semester): boolean =>
            check.season === season && check.year === year
    );
    if (!alreadyContains) {
        const newPlan = plan;
        newPlan.semesterList.splice(0, 0, {
            year: year,
            season: season,
            courseList: []
        });
        newPlan.semesterList.sort((s1: Semester, s2: Semester) => {
            if (s1.year > s2.year) {
                return 1;
            } else if (s1.year < s2.year) {
                return -1;
            } else if (seasonNumber(s1.season) > seasonNumber(s2.season)) {
                return 1;
            } else {
                return -1;
            }
        });
        setPlans(
            planList.map(
                (curr: DegreePlan): DegreePlan =>
                    curr === plan ? newPlan : curr
            )
        );
    }
}
