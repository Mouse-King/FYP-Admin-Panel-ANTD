import React, { useEffect, useState } from 'react';
import { Modal, Input, Row, Col, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const initialValue = {
    linkcategoryname: '',
    detail: '',
}

const NewLinkCategoryModalPage: React.FC = ({ show, handler }) => {
    const [linkCategory, setLinkCategory] = useState(initialValue)
    const { linkcategoryname, detail } = linkCategory
    
    const handleOk = () => {
        axios.post('https://reqres.in/api/link/add', linkCategory)
        .then(response => console.log("new linkCategory added"))
        handler(false);
    };
    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (e) => {
        setLinkCategory({ ...linkCategory, [e.target.name]: e.target.value })
    }

    return (
        <Modal title="New Link Category" open={show} onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Link Category Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Link Category Name" id="linkcategoryname" name="linkcategoryname" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Detail:
                </Col>
                <Col span={16} >
                    <Input placeholder="Detail" id="detail" name="detail" onChange={(e) => onValueChange(e)} />
                </Col>
            </Row>
        </Modal>
    );
};

export default NewLinkCategoryModalPage;

