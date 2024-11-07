import React, { useState } from 'react'
import './Navbar.css'
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';

const Navbar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <header className='container border-2 border-gray-700 '>

            <div className="navbar">
                <nav className="navbar-content">
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <Button
                        type="button"
                        onClick={toggleCollapsed}
                        className="toggle-btn text-white bg-blue-950"
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </nav>
            </div>

        </header>
    )
}

export default Navbar