import React, { useEffect, useState } from 'react';
import { Modal, Input, Row, Col, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const initialValue = {
    name: '',
    gender: 'male',
    email: '',
}

const NewUserModalPage: React.FC = ({ show, handler }) => {
    const [user, setUser] = useState(initialValue)
    const { name, gender, email } = user

    const handleOk = () => {
        console.log(user)
        axios.post('https://reqres.in/api/users/add', user)
        .then(response => console.log("user"))
        handler(false);
    };

    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (e) => {
        if (e.target) {
            setUser({ ...user, [e.target.name]: e.target.value })
        } else {
            setUser({ ...user, gender: e})
        }
    }

    return (
        <Modal title="New User" open={show} onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Name" id="name" name="name" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Gender:
                </Col>
                <Col span={16} >
                    <Select defaultValue="Male"  style={{ width: '100%' }} id="gender" name="gender" onChange={(e) => onValueChange(e)}>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                    </Select>
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Email:
                </Col>
                <Col span={16} >
                    <Input placeholder="Email" id="email" name="email" onChange={(e) => onValueChange(e)}/>
                </Col>
            </Row>
        </Modal>
    );
};

export default NewUserModalPage;

