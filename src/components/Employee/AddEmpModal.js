import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:5125/Departments")
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch("http://localhost:5125/Employees", {
            method: 'POST',
            headers:{
                "Accept": "applocation/json",
                "Content-type": "application/json"
            },
            body:JSON.stringify({
                name: event.target.name.value,
                lastName: event.target.lastName.value,
                passport: event.target.passport.value,
                phoneNumber: event.target.phoneNumber.value,
                adress: event.target.adress.value,
                position: event.target.position.value,
                departmentId: event.target.DepartmentId.value
            })
        })
        .then(res=>res.json())
        .then(data => console.log(data))
        .then(data => this.props.refreshList())
        .catch(err => console.log(err)) 

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
                        Добавить сотрудника
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="DepartmentId">
                                <Form.Label>Отдел</Form.Label>
                                <Form.Control as="select" name="DepartmentId">
                                    {this.state.deps.map(dep=>
                                        <option value={dep.id}  key={dep.id}>
                                            {dep.name}
                                        </option>
                                        )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control type="text" name="name" required
                                placeholder="Имя..." />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control type="text" name="lastName" required
                                placeholder="Фамилия..." />
                            </Form.Group>
                            <Form.Group controlId="passport">
                                <Form.Label>Паспорт</Form.Label>
                                <Form.Control type="text" name="passport" required
                                placeholder="Паспорт..." />
                            </Form.Group>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control type="text" name="phoneNumber" required
                                placeholder="Телефон..." />
                            </Form.Group>
                            <Form.Group controlId="adress">
                                <Form.Label>Адрес</Form.Label>
                                <Form.Control type="text" name="adress" required
                                placeholder="Адрес..." />
                            </Form.Group>
                            <Form.Group controlId="position">
                                <Form.Label>Должность</Form.Label>
                                <Form.Control type="text" name="position" required
                                placeholder="Должность..." />
                            </Form.Group>
                            <Form.Group>
                                <Button  variant="primary" type="submit">
                                    Добавить сотрудника
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