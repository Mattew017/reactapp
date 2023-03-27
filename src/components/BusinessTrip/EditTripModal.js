import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

export class EditTripModal extends Component{
    constructor(props){
        super(props);
        this.state={emps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    componentDidMount(){
        fetch("http://localhost:5125/Employees")
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.props.startDate);
        fetch("http://localhost:5125/BusinnesTrips", {
            method: 'PUT',
            headers:{
                "Accept": "applocation/json",
                "Content-type": "application/json"
            },
            body:JSON.stringify({
                id: event.target.id.value,
                employeeId: event.target.employeeId.value,
                adress: event.target.adress.value,
                purpose: event.target.purpose.value,
                startDate: event.target.startDate.value,
                endDate: event.target.endDate.value,
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
                        Редактирование командировки
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="id">
                                <Form.Label>Id командировки</Form.Label>
                                <Form.Control type="text" name="id" required
                                disabled
                                defaultValue={this.props.id}
                                placeholder="Id командировки" />
                            </Form.Group>

                            <Form.Group controlId="employeeId">
                                <Form.Label>Сотрудник</Form.Label>
                                <Form.Control as="select" name="employeeId">
                                    {this.state.emps.map(emp=>
                                        <option value={emp.id}  key={emp.id}>
                                            {emp.name + " " + emp.lastName}
                                        </option>
                                        )}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="adress">
                                <Form.Label>Адрес</Form.Label>
                                <Form.Control type="text" name="adress" required
                                placeholder="Адрес..." defaultValue={this.props.adress} />
                            </Form.Group>
                            <Form.Group controlId="purpose">
                                <Form.Label>Цель</Form.Label>
                                <Form.Control type="text" name="purpose" required
                                placeholder="Цель поездки..." defaultValue={this.props.purpose} />
                            </Form.Group>
                            <Form.Group controlId="startDate">
                                <Form.Label>Дата начала</Form.Label>
                                <Form.Control type="date" name="startDate" required  defaultValue={this.props.startDate}
                                placeholder="Дата начала..."  />
                            </Form.Group>
                            <Form.Group controlId="endDate">
                                <Form.Label>Дата окончания</Form.Label>
                                <Form.Control type="date" name="endDate" required  defaultValue={this.props.endDate}
                                
                                placeholder="Дата окончания..."  />
                            </Form.Group>
                            <Form.Group>
                                <Button  variant="primary" type="submit">
                                    Изменить командировку
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