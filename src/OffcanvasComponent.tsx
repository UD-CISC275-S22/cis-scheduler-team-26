import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "./OffcanvasComponent.css";

//Little test demonstrating use of the Offcanvas react-bootstrap element
export function TestComponent(): JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div className="offcanvas-component">
            <Button
                onClick={() => setShow(true)}
                className="offcanvas-show-button"
            >
                Show Offcanvas Component
            </Button>
            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement={"end"}
                style={{ innerWidth: "600px" }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Degree Plan</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>Hello!</Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}
