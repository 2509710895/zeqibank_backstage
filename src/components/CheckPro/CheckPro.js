import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Table, Input, Button, Space, message as msg } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import './CheckPro.css'

export default function CheckPro() {

    const [tableData, setTableData] = useState([])
    //console.log('render', tableData);
    useEffect(() => {
        //console.log('开始请求');
        axios.get('/api/product/list', {
            headers: {
                "token": sessionStorage.getItem('token') ? sessionStorage.getItem('token') : " "
            }
        }).then(res => {
            //console.log(res);
            if (res.data.code === 1200) {
                const { data } = res.data
                data.forEach(element => {
                    element.key = element.productId
                })
                setTableData(data.reverse());
            } else {
                msg.error(res.data.message + "或重新登录")
            }
        }).catch(err => {
            //console.log(err);
            msg.error("服务器繁忙，请稍后重试")
        })
    }, [])

    let [searchText, setSearchText] = useState('')
    let [searchedColumn, setSearchedColumn] = useState('')
    let searchInput = {}
    const getColumnSearchProps = (title, dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`搜索${title}`}
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
            key: 'productName',
            // onClick: click
            ...getColumnSearchProps('产品名称', 'productName'),
            render: (text, record) => {
                const { key } = record
                //console.log('key=', key);
                return <Link to={'/checkpro/detail/' + key}>{text}</Link>
            },//一定要写在最后
        },
        {
            title: '预计收益',
            dataIndex: 'income',
            ...getColumnSearchProps('预计收益', 'income'),
            render: text => (text * 100).toFixed(3) + '%'
        },
        {
            title: '生效日期',
            dataIndex: 'effectTime',
            ...getColumnSearchProps('生效日期', 'effectTime'),
        },
        {
            title: '存款期限/天',
            dataIndex: 'period',
            // filters: [
            //     {
            //         text: '通过',
            //         value: '通过',
            //     },
            //     {
            //         text: '拒绝',
            //         value: '拒绝',
            //     },
            // ],
            // onFilter: (value, record) => record.result === value
            render: text => text + '天'
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
                columns={columns} dataSource={tableData} onChange={onChange}
                pagination={{ defaultCurrent: 1, total: tableData.length, }} />
        </div>
    )
}
