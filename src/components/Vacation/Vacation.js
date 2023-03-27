import React, {Component} from "react";
import {ButtonToolbar, Button, Table} from "react-bootstrap";

import { AddVacModal } from "./AddVacModal";
import { EditVacModal } from "./EditVacModal";

export class Vacation extends Component{
    constructor(props){
        super(props);
        this.state={vacs:[],
            emps:[],
            types:[],
            addModalShow:false,
            editModalShow:false}
        
        this.refreshList = this.refreshList.bind(this);
    }


    refreshList(){
        fetch("http://localhost:5125/Vacations")
        .then(response=>response.json())
        .then(data=>{
            this.setState({vacs:data})
        });

        fetch("http://localhost:5125/Employees")
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });

        fetch("http://localhost:5125/VacationType")
        .then(response=>response.json())
        .then(data=>{
            this.setState({types:data});
        });

    }

    deleteVac(id){
        if(window.confirm('Вы уверены?')){
            fetch("http://localhost:5125/Vacations/" + id, {
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
        //console.log("TRIP MOUNTED");

    }


   render(){
    const {vacs, id, startDate, endDate,
          employeeId, vacationTypeId} = this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
    let editModalClose=()=>this.setState({editModalShow:false});
    return(
        <div key={1}>
           <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Id отпуска</th>
                    <th>Сотрудник</th>
                    <th>Тип отпуска</th>
                    <th>Дата начала</th>
                    <th>Дата оконачания</th>
                    <th>Количество дней</th>
                </tr>
            </thead>
            <tbody>
                {vacs.map(vac=>
                <tr key={vac.id}>
                    <td>{vac.id}</td>
                    <td>{this.state.emps.map(emp=>emp.id===vac.employeeId?emp.name + " " + emp.lastName:"")}</td>
                    <td>{this.state.types.map(t=>t.id===vac.vacationTypeId?t.type:"")}</td>
                    <td>{new Date(vac.startDate).toLocaleDateString()}</td>
                    <td>{new Date(vac.endDate).toLocaleDateString()}</td>
                    <td>{vac.daysCount}</td>
                    <td>
                        <ButtonToolbar>
                            <Button className="mr-3" variant="info"
                            onClick={()=>this.setState({editModalShow:true,
                            id: vac.id,
                            employeeId:vac.employeeId,
                            vacationTypeId:vac.vacationTypeId,
                            startDate:new Date(vac.startDate).toISOString().split('T')[0],
                            endDate:new Date(vac.endDate).toISOString().split('T')[0],
                            daysCount:vac.daysCount,
                            })}>
                                Изменить
                            </Button>
                              <Button className="mr-3" variant="danger"
                            onClick={()=>this.deleteVac(vac.id)}>
                                Удалить
                            </Button>

                            <EditVacModal show={this.state.editModalShow}
                            onHide={editModalClose}
                            refreshList={this.refreshList}
                            id={id}
                            employeeId={employeeId}
                            vacationTypeId={vacationTypeId}
                            startDate={startDate}
                            endDate={endDate}
                            />
                        </ButtonToolbar>
                    </td>
                </tr>)}
            </tbody>
            </Table> 
            <ButtonToolbar>
                <Button variant="primary"
                 onClick={()=>this.setState({addModalShow:true})}>
                    Добавить отпуск
                </Button>
                <AddVacModal show={this.state.addModalShow}
                onHide={addModalClose}
                refreshList={this.refreshList} />
            </ButtonToolbar>
        </div>
    );
   }
}


