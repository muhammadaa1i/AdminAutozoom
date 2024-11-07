import React, { useState } from 'react';
import logo from '../images/logog.jpg'
import {
    PushpinFilled,
    PropertySafetyFilled,
    SettingFilled,
    BilibiliFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeFilled,
    BankFilled,
    CarFilled
} from '@ant-design/icons';
import { Button, Menu, Layout } from 'antd';
import './Sidebar4.css' 

const items = [
    {
        key: '1',
        icon: <HomeFilled />,
        label: 'Dashboard',
    },
    {
        key: '2',
        icon: <SettingFilled />,
        label: 'Settings',
    },
    {
        key: '3',
        icon: <PropertySafetyFilled />,
        label: 'Brands',
    },
    {
        key: '4',
        label: 'Models',
        icon: <BilibiliFilled />
    },
    {
        key: '5',
        label: 'Locations',
        icon: <PushpinFilled />
    },
    {
        key: '6',
        label: 'Cities',
        icon: <BankFilled />
    },
    {
        key: '7',
        label: 'Cars',
        icon: <CarFilled />
    },
];

const Sidebar4 = () => {

    const { Header, Footer, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#4096ff',
    };
    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#0958d9',
    };
    const siderStyle = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#1677ff',
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
    };
    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        width: 'calc(50% - 8px)',
        maxWidth: 'calc(50% - 8px)',
    };

    return (
        <div className='w-[230px] '>

            <Button
                type="button"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
                className={`btn w-[45px] h-[30px] rounded-md bg-blue-950 mb-[16px] text-white transition-all duration-300 top-3 ${collapsed ? 'left-[90px]' : 'left-[250px]'}`}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>

            {collapsed && (
                <div className="logo flex justify-center w-[80px] h-[80px] bg-[#001529] mt-[-50px] ">

                    <img className='menu-img w-full h-[60px] ' src={logo} />

                </div>
            )}

            <div className={`menu-header w-[230px] bg-[#001529] text-white text-center text-3xl mt-[-50px] py-2 duration-[2s]  ${collapsed ? 'hidden' : 'block'}`}>
                <a href="/">
                    AutoZoom
                </a>
            </div>

            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />



            <Layout style={layoutStyle}>
                <Sider width="25%" style={siderStyle}>
                    Sider
                </Sider>
                <Layout>
                    <Header style={headerStyle}>Header</Header>
                    <Content style={contentStyle}>Content</Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>

        </div >
    )
}

export default Sidebar4;