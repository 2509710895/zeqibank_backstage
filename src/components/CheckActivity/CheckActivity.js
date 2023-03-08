import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Table, Input, Button, Space, message as msg } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';


import './CheckActivity.css'

export default function CheckActivity() {

    const [actData, setActData] = useState([])

    useEffect(() => {
        //console.log('开始查询秒杀活动', sessionStorage.getItem('token'));
        axios.get('/api/activity/list', {
            headers: {
                "token": sessionStorage.getItem('token')
            }
        }).then(res => {
            //console.log('res=', res);
            const { code, data } = res.data
            if (code === 1200) {
                data.forEach((obj, index) => {
                    obj['key'] = obj.activityId
                    obj['buyed'] = obj.setTotal - obj.quantity + '/' + obj.setTotal
                })
                setActData(data.reverse())
            } else {
                msg.error('获取秒杀活动失败,请重新登录')
            }
        }).catch(err => {
            //console.log(err);
            msg.error('网络繁忙，请稍后重试')
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
            // onClick: click
            ...getColumnSearchProps('产品名称', 'productName'),
            render: (text, record) => {
                const { key } = record
                // //console.log('秒杀活动', record);
                return <Link to={'/checkactivity/detail/' + key}>{text}</Link>
            },
        },
        {
            title: '秒杀开始时间',
            dataIndex: 'startTime',
            ...getColumnSearchProps('秒杀开始时间', 'start_time'),
        },
        {
            title: '秒杀结束时间',
            dataIndex: 'endTime',
            ...getColumnSearchProps('秒杀结束时间', 'end_time'),
        },
        {
            title: '已售',
            dataIndex: 'buyed',
        }
    ];

    // const data = [
    //     {
    //         key: '1',
    //         product_name: '粤港澳大湾区指数灵活配置产品代销建信理财1',
    //         start_time: 'wmx',
    //         end_time: '2022-03-01',
    //         yishou: '通过',
    //     },
    //     {
    //         key: '2',
    //         product_name: '粤港澳大湾区指数灵活',
    //         start_time: 'mjj',
    //         end_time: '2022-03-02',
    //         yishou: '拒绝',
    //     }
    // ];

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
                columns={columns} dataSource={actData} onChange={onChange}
                pagination={{ defaultCurrent: 1, total: actData.length }} />

        </div>
    )
}
