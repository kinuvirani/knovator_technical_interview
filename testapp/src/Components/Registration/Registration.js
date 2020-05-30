import React, {useState} from 'react';
import { Form, Input, Button } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {withRouter} from 'react-router-dom';

import {userSignup} from '../../Actions/user.action';

import './Registration.css'

const Registration = (props) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [contact, setContact] = useState('');

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const inputStyle= {
    width: 400
  };

  const handleRegistration = () => {
    let data = {
      firstname: fname,
      lastname: lname,
      email: email,
      contact_no: contact,
      password: pass
    };
    props.userSignup(data).then(() => {
     resetData();
      goToSignin();
    });
  };

  const goToSignin = () => {
    props.history.push('/login');
  };

  const resetData = () => {
    setFname('');
    setLname('');
    setEmail('');
    setContact('');
    setPass('');
  };

  return(
    <div style={{padding:'160px 200px'}}>
      <h1 style={{textAlign:'center'}}>User Registration</h1>
      <Form {...layout} name="control-hooks">
        <Form.Item label="Firstname">
          <Input size="large" style={inputStyle} value={fname} onChange={(e)=>{setFname(e.target.value)}} placeholder="Enter your firstname"/>
        </Form.Item>

        <Form.Item label="Lastname">
          <Input size="large" style={inputStyle} value={lname} onChange={(e)=>{setLname(e.target.value)}} placeholder="Enter your lastname"/>
        </Form.Item>

        <Form.Item label="Email">
          <Input size="large" style={inputStyle} value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password size="large" style={inputStyle} value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="input password" />
        </Form.Item>

        <Form.Item label="Conmtact No">
          <Input size="large" maxLength={10} style={inputStyle} value={contact} onChange={(e)=>{setContact(e.target.value)}} placeholder="Enter your contact number"/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={() => {handleRegistration()}}>
            Register
          </Button>

          <Button htmlType="button" onClick={() => {resetData()}}>
            Reset
          </Button>
          <p>Alredy registered? <a onClick={() => {goToSignin()}}>signin</a></p>
        </Form.Item>
      </Form>
    </div>
  )
};

const mapStateToProps = (state) => {
  return({
    user: state.user.msg
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({userSignup}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));