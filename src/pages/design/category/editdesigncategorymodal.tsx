import React, { useEffect, useState } from 'react';
import { Modal, Input, Row, Col, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const initialValue = {
    designcategoryname: '',
    detail: '',
}

const EditDesignCategoryModalPage: React.FC = ({ show, handler, designCategoryData }) => {
    const [ designCategory, setDesignCategory] = useState(initialValue)
    const { designcategoryname, detail } = designCategory
    
    const handleOk = () => {
        axios.post('https://reqres.in/api/designcategorys/edit', designCategory)
        .then(response => console.log("designCategory edited"))
        handler(false);
    };

    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (value, field) => {
        setDesignCategory({
            ...designCategory,
            [field]: value
        })
    }

    useEffect(() => {
        setDesignCategory(designCategoryData)
    }, [designCategoryData])

    return (
        <Modal title="Edit Design Category" open={show}  onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Design Category Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Design Category Name" id="designcategoryname" name="designcategoryname" value={designCategory.designcategoryname} onChange={(e) => onValueChange(e.target.value, 'designcategoryname')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Detail:
                </Col>
                <Col span={16} >
                    <Input placeholder="Detail" id="detail" name="detail" value={designCategory.detail} onChange={(e) => onValueChange(e.target.value, 'detail')}/>
                </Col>
            </Row>
        </Modal>
    );
};

export default EditDesignCategoryModalPage;

