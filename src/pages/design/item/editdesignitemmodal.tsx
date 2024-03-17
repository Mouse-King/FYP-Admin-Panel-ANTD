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

const EditDesignItemModalPage: React.FC = ({ show, handler, designItemData }) => {
    const [designItem, setDesignItem] = useState(initialValue)
    const { designtitle, type, iconcolor, socialiconcolor, sociallinkcolor1, sociallinkcolor2 } = designItem
    
    const handleOk = () => {
        axios.post('https://reqres.in/api/designitems/edit', designItem)
        .then(response => console.log("designItem edited"))
        handler(false);
    };

    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (value, field) => {
        setDesignItem({
            ...designItem,
            [field]: value
        })
    }

    useEffect(() => {
        setDesignItem(designItemData)
    }, [designItemData])

    return (
        <Modal title="Edit Design Item" open={show}  onOk={handleOk} onCancel={handleCancel} >
           <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Design Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Design Title" id="designtitle" name="designtitle" value={designItem.designtitle} onChange={(e) => onValueChange(e.target.value, 'designtitle')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Type:
                </Col>
                <Col span={16} >
                    <Input placeholder="Type" id="type" name="type" value={designItem.type} onChange={(e) => onValueChange(e.target.value, 'type')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Icon:
                </Col>
                <Col span={16} >
                    <Input placeholder="Icon Color" id="iconcolor" name="iconcolor" value={designItem.iconcolor} onChange={(e) => onValueChange(e.target.value, 'iconcolor')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Social Icon Color:
                </Col>
                <Col span={16} >
                    <Input placeholder="Social Icon Color" id="socialiconcolor" name="socialiconcolor" value={designItem.socialiconcolor} onChange={(e) => onValueChange(e.target.value, 'socialiconcolor')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Social Icon Color:
                </Col>
                <Col span={16} >
                    <Input placeholder="Social Link Color1" id="sociallinkcolor1" name="sociallinkcolor1" value={designItem.sociallinkcolor1} onChange={(e) => onValueChange(e.target.value, 'sociallinkcolor1')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Social Icon Color:
                </Col>
                <Col span={16} >
                    <Input placeholder="Social Link Color2" id="sociallinkcolor2" name="sociallinkcolor2" value={designItem.sociallinkcolor2} onChange={(e) => onValueChange(e.target.value, 'sociallinkcolor2')} />
                </Col>
            </Row>
        </Modal>
    );
};

export default EditDesignItemModalPage;

