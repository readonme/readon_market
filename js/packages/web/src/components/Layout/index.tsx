import React from 'react';
import { Layout } from 'antd';

import { AppBar } from '../AppBar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Footer } from '../Footer';
import { UserInfo } from '../UserInfo';

const { Header, Content } = Layout;

export const AppLayout = React.memo(function AppLayoutImpl(props: any) {
  return (
    <>
      <Layout id={'main-layout'}>
        <span id={'main-bg'}></span>
        <span id={'bg-gradient'}></span>
        <span id={'static-header-gradient'}></span>
        <span id={'static-end-gradient'}></span>
        <Header className="App-Bar">
          <AppBar />
        </Header>
        <UserInfo />
        <Layout id={'width-layout'}>
          <Content
            style={{
              overflow: 'scroll',
              padding: '20px ',
            }}
          >
            {props.children}
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </>
  );
});
