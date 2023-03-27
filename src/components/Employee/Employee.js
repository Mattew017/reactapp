import React, {Component} from "react";
import {ButtonToolbar, Button, Table} from "react-bootstrap";

import { AddEmpModal } from "../Employee/AddEmpModal";
import {EditEmpModal} from '../Employee/EditEmpModal'

export class Employee extends Component{
    constructor(props){
        super(props);
        this.state={emps:[],
            deps:[],
            addModalShow:false,
            editModalShow:false}
        this.refreshList = this.refreshList.bind(this);
    }


    refreshList(){
        fetch("http://localhost:5125/Employees")
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data})
        })

        fetch("http://localhost:5125/Departments")
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });

    }

    deleteEmp(id){
        if(window.confirm('Вы уверены?')){
            fetch("http://localhost:5125/Employees/" + id, {
                method: 'DELETE',
                headers:{
                    "Accept": "applocation/json",
                    "Content-type": "application/json"
                }
            }).then(res=>this.refreshList())
        };
    }


    componentDidMount(){
        this.refreshList();
    }


   render(){
    const {emps, id, name, lastName, passport,
         phoneNumber, adress, position, departmentId} = this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
    let editModalClose=()=>this.setState({editModalShow:false});
    return(
        <div key={1}>
           <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Id сотрудника</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Пасспорт</th>
                    <th>Телефон</th>
                    <th>Адрес</th>
                    <th>Должность</th>
                    <th>Отдел</th>
                </tr>
            </thead>
            <tbody>
                {emps.map(emp=>
                <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.passport}</td>
                    <td>{emp.phoneNumber}</td>
                    <td>{emp.adress}</td>
                    <td>{emp.position}</td>
                    <td>{this.state.deps.map(dep=>dep.id===emp.departmentId?dep.name:"")}</td>
                    <td>
                        <ButtonToolbar>
                            <Button className="mr-3" variant="info"
                            onClick={()=>this.setState({editModalShow:true,
                            id:emp.id,
                            name:emp.name,
                            lastName:emp.lastName,
                            passport:emp.passport,
                            phoneNumber:emp.phoneNumber,
                            adress:emp.adress,
                            position:emp.position,
                            departmentId:emp.departmentId
                            })}>
                                Изменить
                            </Button>
                              <Button className="mr-3" variant="danger"
                            onClick={()=>this.deleteEmp(emp.id)}>
                                Удалить
                            </Button>

                            <EditEmpModal show={this.state.editModalShow}
                             refreshList={this.refreshList}
                            onHide={editModalClose}
                           
                            id={id}
                            name={name}
                            lastName={lastName}
                            passport={passport}
                            phoneNumber={phoneNumber}
                            adress={adress}
                            position={position}
                            departmentId={departmentId}
                            />
                        </ButtonToolbar>
                    </td>
                </tr>)}
            </tbody>
            </Table> 
            <ButtonToolbar>
                <Button variant="primary"
                 onClick={()=>this.setState({addModalShow:true})}>
                    Добавить сотрудника
                </Button>
                <AddEmpModal show={this.state.addModalShow}
                refreshList={this.refreshList}
                onHide={addModalClose}
                 />
            </ButtonToolbar>
        </div>
    );
   }
}

