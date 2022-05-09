import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Course } from "../../Interfaces/course";

export function CourseInSemester({ course }: { course: Course }): JSX.Element {
    const [descriptionVis, setDescriptionVis] = useState<boolean>(false);

    function flipVis(): void {
        setDescriptionVis(!descriptionVis);
    }

    return (
        <div style={{ justifyContent: "center", display: "flex" }}>
            <div style={{ width: "90%" }}>
                <hr></hr>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <h4
                                    onClick={flipVis}
                                    style={{ cursor: "pointer" }}
                                >
                                    {course.code}: {course.name}
                                </h4>
                            </Row>
                            <Row>
                                <Col>
                                    {descriptionVis && (
                                        <h5>({course.credits} credits)</h5>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {descriptionVis && <p>{course.descr}</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {descriptionVis && <p>{course.preReq}</p>}
                                </Col>
                                <Col>
                                    {descriptionVis && <p>{course.breadth}</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {descriptionVis && <p>{course.restrict}</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {descriptionVis && <p>{course.typ}</p>}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
