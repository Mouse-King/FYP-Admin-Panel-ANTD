import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Space, Button, Table, Input, Modal } from 'antd';
import { TableProps  } from 'antd/lib/table';
import axios from 'axios';
import NewLinkItemModal from './newlinkitemmodal';
import EditLinkItemModal from './editlinkitemmodal';

const { confirm } = Modal;
const { Search } = Input;

const LinkItemManagePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [linkItemList, setLinkItemList] = useState([]);
    const [pagination, setPagination] = useState({});
    const [filterTable, setFilterTable] = useState();
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [linkItemData, setLinkItemData] = useState({});
   
    const columns: ColumnsType<DataType> = [
        {
            key: 'linkname',
            title: 'Link Name',
            dataIndex: 'linkname',
        },
        {
            key: 'url',
            title: 'Url',
            dataIndex: 'url',
        },
        {
            key: 'icontype',
            title: 'Icon Type',
            dataIndex: 'icontype',
        },
        {
            key: 'price',
            title: 'Price',
            dataIndex: 'price',
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
        setLinkItemList(data.results);
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
        const filterTable = linkItemList.filter(o =>
            Object.keys(o).some(k =>
              String(o[k])
                .toLowerCase()
                .includes(value.toLowerCase())
            )
        );
        setFilterTable(filterTable);
    }

    const showEditModal  = (id, val, key) => {
        setLinkItemData(val);
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
            axios.post('https://reqres.in/api/linkitems/delete')
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
            <Card title="Link Item Management" style={{ width: 1150 }}>
                <Row style={{ marginBottom : 10}}>
                    <Col span={8}>
                        <Button type="primary" onClick={() => setModal(!modal)}>
                            New Link Item
                        </Button>
                    </Col>
                    <Col span={8} offset={8}>
                        <Search
                            placeholder="Link Item"
                            allowClear
                            enterButton="Search"
                            size="default"
                            onSearch={(value) => search(value)}
                        />
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={filterTable == null ? linkItemList: filterTable}
                    loading={isLoading}
                    onChange={handleTableChange}
                    pagination={pagination}
                    rowKey="email"
                />
                <NewLinkItemModal show={modal} handler={(value) => setModal(value)} />
                <EditLinkItemModal show={editModal} handler={(value) => setEditModal(value)} linkItemData={linkItemData}/>
            </Card>
        </Space>
    );
};

export default LinkItemManagePage;
