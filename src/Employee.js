import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {variables} from './Variables.js';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={
            emps:[], 
            addModalShow:false, 
            editModalShow:false,

            EmployeeIdFilter:"",
            EmployeeNameFilter:"",
            EmployeeSurnameFilter:"",
            DepartmentNameFilter:"",
            DateOfJoiningFilter:"",
            employeesWithoutFilter:[]
        }
    }

    FilterFn(){
        var EmployeeIdFilter=this.state.EmployeeIdFilter;
        var EmployeeNameFilter = this.state.EmployeeNameFilter;
        var EmployeeSurnameFilter = this.state.EmployeeSurnameFilter;
        var DepartmentNameFilter = this.state.DepartmentNameFilter
        var DateOfJoiningFilter = this.state.DateOfJoiningFilter;

        var filteredData=this.state.employeesWithoutFilter.filter(
            function(el){
                return el.employeeId.toString().toLowerCase().includes(
                    EmployeeIdFilter.toString().trim().toLowerCase()
                )&&
                el.employeeName.toString().toLowerCase().includes(
                    EmployeeNameFilter.toString().trim().toLowerCase()
                )&&
                el.employeeSurname.toString().toLowerCase().includes(
                    EmployeeSurnameFilter.toString().trim().toLowerCase()
                )&&
                el.departmentName.toString().toLowerCase().includes(
                    DepartmentNameFilter .toString().trim().toLowerCase()
                )&&
                el.dateOfJoining.toString().toLowerCase().includes(
                    DateOfJoiningFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({emps:filteredData});
    }

    sortResult(prop, asc){
        var sortedData=this.state.employeesWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({emps:sortedData});
    }
    
    changeEmployeeIdFilter = (e)=>{
        this.state.EmployeeIdFilter=e.target.value;
        this.FilterFn();
    }

    changeEmployeeNameFilter = (e)=>{
        this.state.EmployeeNameFilter=e.target.value;
        this.FilterFn();
    }

    changeEmployeeSurnameFilter = (e)=>{
        this.state.EmployeeSurnameFilter=e.target.value;
        this.FilterFn();
    }

    changeDepartmentNameFilter = (e)=>{
        this.state.DepartmentNameFilter=e.target.value;
        this.FilterFn();
    }

    changeDateOfJoiningFilter = (e)=>{
        this.state.DateOfJoiningFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data, employeesWithoutFilter:data});
        });
    }

    componentDidMount(){
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
                        <th>
                        <div className="d-flex flex-row">

                        <input className="form-control m-2"
                        onChange={this.changeEmployeeIdFilter}
                        placeholder="Filter"/>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('employeeId',true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('employeeId',false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                            </svg>
                        </button>

                        </div>
                        EmployeeId
                        </th>

                        <th>
                        <div className="d-flex flex-row">

                        <input className="form-control m-2"
                        onChange={this.changeEmployeeNameFilter}
                        placeholder="Filter"/>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('employeeName',true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('employeeName',false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                            </svg>
                        </button>

                        </div>
                        EmployeeName
                        </th>

                        <th>
                        <div className="d-flex flex-row">
                        <input className="form-control m-2"
                        onChange={this.changeEmployeeSurnameFilter}
                        placeholder="Filter"/>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('employeeSurname',true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('employeeSurname',false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                            </svg>
                        </button>    
                        </div>
                        EmployeeSurname
                        </th>

                        <th>
                        <div className="d-flex flex-row">
                        <input className="form-control m-2"
                        onChange={this.changeDepartmentNameFilter}
                        placeholder="Filter"/>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('departmentName',true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('departmentName',false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                            </svg>
                        </button>    
                        </div>
                        Department
                        </th>

                        <th>
                        <div className="d-flex flex-row">
                        <input className="form-control m-2"
                        onChange={this.changeDateOfJoiningFilter}
                        placeholder="Filter"/>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('dateOfJoining',true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>

                        <button type="button" className="btn btn-light"
                        onClick={()=>this.sortResult('dateOfJoining',false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                            </svg>
                        </button>    
                        </div>
                        Date of Joining
                        </th>

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