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

const EditLinkItemModalPage: React.FC = ({ show, handler, linkItemData }) => {
    const [linkItem, setLinkItem] = useState(initialValue)
    const { linkname, url, icontype, price } = linkItem
    
    const handleOk = () => {
        axios.post('https://reqres.in/api/linkitems/edit', linkItem)
        .then(response => console.log("linkItem edited"))
        handler(false);
    };

    const handleCancel = () => {
        handler(false);
    };

    const onValueChange = (value, field) => {
        setLinkItem({
            ...linkItem,
            [field]: value
        })
    }

    useEffect(() => {
        setLinkItem(linkItemData)
    }, [linkItemData])

    return (
        <Modal title="Edit Link Item" open={show}  onOk={handleOk} onCancel={handleCancel} >
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Link Name:
                </Col>
                <Col span={16} >
                    <Input placeholder="Link Name" id="linkname" name="linkname" value={linkItem.linkname} onChange={(e) => onValueChange(e.target.value, 'linkname')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    URL:
                </Col>
                <Col span={16} >
                    <Input placeholder="URL" id="url" name="url" value={linkItem.url} onChange={(e) => onValueChange(e.target.value, 'url')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Icon Type:
                </Col>
                <Col span={16} >
                    <Input placeholder="Icon Type" id="icontype" name="icontype" value={linkItem.icontype} onChange={(e) => onValueChange(e.target.value, 'linktype')} />
                </Col>
            </Row>
            <Row style={{ marginBottom : 10, marginLeft: 30}}>
                <Col span={8}>
                    Price:
                </Col>
                <Col span={16} >
                    <Input placeholder="Price" id="price" name="price" value={linkItem.price} onChange={(e) => onValueChange(e.target.value, 'price')}/>
                </Col>
            </Row>
        </Modal>
    );
};

export default EditLinkItemModalPage;

