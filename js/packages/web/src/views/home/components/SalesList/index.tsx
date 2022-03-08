import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs, Menu } from 'antd';
import { Link } from 'react-router-dom';
import React, { useMemo, useState } from 'react';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';

import { useAuctionsList } from './hooks/useAuctionsList';
import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';
import {auctionDemo} from "../../test/auction";
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
  Own = '4',
}

export const SalesListView = (props: { collectionMintFilter?: string }) => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  // const { isLoading } = useMeta();
  const isLoading = false;
  const { connected } = useWallet();
  let { auctions, hasResaleAuctions } = useAuctionsList(activeKey);
  console.log("-0",auctions)
  // auctions = Array.from([...Array(10)],((idx) =>{
  //   return auctionDemo;
  // }));
  const filteredAuctions = useMemo(() => {
    if (props.collectionMintFilter) {
      return auctions.filter(
        auction =>
          auction.thumbnail.metadata.info.collection?.key ===
          props.collectionMintFilter,
      );
    }
    console.log(auctions)
    
    return auctions;
  }, [auctions, props.collectionMintFilter]);

  return (
    <>
      {/* {!props.collectionMintFilter && (
        <Banner
          src="/main-banner.svg"
          headingText="The amazing world of Metaplex."
          subHeadingText="Buy exclusive Metaplex NFTs."
          actionComponent={<HowToBuyModal buttonClassName="secondary-btn" />}
          useBannerBg
        />
      )} */}
      <div className="noneno" style={{ display: 'none' }}></div>
      <Layout>
        {/* <Sider style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div className="salelist-menu">
            <Menu
              openKeys={["RARITY","SKINRARITY","LEVEL","TROPHYCLASS","BATTLE","PRICERANGE"]}
              mode="inline"
              theme="dark"
            >
              <SubMenu key="RARITY" title="RARITY">
                <Menu.Item key="RARITY_COMMON">COMMON</Menu.Item>
                <Menu.Item key="1">Epic</Menu.Item>

                <Menu.Item key="2">Legendary</Menu.Item>
              </SubMenu>
              <SubMenu key="SKINRARITY" title="SKIN RARITY">
                <Menu.Item key="3">Default</Menu.Item>
                <Menu.Item key="4">Rare</Menu.Item>
                <Menu.Item key="5">Mythical</Menu.Item>
              </SubMenu>
              <SubMenu key="LEVEL" title="LEVEL">
                <Menu.Item key="6">Option</Menu.Item>
              </SubMenu>
              <SubMenu key="TROPHYCLASS" title="TROPHY CLASS">
                <Menu.Item key="7">Option</Menu.Item>
              </SubMenu>
              <SubMenu key="BATTLE" title="BATTLE">
                <Menu.Item key="8">Option</Menu.Item>
              </SubMenu>
              <SubMenu key="PRICERANGE" title="PRICE RANGE">
                <Menu.Item key="9">Option</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Sider> */}
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col style={{ width: '100%', marginTop: 2 }}>
            <Row>
              {/* <Tabs
                activeKey={activeKey}
                onTabClick={key => setActiveKey(key as LiveAuctionViewState)}
              >
                <TabPane
                  tab={
                    <>
                      <span className="live"></span> Live
                    </>
                  }
                  key={LiveAuctionViewState.All}
                ></TabPane>
                {hasResaleAuctions && (
                  <TabPane
                    tab="Secondary Marketplace"
                    key={LiveAuctionViewState.Resale}
                  ></TabPane>
                )}
                <TabPane tab="Ended" key={LiveAuctionViewState.Ended}></TabPane>
                {connected && (
                  <TabPane
                    tab="Participated"
                    key={LiveAuctionViewState.Participated}
                  ></TabPane>
                )}
                {connected && (
                  <TabPane
                    tab="My Live Auctions"
                    key={LiveAuctionViewState.Own}
                  ></TabPane>
                )}
              </Tabs> */}
            </Row>
            <Row>
              <div className="artwork-grid">
                {isLoading &&
                  [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
                {!isLoading &&
                  filteredAuctions.map(auction => (
                    <Link
                      key={auction.auction.pubkey}
                      to={`/auction/${auction.auction.pubkey}`}
                    >
                      <AuctionRenderCard auctionView={auction} />
                    </Link>
                  ))}
              </div>
            </Row>
          </Col>
        </Content>
      </Layout>
    </>
  );
};
