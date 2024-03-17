import React, { useEffect, useState } from 'react';
import { Modal, Input, Row, Col, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const initialValue = {
    linkname: '',
    url: '',
    icontype: '',
    price: '',
}

const NewLinkItemModalPage: React.FC = ({ show, handler }) => {
    const [linkItem, setLinkItem] = useState(initialValue)
    const { linkname, url, icontype, price } = linkItem
    
    const handleOk = () => {
        axios.post('https://reqres.in/api/link/add', linkItem)
        .then(response => console.log("new linkItem added"))
        handler(false);
    };
    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (e) => {
        setLinkItem({ ...linkItem, [e.target.name]: e.target.value })
    }

    return (
        <Modal title="New Link Item" open={show} onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Link Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Link Name" id="linkname" name="linkname" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    URL:
                </Col>
                <Col span={16} >
                    <Input placeholder="URL" id="url" name="url" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Icon:
                </Col>
                <Col span={16} >
                    <Input placeholder="Icon Type" id="icontype" name="icontype" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Price:
                </Col>
                <Col span={16} >
                    <Input placeholder="Price" id="price" name="price" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
        </Modal>
    );
};

export default NewLinkItemModalPage;

