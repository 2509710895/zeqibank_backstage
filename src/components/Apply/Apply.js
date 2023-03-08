import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Table, Input, Button, Space, message as msg } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import './Apply.css'
import axios from 'axios';

export default function Apply() {

    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        axios.get('/api/filterRecord/getlist', {
            headers: {
                'token': sessionStorage.token
            }
        }).then(res => {
            //console.log(res);
            const { code, message, data } = res.data
            if (code === 1200) {
                data.forEach((element, index) => {
                    element.key = element.userid + index + ''
                });
                setFilterData(data.reverse())
            } else {
                msg.error(message)
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后再试')
        })
    }, [])


    let [searchText, setSearchText] = useState('')
    let [searchedColumn, setSearchedColumn] = useState('')
    let searchInput = {}
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        搜索
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        重置
                    </Button>
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        过滤
                    </Button> */}
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')
    };

    const columns = [
        {
            title: '产品名称',
            dataIndex: 'productName',
            ...getColumnSearchProps('productName'),
            // render: text => <Link to='/index/detail'>{text}</Link>,
        },
        {
            title: '申请人',
            dataIndex: 'username',
            ...getColumnSearchProps('username'),
        },
        {
            title: '申请日期',
            dataIndex: 'applyTime',
            ...getColumnSearchProps('applyTime'),
        },
        {
            title: '申请结果',
            dataIndex: 'result',
            filters: [
                {
                    text: '通过',
                    value: 1,
                },
                {
                    text: '拒绝',
                    value: 0,
                },
            ],
            onFilter: (value, record) => record.result === value,
            render: text => text ? "通过" : "拒绝"
        },
        {
            title: '原因',
            dataIndex: 'description',
            // render: text => <Button type='primary'>{text}</Button>
            filters: [
                {
                    text: '通过筛选',
                    value: '通过筛选',
                },
                {
                    text: '存在逾期记录',
                    value: '存在逾期记录',
                },
                {
                    text: '无业/失业人员',
                    value: '无业/失业人员',
                },
                {
                    text: '失信人员',
                    value: '失信人员',
                },
                {
                    text: '未满规定年龄',
                    value: '未满规定年龄',
                },
            ],
            onFilter: (value, record) => record.reason === value
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        //console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Table
                locale={{
                    cancelSort: '点击取消排序',
                    triggerAsc: '点击升序',
                    triggerDesc: '点击降序'
                }}
                columns={columns} dataSource={filterData} onChange={onChange}
                pagination={{ defaultCurrent: 1, total: filterData.length }} />
        </div>
    )
}
