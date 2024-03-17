import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Space, Button, Input, Modal } from 'antd';
import { TableProps } from "antd/lib/table";
import axios from "axios";
import NewUserModal from './newusermodal';
import EditUserModal from './editusermodal';

const { confirm } = Modal;
const { Search } = Input;

const UserManagePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState({}); 
    const [filterTable, setFilterTable] = useState();
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [userData, setUserData] = useState({});
   
    const columns: ColumnsType<DataType> = [
        {   
            key: "name", 
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => (a.name.first > b.name.first ? 1 : -1),
            render: (name) => `${name.first} ${name.last}`,
            width: '20%',
        },
        {
            key: "gender", 
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                { text: "Male", value: "male" },
                { text: "Female", value: "female" }
            ],
            width: "20%"
        },
        {
            key: "email", 
            title: 'Email',
            dataIndex: 'email',
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
        setUserList(data.results);
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
        const filterTable = userList.filter(o =>
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
        setUserData(val);
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
            <Card title="User Management" style={{ width: 1150 }}>
                <Row style={{ marginBottom : 10}}>
                    <Col span={8}>
                        <Button type="primary" onClick={() => setModal(!modal)}>
                            New User
                        </Button>
                    </Col>
                    <Col span={8} offset={8}>
                        <Search
                            placeholder="User"
                            allowClear
                            enterButton="Search"
                            size="default"
                            onSearch={(value) => search(value)}
                        />
                    </Col>
                </Row>
                <Table
                     columns={columns}
                     dataSource={filterTable == null ? userList: filterTable}
                     loading={isLoading}
                     onChange={handleTableChange}
                     pagination={pagination}
                     rowKey="email"
                />
                <NewUserModal show={modal} handler={(value) => setModal(value)} />
                <EditUserModal show={editModal} handler={(value) => setEditModal(value)} userData={userData}/>
            </Card>
        </Space>
    );
};

export default UserManagePage;
