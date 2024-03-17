import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Space, Button, Input, Modal } from 'antd';
import { TableProps } from "antd/lib/table";
import axios from "axios";
import NewDesignCategoryModal from './newdesigncategorymodal';
import EditDesignCategoryModal from './editdesigncategorymodal';

const { confirm } = Modal;
const { Search } = Input;

const DesignCategoryManagePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [designCategoryList, setDesignCategoryList] = useState([]);
    const [pagination, setPagination] = useState({}); 
    const [filterTable, setFilterTable] = useState();
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [designCategoryData, setDesignCategoryData] = useState({});
   
    const columns: ColumnsType<DataType> = [
        {   
            key: 'designcategoryname',
            title: 'Design Category Name',
            dataIndex: 'designcategoryname',
        },
        {   
            key: 'detail',
            title: 'Detail',
            dataIndex: 'detail',
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
        setDesignCategoryList(data.results);
        setIsLoading(false);
    };

    useEffect(() => {
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
        const filterTable = designCategoryList.filter(o =>
            Object.keys(o).some(k =>
              String(o[k])
                .toLowerCase()
                .includes(value.toLowerCase())
            )
        );
        setFilterTable(filterTable);
    }

    const showEditModal  = (id, val, key) => {
        console.log(val)
        setDesignCategoryData(val);
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
            axios.post('https://reqres.in/api/users/delete')
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
            <Card title="Design Category Management" style={{ width: 1150 }}>
                <Row style={{ marginBottom : 10}}>
                    <Col span={8}>
                        <Button type="primary" onClick={() => setModal(!modal)}>
                            New Design Category
                        </Button>
                    </Col>
                    <Col span={8} offset={8}>
                        <Search
                            placeholder="Design Category"
                            allowClear
                            enterButton="Search"
                            size="default"
                            onSearch={(value) => search(value)}
                        />
                    </Col>
                </Row>
                <Table
                     columns={columns}
                     dataSource={filterTable == null ? designCategoryList: filterTable}
                     loading={isLoading}
                     onChange={handleTableChange}
                     pagination={pagination}
                     rowKey="email"
                />
                <NewDesignCategoryModal show={modal} handler={(value) => setModal(value)} />
                <EditDesignCategoryModal show={editModal} handler={(value) => setEditModal(value)} designCategoryData={designCategoryData}/>
            </Card>
        </Space>
    );
};

export default DesignCategoryManagePage;
