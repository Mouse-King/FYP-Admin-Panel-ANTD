import React, { useEffect, useState } from 'react';
import { Modal, Input, Row, Col, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const initialValue = {
    designcategoryname: '',
    detail: '',
}

const NewDesignCategoryModalPage: React.FC = ({ show, handler }) => {
    const [designCategory, setDesignCategory] = useState(initialValue)
    const { designcategoryname, detail } = designCategory
    
    const handleOk = () => {
        axios.post('https://reqres.in/api/design/add', designCategory)
        .then(response => console.log("new designCategory added"))
        handler(false);
    };
    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (e) => {
        setDesignCategory({ ...designCategory, [e.target.name]: e.target.value })
    }

    return (
        <Modal title="New Design Category" open={show} onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Design Category Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Design Category Name" id="designcategoryname" name="designcategoryname" onChange={(e) => onValueChange(e)} />
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

export default NewDesignCategoryModalPage;

