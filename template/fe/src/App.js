import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

export default class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                    </Menu>
                </Header>
                <Layout  style={{ padding: '0 24px 24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
