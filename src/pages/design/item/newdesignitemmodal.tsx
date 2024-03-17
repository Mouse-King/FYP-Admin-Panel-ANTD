import React, { useEffect, useState } from 'react';
import { Modal, Input, Row, Col, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const initialValue = {
    designtitle: '',
    type: '',
    iconcolor: '',
    socialiconcolor: '',
    sociallinkcolor1: '',
    sociallinkcolor2: '',
}

const NewDesignItemModalPage: React.FC = ({ show, handler }) => {
    const [designItem, setDesignItem] = useState(initialValue)
    const { designtitle, type, iconcolor, socialiconcolor, sociallinkcolor1, sociallinkcolor2  } = designItem
    
    const handleOk = () => {
        axios.post('https://reqres.in/api/design/add', designItem)
        .then(response => console.log("new designItem added"))
        handler(false);
    };
    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (e) => {
        setDesignItem({ ...designItem, [e.target.name]: e.target.value })
    }

    return (
        <Modal title="New Design Item" open={show} onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Design Title:
                </Col>
                <Col span={16} >
                    <Input placeholder="Design Title" id="designtitle" name="designtitle" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Type:
                </Col>
                <Col span={16} >
                    <Input placeholder="Type" id="type" name="type" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Icon:
                </Col>
                <Col span={16} >
                    <Input placeholder="Icon Color" id="iconcolor" name="iconcolor" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Social Icon Color:
                </Col>
                <Col span={16} >
                    <Input placeholder="Social Icon Color" id="socialiconcolor" name="socialiconcolor" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Social Icon Color:
                </Col>
                <Col span={16} >
                    <Input placeholder="Social Link Color1" id="sociallinkcolor1" name="sociallinkcolor1" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Social Icon Color:
                </Col>
                <Col span={16} >
                    <Input placeholder="Social Link Color2" id="sociallinkcolor2" name="sociallinkcolor2" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
        </Modal>
    );
};

export default NewDesignItemModalPage;

