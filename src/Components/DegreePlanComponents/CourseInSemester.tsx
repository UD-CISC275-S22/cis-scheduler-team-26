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
                            {descriptionVis && (
                                <Container>
                                    <Row>
                                        <h5>({course.credits} credits)</h5>
                                    </Row>
                                    <Row>
                                        <p>{course.descr}</p>
                                    </Row>
                                    <Row>
                                        {course.preReq != "" && (
                                            <p>
                                                Prerequisite Courses:{" "}
                                                {course.preReq}
                                            </p>
                                        )}
                                        {course.breadth !=
                                            "University: ; A&S: " && (
                                            <p>
                                                Satisfies Breadth:{" "}
                                                {course.breadth}
                                            </p>
                                        )}
                                    </Row>
                                    <Row>
                                        {course.restrict != "" && (
                                            <p>
                                                Restrictions: {course.restrict}
                                            </p>
                                        )}
                                    </Row>
                                    <Row>
                                        <Col>
                                            Typically Offered in: {course.typ}
                                        </Col>
                                    </Row>
                                </Container>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
