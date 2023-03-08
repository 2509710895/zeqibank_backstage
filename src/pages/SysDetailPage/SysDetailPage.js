import React from 'react'
import {
    Row,
    Col,
    Statistic,
    Card,
    PageHeader
} from 'antd'
import {
    ArrowUpOutlined
} from '@ant-design/icons';

import AgePie from '../../components/AgePie/AgePie'
import SexPie from '../../components/SexPie/SexPie'
// import ProdClass from '../../components/ProdClass/ProdClass'
import ColumnPie from '../../components/ColumnPie/ColumnPie'
import EMap from '../../components/EMap/EMap'
import DBLine from '../../components/DBLine/DBline';

import './SysDetailPage.css'
export default function SysDetailPage() {
    return (
        <>
            <div style={{ backgroundColor: '#f0f0f0', padding: '30px' }}>
                <Row justify="space-around" gutter={16}>
                    <Col span={10}>
                        <Card bordered>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Statistic
                                    title="已有客户"
                                    value={112653}
                                    // precision={2}
                                    valueStyle={{ color: '#ef3a41' }}
                                    // prefix={<ArrowUpOutlined />}
                                    suffix="人"
                                />
                                <Statistic
                                    title="增长"
                                    value={2034}
                                    // precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="人"
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card bordered>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Statistic
                                    title="销售额"
                                    value={10660000}
                                    // precision={2}
                                    valueStyle={{ color: '#ef3a41' }}
                                    // prefix={<ArrowUpOutlined />}
                                    suffix="元"
                                />
                                <Statistic
                                    title="增长"
                                    value={8.775}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <PageHeader title="男女比例" />
                    {/* <div className='title'>男女比例</div> */}
                    <div className='sex' style={{ height: 300 }}>
                        <SexPie />
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <PageHeader title="年龄段比例" />
                    {/* <div className='title'>年龄段比例</div> */}
                    <div className='age' style={{ height: 300 }}>
                        <AgePie />
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <PageHeader title="客户地域分布" />
                    {/* <div className='title'>购买人群地域分布</div> */}
                    <div style={{ width: '85%' }}>
                        <EMap />
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <PageHeader title="销售额对比" />
                    <div>
                        <DBLine />
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <PageHeader title="产品类型" />
                    <div>
                        <ColumnPie />
                    </div>
                </Col>
            </Row>

        </>
    )
}
