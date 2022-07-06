import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {variables} from './Variables.js';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(variables.API_URL+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL+'employee/'+ empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, empid,empname,empsur,depmt,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>EmployeeSurname</th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.employeeId}>
                                <td>{emp.employeeId}</td>
                                <td>{emp.employeeName}</td>
                                <td>{emp.employeeSurname}</td>
                                <td>{emp.departmentName}</td>
                                <td>{emp.dateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        empid:emp.employeeId,empname:emp.employeeName,empsur: emp.employeeSurname,depmt:emp.departmentName,
        photofilename:emp.photoFileName,doj:emp.dateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.employeeId)}>
            Delete
        </Button>

        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empname={empname}
        empsur={empsur}
        depmt={depmt}
        photofilename={photofilename}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>
                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}