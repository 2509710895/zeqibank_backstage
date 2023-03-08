import React from 'react'
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function Announcement() {
    return (
        <>
            <Typography>
                <Title>择栖银行秒杀系统</Title>
                <Paragraph>
                    该项目聚焦银行理财产品在线秒杀，结合数据可视化、SM2、redission等创新技术手段，打造一套高并发，高性能，高可用的秒杀系统，解决在线秒杀存在的痛点，实现对管理员发布秒杀活动，管理活动，查看秒杀进程，配置初筛规则，客户参与秒杀活动，防止脚本，处理高并发等功能性需求的全面覆盖。兼具极强的复用性和创新型，同时具有极高的<Text style={{ color: "#d2002f" }}>使用价值和商业价值</Text>。
                </Paragraph>
                <Divider />
                <Paragraph>
                    秒杀后台管理系统提供给银行业务人员使用。业务人员进入后台管理系统，需输入手机号和密码进行登录，才能进行管理操作。若没有注册，则需前往注册页进行注册后，再进行登录。
                </Paragraph>
                <Paragraph>
                    秒杀后台管理系统主要包含<Text strong>产品模块，秒杀产品模块，初筛规则模块</Text>。
                </Paragraph>
                <Paragraph>
                    产品模块中，业务人员可进行<Text strong>发布产品、查看产品列表、查看产品详情、更新产品信息</Text>等操作，为发布秒杀产品提供基础。
                </Paragraph>
                <Paragraph>
                    <Text strong>发布产品</Text>：业务人员输入产品名称，产品生效时间，投资期限，预计收益率，产品总额发布一款产品，供发布秒杀产品时使用。
                </Paragraph>
                <Paragraph>
                    <Text strong>查看产品列表</Text>：业务人员可查看所有已发布的产品的产品名称，产品生效时间，投资期限，预计收益率等部分重要信息，点击可查看其中一款产品的全部信息。
                </Paragraph>
                <Paragraph>
                    <Text strong>查看产品详情</Text>：业务人员可查看该产品的产品编号，产品名称，产品生效时间，投资期限，预计收益率，产品总额，产品余额等全部信息及其上月与本月每日的销售额对比折线图，还可删除该产品。
                </Paragraph>
                <Paragraph>
                    <Text strong>更新产品信息</Text>：业务人员可修改该产品的信息。
                </Paragraph>
                <Paragraph>
                    秒杀产品模块中，业务人员可进行<Text strong>发布秒杀产品、查看秒杀产品列表、查看秒杀产品详情、更新秒杀产品信息</Text>等操作。
                </Paragraph>
                <Paragraph>
                    <Text strong>发布秒杀产品</Text>：业务人员选择一款产品并设置秒杀开始时间、秒杀结束时间、秒杀总份数、秒杀产品单价、单人最大购买数、初筛规则等必要信息发布一款秒杀产品。
                </Paragraph>
                <Paragraph>
                    <Text strong>查看秒杀产品列表</Text>：业务人员可查看所有已发布的秒杀产品的产品名称、秒杀开始和结束时间、已售量等部分重要信息，点击可查看其中一款秒杀产品的全部信息。
                </Paragraph>
                <Paragraph>
                    <Text strong>查看秒杀产品详情</Text>：业务人员可查看该秒杀产品的全部信息，还能在秒杀过程中实时查看产品购买人数，购买量，产品购买趋势面积图。在秒杀开始之前可删除该秒杀产品，或修改该秒杀产品信息。
                </Paragraph>
                <Paragraph>
                    <Text strong>更新秒杀产品信息</Text>：业务人员可在秒杀开始之前修改该秒杀产品的信息。
                </Paragraph>
                <Paragraph>
                    初筛规则模块中，业务人员可进行<Text strong>配置初筛规则、查看初筛记录</Text>等操作。
                </Paragraph>
                <Paragraph>
                    <Text strong>配置初筛规则</Text>：业务人员可输入是否限制逾期，逾期年度范围，逾期次数，欠款额度，偿还期限，是否限制失信人，是否限制无业/失业人员，是否限制年龄，最低年龄等必要信息，供发布秒杀产品时选择初筛规则，秒杀活动上线时筛选客户。
                </Paragraph>
                <Paragraph>
                    <Text strong>查看初筛记录</Text>：业务人员可查看初筛记录，包括产品名称，初筛客户，初筛时间，初筛结果，原因等信息。
                </Paragraph>
            </Typography>
        </>
    )
}
