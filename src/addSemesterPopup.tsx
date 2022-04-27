import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { DegreePlan } from "./Interfaces/degreePlan";
import { Season, Semester, validSeason } from "./Interfaces/semester";

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
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                                <option value="Fall">Fall</option>
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
                        setPlans(
                            planList.map(
                                (curr: DegreePlan): DegreePlan =>
                                    curr === plan
                                        ? addSemHelp(curr, season, year)
                                        : curr
                            )
                        )
                    }
                    color="primary"
                >
                    Add Semester
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
function addSemHelp(
    plan: DegreePlan,
    season: Season,
    year: number
): DegreePlan {
    const alreadyContains = plan.semesterList.find(
        (check: Semester): boolean =>
            check.season === season && check.year === year
    );
    if (alreadyContains) {
        return plan;
    }
    return {
        ...plan,
        semesterList: [
            ...plan.semesterList,
            { year: year, season: season, courseList: [], totalCredits: 0 }
        ]
    };
}
