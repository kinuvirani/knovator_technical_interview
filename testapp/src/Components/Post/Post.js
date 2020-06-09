import React, {useEffect, useState} from 'react';
import {Table, Button, Modal, Input, Form, Switch, Checkbox} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {withRouter} from 'react-router-dom';

import {addPost} from '../../Actions/post.action';

const Post = (props) => {

  const plainOptions = ['Tag1', 'Tag2', 'Tag3'];
  const defaultCheckedList = ['Tag1', 'Tag2'];

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState(true);
  const [checklist, setChecklist] = useState(defaultCheckedList);

  const dataSource = [];

  if (props.post && props.post.length>0) {
    props.post.map((d,i) => {
      dataSource.push( {
        key: i,
        title: d.title,
        body: d.body,
        status: <Switch checked={status} onChange={() => {setStatus(!status)}} />
      });
    })
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Active/Inactive',
      dataIndex: 'status',
      key: 'status',
    }
  ];

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      props.history.push('/login');
    }
  });

  const handleLogout = () => {
    props.userSignout();
    props.history.push('/login');
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleChange = checkedList => {
    console.log('Checklist=====', checkedList)
  };

  const addPostData = () => {
    let data = {
      title: title,
      body: body
    };
    props.addPost(data);
    setTitle('');
    setBody('');
    setVisible(false);
  };
  const checkList = [];
  const onChange = (e) => {
    let item = e.target.value;
    if (e.target.checked) {
      checkList.push(item);
    } else {
      checkList.splice(checkList.indexOf(item), 1);
    }
    console.log(`checked = ${e.target.checked}`);
    console.log(`checked item= ${e.target.value}`);
    console.log(`checked lists= ${checkList}`);
  };

  return (
    <div>
      Welcome User
      <Button type="primary" htmlType="submit" style = {{marginLeft:'90%'}} onClick={() => {handleLogout()}}>
        Logout
      </Button>
      <Button type="primary" onClick={() => showModal()}>
        Add Post
      </Button>
      <Modal
        title="Add New Post"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form.Item label="Post Title">
          <Input size="large" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="post title"/>
        </Form.Item>

        <Form.Item label="Post Body">
          <Input.TextArea size="large" value={body} onChange={(e) => setBody(e.target.value)} placeholder="post description" />
        </Form.Item>

        <Button type="primary" htmlType="submit" onClick={() => {addPostData()}}>
          Add Post
        </Button>
        <Checkbox value='checkbox1' onChange={(e) => onChange(e)}>Checkbox1</Checkbox>
        <Checkbox value='checkbox2' onChange={(e) => onChange(e)}>Checkbox2</Checkbox>
        <Checkbox value='checkbox3' onChange={(e) => onChange(e)}>Checkbox3</Checkbox>
        <Checkbox value='checkbox4' onChange={(e) => onChange(e)}>Checkbox4</Checkbox>
        {/*<Form.Item label="Post Tags">*/}
        {/*  <Checkbox.Group*/}
        {/*    options={plainOptions}*/}
        {/*    value={checklist}*/}
        {/*    onChange={(e) => handleChange(e)}*/}
        {/*  />*/}
        {/*</Form.Item>*/}

      </Modal>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
};

const mapStateToProps = (state) => {
  return({
    post: state.post.posts
  })
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addPost}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));