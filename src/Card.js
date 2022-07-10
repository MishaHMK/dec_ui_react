import React,{Component} from "react";
import {variables} from './Variables.js';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCardModal} from './AddCardModal';
import {EditCardModal} from './EditCardModal';

export class Card extends Component{

    constructor(props){
        super(props);

        this.state={
            cards:[],
            addModalShow:false, 
            editModalShow:false,

            PaymentDetailIdFilter:"",
            CardOwnerIdFilter:"",
            CardNumberFilter:"",
            ExpirationDateFilter:"",
            SecurityCodeFilter:"",
            cardsWithoutFilter:[]
        }
    }

    FilterFn(){
        var PaymentDetailIdFilter=this.state.PaymentDetailIdFilter;
        var CardOwnerIdFilter = this.state.CardOwnerIdFilter;
        var CardNumberFilter = this.state.CardNumberFilter;
        var ExpirationDateFilter = this.state.ExpirationDateFilter
        var SecurityCodeFilter = this.state.SecurityCodeFilter;

        var filteredData=this.state.cardsWithoutFilter.filter(
            function(el){
                return el.paymentDetailId.toString().toLowerCase().includes(
                    PaymentDetailIdFilter.toString().trim().toLowerCase()
                )&&
                el.cardOwnerId.toString().toLowerCase().includes(
                    CardOwnerIdFilter.toString().trim().toLowerCase()
                )&&
                el.cardNumber.toString().toLowerCase().includes(
                    CardNumberFilter.toString().trim().toLowerCase()
                )&&
                el.expirationDate.toString().toLowerCase().includes(
                    ExpirationDateFilter .toString().trim().toLowerCase()
                )&&
                el.securityCode.toString().toLowerCase().includes(
                    SecurityCodeFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({cards:filteredData});
    }

    sortResult(prop, asc){
        var sortedData=this.state.cardsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({cards:sortedData});
    }

    changePaymentDetailIdFilter = (e)=>{
        this.state.PaymentDetailIdFilter=e.target.value;
        this.FilterFn();
    }

    changeCardOwnerIdFilter = (e)=>{
        this.state.CardOwnerIdFilter=e.target.value;
        this.FilterFn();
    }

    changeCardNumberFilter = (e)=>{
        this.state.CardNumberFilter=e.target.value;
        this.FilterFn();
    }

    changeExpirationDateFilter = (e)=>{
        this.state.ExpirationDateFilter=e.target.value;
        this.FilterFn();
    }

    changeSecurityCodeFilter = (e)=>{
        this.state.SecurityCodeFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL + 'paymentdetails')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cards:data, cardsWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    deleteCard(cardid){
        if(window.confirm('Are you sure?')){
            fetch(variables.API_URL + 'paymentdetails/' + cardid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {cards, cardid, ownerid, cardnum, exdate, security}=this.state; 

        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        
        return(
            <div>
            <table className="table table-striped">
            <thead>
            <tr>
                <th>
                <div className="d-flex flex-row">

                <input className="form-control m-2"
                onChange={this.changePaymentDetailIdFilter}
                placeholder="Filter"/>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('paymentDetailId',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('paymentDetailId',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>

                </div>
                    CardId
                </th>
                <th>
                <div className="d-flex flex-row">

                <input className="form-control m-2"
                onChange={this.changeCardOwnerIdFilter}
                placeholder="Filter"/>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('cardOwnerId',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('cardOwnerId',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>

                </div>
                    OwnerId
                </th>
                <th>
                <div className="d-flex flex-row">

                <input className="form-control m-2"
                onChange={this.changeCardNumberFilter}
                placeholder="Filter"/>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('cardNumber',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('cardNumber',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>

                </div>
                    CardNumber
                </th>
                <th>
                <div className="d-flex flex-row">

                <input className="form-control m-2"
                onChange={this.changeExpirationDateFilter}
                placeholder="Filter"/>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('expirationDate',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('expirationDate',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>

                </div>
                    ExpirationDate
                </th>
                <th>
                <div className="d-flex flex-row">

                <input className="form-control m-2"
                onChange={this.changeSecurityCodeFilter}
                placeholder="Filter"/>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('securityCode',true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-light"
                onClick={()=>this.sortResult('securityCode',false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </button>

                </div>  
                    SecurityCode
                </th>
            </tr>
            </thead>
            <tbody>
        {cards.map(сard=>
            <tr key={сard.paymentDetailId}>
                <td>{сard.paymentDetailId}</td>
                <td>{сard.cardOwnerId}</td>
                <td>{сard.cardNumber}</td>
                <td>{сard.expirationDate}</td>
                <td>{сard.securityCode}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.setState({editModalShow:true,
                    cardid : сard.paymentDetailId,
                    ownerid : сard.cardOwnerId,
                    cardnum : сard.cardNumber,
                    exdate : сard.expirationDate,
                    security : сard.securityCode})}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteCard(сard.paymentDetailId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                <EditCardModal show={this.state.editModalShow}
                onHide={editModalClose}
                cardid={cardid}
                ownerid={ownerid}
                cardnum ={cardnum}
                exdate ={exdate}
                security ={security}/>

                </td>
            </tr>
            )}
             </tbody>
            </table>

            <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Card</Button>

                    <AddCardModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}