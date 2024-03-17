import React, { useEffect, useState } from 'react';
import { Modal, Input, Row, Col, Select } from 'antd';
import axios from "axios";

const { Option } = Select;

const initialValue = {
    linkcategoryname: '',
    detail: '',
}

const EditLinkCategoryModalPage: React.FC = ({ show, handler, linkCategoryData }) => {
    const [linkCategory, setLinkCategory] = useState(initialValue)
    const { linkcategoryname, detail } = linkCategory
    
    const handleOk = () => {
        axios.post('https://reqres.in/api/linkcategorys/edit', linkCategory)
        .then(response => console.log("linkCategory edited"))
        handler(false);
    };

    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (value, field) => {
        setLinkCategory({
            ...linkCategory,
            [field]: value
        })
    }

    useEffect(() => {
        setLinkCategory(linkCategoryData)
    }, [linkCategoryData])

    return (
        <Modal title="Edit Link Category" open={show}  onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Link Category Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Link Category Name" id="linkcategoryname" name="linkcategoryname" value={linkCategory.linkcategoryname} onChange={(e) => onValueChange(e.target.value, 'linkcategoryname')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Detail:
                </Col>
                <Col span={16} >
                    <Input placeholder="Detail" id="detail" name="detail" value={linkCategory.detail} onChange={(e) => onValueChange(e.target.value, 'detail')}/>
                </Col>
            </Row>
        </Modal>
    );
};

export default EditLinkCategoryModalPage;

