import React, { useEffect, useState } from 'react';
import { Modal, Input, Row, Col, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const initialValue = {
    name: '',
    gender: 'male',
    email: '',
}

const EditUserModalPage: React.FC = ({ show, handler, userData }) => {
    const [user, setUser] = useState(initialValue)
    const { name, gender, email } = user
    
    const handleOk = () => {
        console.log(user)
        axios.post('https://reqres.in/api/users/edit', user)
        .then(response => console.log("user"))
        handler(false);
    };

    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (value, field) => {
        setUser({
            ...user,
            [field]: value
        })
    }

    useEffect(() => {
        setUser(userData)
    }, [userData])

    return (
        <Modal title="Edit User" open={show}  onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Name" id="name" name="name" value={user.name} onChange={(e) => onValueChange(e.target.value, 'name')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Gender:
                </Col>
                <Col span={16} >
                    <Select defaultValue="Male"  style={{ width: '100%' }} id="gender" value={user.gender} name="gender" onChange={(value) => onValueChange(value, 'gender')}>
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
                    <Input placeholder="Email" id="email" name="email" value={user.email} onChange={(e) => onValueChange(e.target.value, 'email')}/>
                </Col>
            </Row>
        </Modal>
    );
};

export default EditUserModalPage;

