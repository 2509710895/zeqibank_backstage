import React, { lazy, Suspense, useState, useEffect, useRef } from 'react'
import './Main.css'
import {
    Layout,
    Menu,
    Breadcrumb,
    Skeleton,
    message as msg
} from 'antd';
import {
    NotificationOutlined
} from '@ant-design/icons';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
// const OtherComponent = lazy(() => import('./OtherComponent'));
// import NewGood from '../NewGood/NewGood';
// import Configuration from '../Configuration/Configuration';
// import Apply from '../Apply/Apply';
// import RegPage from '../../pages/RegPage/RegPage';
// import Activity from '../Activity/Activity';
// import CheckPro from '../CheckPro/CheckPro';
// import CheckActivity from '../CheckActivity/CheckActivity';
// import ProDetail from '../ProDetail/ProDetail';
// import LoginPage from '../../pages/LoginPage/LoginPage';

// import ProdDetail from '../../pages/ProdDetail/ProdDetail';
// import ChangeProd from '../../pages/ChangeProd/ChangeProd'
// import ActDetail from '../../pages/ActDetail/ActDetail';
import ChangeActivity from '../../pages/ChangeActivity/ChangeActivity'
// import SysDetailPage from '../../pages/SysDetailPage/SysDetailPage';
import Test from '../Test/Test';
import Announcement from '../Announcement/Announcement';
import ClassHook from "../ClassHook"
import FuncHook from '../FuncHook';
const NewGood = lazy(() => import('../NewGood/NewGood'))
const Configuration = lazy(() => import('../Configuration/Configuration'))
const Apply = lazy(() => import('../Apply/Apply'))
const RegPage = lazy(() => import('../../pages/RegPage/RegPage'));
const Activity = lazy(() => import('../Activity/Activity'));
const CheckPro = lazy(() => import('../CheckPro/CheckPro'));
const CheckActivity = lazy(() => import('../CheckActivity/CheckActivity'));
const ProDetail = lazy(() => import('../ProDetail/ProDetail'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ProdDetail = lazy(() => import('../../pages/ProdDetail/ProdDetail'));
const ChangeProd = lazy(() => import('../../pages/ChangeProd/ChangeProd'));
const ActDetail = lazy(() => import('../../pages/ActDetail/ActDetail'));
// const ChangeActivity = lazy(() => import('../../pages/ChangeActivity/ChangeActivity'));
const SysDetailPage = lazy(() => import('../../pages/SysDetailPage/SysDetailPage'));
const OrderList = lazy(() => import('../../pages/OrderList/OrderList'))
export default function Main(props) {
    const [username, setUsername] = useState("??????")
    const [data, setData] = useState({ data: "a" })
    const btnRef = useRef(null)
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;
    const items = ['??????', '????????????', '??????????????????', '????????????', '????????????', '??????????????????', '??????????????????',]
    const itemNavs = ['/index', '/newgood', '/activity', '/apply', '/checkpro', '/checkactivity', '/config',]
    const navigate = useNavigate()
    const clickItem = (index) => {
        return () => {
            if (sessionStorage.id) {
                //console.log(index, itemNavs[index]);
                navigate(itemNavs[index])
            } else {
                msg.error('?????????')
            }
        }
    }

    const clickLogin = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('username')
        setUsername('??????')
    }

    useEffect(() => {
        // btnRef.current.onclick = function () {
        //     setTimeout(() => {
        //         console.log("data ???", data);
        //         setData(data + "a")
        //         console.log("data ???", data);
        //     }, 0)
        // }
        const fn = function () {
            setTimeout(() => {
                console.log("data ???", data.data);
                setData({ data: data.data + "a" })
                console.log("data ???", data.data);
            }, 100)
        }
        document.getElementById("btn").addEventListener('click', fn)

        return () => {
            document.getElementById("btn").removeEventListener("click", fn)
        }
    }, [data])

    return (
        <div className='MainDiv'>
            <Layout>
                <Header className="header">
                    <div className="logo" children="??????????????????????????????" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        {
                            items.map((item, index) => {
                                return <Menu.Item key={item + index} onClick={clickItem(index)}>{item}</Menu.Item>
                                // return <Menu.Item key={item + index} >
                                //     <Link to={'/test'}>{item}</Link>
                                // </Menu.Item>
                            })
                        }
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ display: 'flex', justifyContent: 'end', margin: '16px 0' }} >
                        <Breadcrumb.Item>
                            <Link to={'/'} onClick={clickLogin} style={{ color: '#2296ff', fontSize: '20px' }}>
                                {sessionStorage.id ? sessionStorage.username + ',????????????' : username}
                            </Link>
                        </Breadcrumb.Item>
                        {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>  
                        <Breadcrumb.Item>App</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                // theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['3']}
                                defaultOpenKeys={['sub3']}
                                style={{ height: '100%' }}
                            >
                                {/* <SubMenu key="sub1" icon={<UserOutlined />} title="?????????">
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu> */}
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="??????">
                                    <Menu.Item key="9"><Link to={'/announcement'}>??????1</Link></Menu.Item>
                                    <Menu.Item key="10"><Link to={'/announcement'}>??????2</Link></Menu.Item>
                                    <Menu.Item key="11"><Link to={'/announcement'}>??????3</Link></Menu.Item>
                                    {/* <Menu.Item key="12">??????4</Menu.Item> */}
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            {/* <button ref={btnRef}>??????data:{data}</button> */}
                            <ClassHook />
                            <FuncHook />
                            <Routes>
                                <Route path='/announcement' element={<Announcement></Announcement>} />
                                <Route path='/' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <LoginPage setUsername={setUsername} />
                                    </Suspense>} />
                                <Route path='/reg' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <RegPage />
                                    </Suspense>} />
                                <Route path='/index' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <SysDetailPage />
                                    </Suspense>} />

                                <Route path='/newgood' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <NewGood />
                                    </Suspense>} />
                                <Route path='/activity' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <Activity />
                                    </Suspense>} />
                                <Route path='/apply' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <Apply />
                                    </Suspense>} />
                                <Route path='/checkpro' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <CheckPro />
                                    </Suspense>} />
                                <Route path='/checkpro/detail/:id' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <ProdDetail />
                                    </Suspense>} />
                                <Route path='/checkpro/detail/:id/change' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <ChangeProd />
                                    </Suspense>} />
                                <Route path='/checkactivity' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <CheckActivity />
                                    </Suspense>} />
                                <Route path='/checkactivity/detail/:id' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <ActDetail />
                                    </Suspense>} />
                                <Route path='/checkactivity/detail/:id/change' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <ChangeActivity />
                                    </Suspense>} />
                                <Route path='/checkactivity/detail/:id/orderlist' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <OrderList />
                                    </Suspense>} />

                                <Route path='/config' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <Configuration />
                                    </Suspense>} />
                                <Route path='/testpro' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <ProDetail />
                                    </Suspense>} >
                                    {/* <Route path='/testpro/change' element={<ChangeProd />}></Route> */}
                                </Route>
                                <Route path='/testpro/change' element={
                                    <Suspense fallback={<Skeleton active />}>
                                        <ChangeProd />
                                    </Suspense>} ></Route>
                                <Route path='/test' element={<Test />} />
                            </Routes>
                        </Content>

                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ??2018 Created by Ant UED</Footer>
            </Layout>
        </div>
    )
}
