import React, {Component} from "react";
import {ButtonToolbar, Button, Table} from "react-bootstrap";

import { AddTripModal } from "./AddTripModal";
import { EditTripModal } from "./EditTripModal";

export class BusinessTrip extends Component{
    constructor(props){
        super(props);
        this.state={trips:[],
            emps:[],
            addModalShow:false,
            editModalShow:false}

        this.refreshList = this.refreshList.bind(this);
    }


    refreshList(){
        fetch("http://localhost:5125/BusinnesTrips")
        .then(response=>response.json())
        .then(data=>{
            this.setState({trips:data})
        })

        fetch("http://localhost:5125/Employees")
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });

    }

    deleteTrip(id){
        if(window.confirm('Вы уверены?')){
            fetch("http://localhost:5125/BusinnesTrips/" + id, {
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
    const {trips, id, startDate, endDate, daysCount,
        adress, purpose,  employeeId} = this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
    let editModalClose=()=>this.setState({editModalShow:false});
    return(
        <div key={1}>
           <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Id командировки</th>
                    <th>Сотрудник</th>
                    <th>Цель</th>
                    <th>Адрес</th>
                    <th>Дата начала</th>
                    <th>Дата оконачания</th>
                    <th>Количество дней</th>
                </tr>
            </thead>
            <tbody>
                {trips.map(trip=>
                <tr key={trip.id}>
                    <td>{trip.id}</td>
                    <td>{this.state.emps.map(emp=>emp.id===trip.employeeId?emp.name + " " + emp.lastName:"")}</td>
                    <td>{trip.purpose}</td>
                    <td>{trip.adress}</td>
                    <td>{new Date(trip.startDate).toLocaleDateString()}</td>
                    <td>{new Date(trip.endDate).toLocaleDateString()}</td>
                    <td>{trip.daysCount}</td>
                    <td>
                        <ButtonToolbar>
                            <Button className="mr-3" variant="info"
                            onClick={()=>this.setState({editModalShow:true,
                            id: trip.id,
                            employeeId:trip.employeeId,
                            adress:trip.adress,
                            purpose:trip.purpose,
                            startDate:new Date(trip.startDate).toISOString().split('T')[0],
                            endDate:new Date(trip.endDate).toISOString().split('T')[0],
                            daysCount:trip.daysCount,
                            })}>
                                Изменить
                            </Button>
                              <Button className="mr-3" variant="danger"
                            onClick={()=>this.deleteTrip(trip.id)}>
                                Удалить
                            </Button>

                            <EditTripModal show={this.state.editModalShow}
                            onHide={editModalClose}
                            refreshList={this.refreshList}
                            id={id}
                            employeeId={employeeId}
                            purpose={purpose}
                            startDate={startDate}
                            endDate={endDate}
                            adress={adress}

                            />
                        </ButtonToolbar>
                    </td>
                </tr>)}
            </tbody>
            </Table> 
            <ButtonToolbar>
                <Button variant="primary"
                 onClick={()=>this.setState({addModalShow:true})}>
                    Добавить командировку
                </Button>
                <AddTripModal show={this.state.addModalShow}
                onHide={addModalClose}
                refreshList={this.refreshList} />
            </ButtonToolbar>
        </div>
    );
   }
}


