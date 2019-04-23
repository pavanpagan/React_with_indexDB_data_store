import './App.css';
import React, { Component } from "react";
import  SweetAlert from 'react-bootstrap-sweetalert';
import {  Row, Col } from "react-bootstrap";
import { ReactIndexedDB } from 'react-indexed-db';
import Table from './Table';
let   db,tx,store,index,request;

class App extends Component
{
  constructor(props){
    super(props);
    this.state = {
        uname : {valid : false,value : ''},
        password : {valid : false,value : ''},
        email  : {valid : false,value : ''},
        username : '',
        pword : '',
        emailid:'',
        alert_message : '',
        alert_state_danger : false,
        alert_state_warning : false,
        alert_state_success : false,
        peoples: [],
        localData:[{"qId":'',
          "username":'',
          "password":'',
          "email":''
        }]
    }
   
}
componentWillMount()
{
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }
  else
  {
    request = window.indexedDB.open("kotmaster", 3);
 
    request.onerror=(e)=>{
      console.log("error",e);
    }

    request.onsuccess=(e)=>{
        db=request.result;
        tx=db.transaction("FormDataStore",'readwrite');
        store=tx.objectStore("FormDataStore");
        index=store.index("Formtext");

        db.onerror=(e)=>{
          console.log("error",e);
        }
        let q1=store.getAll();
        q1.onsuccess=(e)=>
        {
          this.setState({
            localData:e.target.result
          })
        }
        tx.oncomplete=()=>{
          db.close();
        }
    }

    request.onupgradeneeded=(e)=>{
      let db=request.result,
          store=db.createObjectStore("FormDataStore",{autoIncrement:true});
          index=store.createIndex("Formtext","Formtext",{unique:false});
    }
  }
}

handleChange(e){
  let valid = this.state[e.target.name].valid;
  e.preventDefault();
  let value = e.target.value
  switch(e.target.name){
      case 'uname':
          if (/^[A-Za-z]+$/.test(value))
          {
              valid = true;
              this.setState({
              username:''
              })
          }
          else 
          {
              valid = false;
              this.setState({
              username:'Username is not valid'
              })
          }
          break;
      case 'password':
          if(/^[0-9]+$/.test(value)){
              valid =true;
              this.setState({
              pword:''
              })
          } else {
              valid = false;
              this.setState({
              pword:'Password is not valid'
              })
          }
          break;

          case 'email':
          if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
              valid =true;
              this.setState({
              emailid:''
              })
          } else {
              valid = false;
              this.setState({
                emailid:'email id is invalid'
              })
          }
          break;
  }
  this.setState({
      [e.target.name]:{value:e.target.value,valid:valid},
  })
}
handleSave()
{
  if(this.state.uname.valid && this.state.password.valid && this.state.email.valid)
  {

   if (!window.indexedDB) {
      this.setState({
        alert_message:"Index Db Issue Check Your Browser and index db version.!",
        alert_state_danger:true
      })
  }
  else
  {
    request = window.indexedDB.open("kotmaster", 3);
 
    request.onerror=(e)=>{
      console.log("error",e);
    }

    request.onsuccess=(e)=>{
        db=request.result;
        tx=db.transaction("FormDataStore",'readwrite');
        store=tx.objectStore("FormDataStore");
        index=store.index("Formtext");

        db.onerror=(e)=>{
          console.log("error",e);
        }
     
        var myAutoIncrement = store.autoIncrement;       
        store.add({"qId":myAutoIncrement,"username":this.state.uname.value,"password":this.state.password.value,"email":this.state.email.value});

        let q1=store.getAll();
        q1.onsuccess=(e)=>
        {
          this.setState({
            localData:e.target.result
          })
        }
        tx.oncomplete=()=>{
          db.close();
        }
    }

    request.onupgradeneeded=(e)=>{
      let db=request.result,
          store=db.createObjectStore("FormDataStore",{autoIncrement:true});
          index=store.createIndex("Formtext","Formtext",{unique:false});
    }
  }
}
else
{
  this.setState({
    alert_message:"Please Provide Valid Details.!",
    alert_state_warning:true
  })
}
}

render() 
{
  return (
    <div className="outerGrid">
    <SweetAlert 
        danger title={this.state.alert_message} 
        show={this.state.alert_state_danger} 
        onConfirm={()=>{
            this.setState({
                alert_state_danger:false
            })
        }}
    />
    <SweetAlert 
        warning title={this.state.alert_message} 
        show={this.state.alert_state_warning} 
        onConfirm={()=>{
            this.setState({
                alert_state_warning:false
            })
        }}
    />
    <SweetAlert 
        success title={this.state.alert_message} 
        show={this.state.alert_state_success} 
        onConfirm={()=>{
            this.setState({
                alert_state_success:false
            })
        }}
    />
        <Row>
            <h1 style={{color:"white"}}>Home Page</h1>
        </Row>
        <Row>
            <Col>
                <div className="panelOuterDiv">
                    <div className="panelDiv">
                        <p  style={{marginLeft:"25%",width:"100%"}}>Register Page</p>
                        <input type="text" 
                            placeholder="Username" 
                            name="uname" 
                            value={this.state.uname.value} 
                            onChange={this.handleChange.bind(this)}
                            autoFocus={true}
                        /><br/>
                        <span id="username" 
                            style={{color:'red',fontSize:'12px'}}
                        >
                            {this.state.username}
                        </span>
                        <br/>

                            <input type="text" 
                            placeholder="Email Id" 
                            name="email" 
                            value={this.state.email.value} 
                            onChange={this.handleChange.bind(this)}
                            autoFocus={true}
                        /><br/>
                        <span id="email" 
                            style={{color:'red',fontSize:'12px'}}
                        >
                            {this.state.emailid}
                        </span>
                        <br/>
                        <input type="password" 
                            placeholder="Password" 
                            name="password" 
                            value={this.state.password.value} 
                            onChange={this.handleChange.bind(this)} 
                        />
                        <br/>
                        <span id="pword" 
                            style={{color:'red',fontSize:'12px'}}
                        >
                            {this.state.pword}
                        </span>                                    
                        <br/>
                        <button className="loginButton" onClick={this.handleSave.bind(this)}>
                            <span>add</span>
                        </button>   
                      
                    </div>
                    <div >
                          <Table data={this.state.localData}/>

                      </div>
                  
                </div>
             
            </Col>
        </Row>
</div>
  );
}
}

export default App;
