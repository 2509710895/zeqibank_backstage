import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Table, Input, Button, Space, message as msg } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const CNYoptions = {
    style: 'currency',
    currency: 'CNY',
};
export default function OrderList() {
    const Stateparams = useLocation()
    // const [tableData, setTableData] = useState([
    //     {
    //         orderId: "710324863984194",
    //         username: "测试客户",
    //         paytime: "2022-04-20 20:25:13",
    //         totalFee: 10000
    //     }
    // ])
    const [tableData, setTableData] = useState()
    //console.log(Stateparams);
    useEffect(() => {
        //console.log('开始请求');
        axios.get('/api/order/getAcRecord/' + Stateparams.state.actData.activityId, {
            headers: {
                "token": sessionStorage.getItem('token') ? sessionStorage.getItem('token') : " "
            }
        }).then(res => {
            //console.log(res);
            if (res.data.code === 1200) {
                const { data } = res.data
                data.map((obj) => {
                    return obj['key'] = obj.orderId
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
            title: '订单编号',
            dataIndex: 'orderId',
            key: 'orderId',
            ...getColumnSearchProps('订单编号', 'orderId'),
        },
        {
            title: '购买人',
            dataIndex: 'username',
            ...getColumnSearchProps('购买人', 'username'),
        },
        {
            title: '订单支付时间',
            dataIndex: 'paytime',
            ...getColumnSearchProps('订单支付时间', 'paytime'),
        },
        {
            title: '订单总额',
            dataIndex: 'totalFee',
            render: text => text.toLocaleString('zh-CN', CNYoptions)
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
                pagination={{ defaultCurrent: 1, total: tableData.length }} />
        </div>
    )
}

