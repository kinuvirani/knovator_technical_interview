import React, {useState} from 'react';
import { Form, Input, Button } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {userSignin} from '../../Actions/user.action';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

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

  const handleLogin = () => {
    let data = {
      email: email,
      password: pass
    };
    props.userSignin(data).then(() => {
      resetData();
      props.history.push('/post');
    });
  };

  const resetData = () => {
    setEmail('');
    setPass('');
  };

  return(
    <div style={{padding:'160px 200px'}}>
      <h1 style={{textAlign:'center'}}>User Login</h1>
      <Form {...layout} name="control-hooks">

        <Form.Item label="Email">
          <Input size="large" style={inputStyle} value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password size="large" style={inputStyle} value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="input password" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={() => {handleLogin()}}>
            Login
          </Button>

          <Button htmlType="button" onClick={() => {resetData()}}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

const mapStateToProps = (state) => {
  return({
    user: state.user.data
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({userSignin}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);