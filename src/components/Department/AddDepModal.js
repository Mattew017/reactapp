import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

export class AddDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch("http://localhost:5125/Departments", {
            method: 'POST',
            headers:{
                "Accept": "applocation/json",
                "Content-type": "application/json"
            },
            body:JSON.stringify({
                name: event.target.name.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.props.refreshList();
        },
        (error)=>{
            alert("error");
        })

    }

    render(){
        return(
            <div className="container">
            <Modal
            show={this.props.show} onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-vcenter">
                        Добавить отдел
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Название</Form.Label>
                                <Form.Control type="text" name="name" required
                                placeholder="Название отдела..." />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Добавить отдел
                                </Button>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Закрыть </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}