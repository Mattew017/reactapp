import React, {Component} from "react";
import {ButtonToolbar, Button, Table} from "react-bootstrap";

import { AddDepModal } from "./AddDepModal";
import { EditDepModal } from "./EditDepModal";

export class Department extends Component{
    constructor(props){
        super(props)
        this.state={deps:[],
            addModalShow:false,
            editModalShow:false}
            this.refreshList = this.refreshList.bind(this);
    }

    refreshList(){
        fetch("http://localhost:5125/Departments")
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data})
        })
        console.log("UPDATED");

    }

    deleteDep(depid){
        if(window.confirm('Вы уверены?')){
            fetch("http://localhost:5125/Departments/" + depid, {
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
    const {deps, depid, depname} = this.state;
    let addModalClose=()=>this.setState({addModalShow:false});
    let editModalClose=()=>this.setState({editModalShow:false});
    return(
        <div>
           <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Номер отдела</th>
                    <th>Название</th>
                    <th>Опции</th>
                </tr>
            </thead>
            <tbody>
                {deps.map(dep=>
                <tr key={dep.id}>
                    <td>{dep.id}</td>
                    <td>{dep.name}</td>
                    <td>
                        <ButtonToolbar>
                            <Button className="mr-3" variant="info"
                            onClick={()=>this.setState({editModalShow:true, depid:dep.id, depname:dep.name})}>
                                Изменить
                            </Button>
                              <Button className="mr-3" variant="danger"
                            onClick={()=>this.deleteDep(dep.id)}>
                                Удалить
                            </Button>

                            <EditDepModal show={this.state.editModalShow}
                            onHide={editModalClose}
                            depid={depid}
                            depname={depname}
                            refreshList={this.refreshList}/>
                        </ButtonToolbar>
                    </td>
                </tr>)}
            </tbody>
            </Table> 
            <ButtonToolbar>
                <Button variant="primary"
                 onClick={()=>this.setState({addModalShow:true})}>
                    Добавить отдел
                </Button>
                <AddDepModal show={this.state.addModalShow}
                onHide={addModalClose}
                refreshList={this.refreshList} />
            </ButtonToolbar>
        </div>
    );
   }
}

