import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Space, Button, Table, Input, Modal } from 'antd';
import { TableProps  } from 'antd/lib/table';
import axios from 'axios';
import NewDesignItemModal from './newdesignitemmodal';
import EditDesignItemModal from './editdesignitemmodal';

const { confirm } = Modal;
const { Search } = Input;


const DesignItemManagePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [designItemList, setDesignItemList] = useState([]);
    const [pagination, setPagination] = useState({});
    const [filterTable, setFilterTable] = useState();
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [designItemData, setDesignItemData] = useState({});
   
    const columns: ColumnsType<DataType> = [
        {
            key: 'designtitle',
            title: 'Design Title',
            dataIndex: 'designtitle',
        },
        {
            key: 'type',
            title: 'Type',
            dataIndex: 'type',
        },
        {
            key: 'iconcolor',
            title: 'Icon Color',
            dataIndex: 'iconcolor',
        },
        {
            key: 'sociallinkcolor1',
            title: 'Social Link Color1',
            dataIndex: 'sociallinkcolor1',
        },
        {
            key: 'sociallinkcolor2',
            title: 'Social Link Color2',
            dataIndex: 'sociallinkcolor2',
        },
        {
            key: "action", 
            title: 'Action',
            dataIndex: 'action',
            render : (id, val, key) => {
                return (
                    <Row>
                        <Button type="primary" onClick={() => showEditModal(id, val, key)}>Edit</Button>
                        <Button type="primary" danger onClick={() => showDeleteConfirm()}>Delete</Button>                               
                    </Row>
                )
            },
        },
    ];
   
    const customFetch = async (params = {}) => {
        setIsLoading(true);
        const { data } = await axios.get("https://randomuser.me/api", {
            params : {
                results: 100,
                type: "json"
            }
        });
        setDesignItemList(data.results);
        setIsLoading(false);
    };

    useEffect(()=> {
        customFetch({});
    }, []);

    const handleTableChange: TableProps<any>["onChange"] = (
        pagination,
        filters,
        sorter
      ) => {
        setPagination(pagination);
        customFetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters
        });
    };

    const search = (value) => {
        const filterTable = designItemList.filter(o =>
            Object.keys(o).some(k =>
              String(o[k])
                .toLowerCase()
                .includes(value.toLowerCase())
            )
        );
        setFilterTable(filterTable);
    }

    const showEditModal  = (id, val, key) => {
        setDesignItemData(val);
        setEditModal(true);
    }

    const showDeleteConfirm = () => {
        console.log("Delete");
        confirm({
          title: "Are you sure want to delete this data?",
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          onOk() {
            axios.post('https://reqres.in/api/designitems/delete')
            .then(response => console.log("user"))
            console.log("Data Has Been Deleted Successfully!");
          },
          onCancel() {
            console.log("Data Deletion Cancelled");
          }
        });
    };

    return (
        <Space direction="vertical">
            <Card title="Design Item Management" style={{ width: 1150 }}>
                <Row style={{ marginBottom : 10}}>
                    <Col span={8}>
                        <Button type="primary" onClick={() => setModal(!modal)}>
                            New Design Item
                        </Button>
                    </Col>
                    <Col span={8} offset={8}>
                        <Search
                            placeholder="Design Item"
                            allowClear
                            enterButton="Search"
                            size="default"
                            onSearch={(value) => search(value)}
                        />
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={filterTable == null ? designItemList: filterTable}
                    loading={isLoading}
                    onChange={handleTableChange}
                    pagination={pagination}
                    rowKey="email"
                />
                <NewDesignItemModal show={modal} handler={(value) => setModal(value)} />
                <EditDesignItemModal show={editModal} handler={(value) => setEditModal(value)} designItemData={designItemData}/>
            </Card>
        </Space>
    );
};

export default DesignItemManagePage;
