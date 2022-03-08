import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Modal } from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';
import { Notifications } from '../Notifications';
import useWindowDimensions from '../../utils/layout';
import { MenuOutlined } from '@ant-design/icons';
import { HowToBuyModal } from '../HowToBuyModal';
import {
  Cog,
  CurrentUserBadge,
  CurrentUserBadgeMobile,
} from '../CurrentUserBadge';
import {
  ENDPOINTS,
  formatNumber,
  formatUSD,
  Identicon,
  MetaplexModal,
  Settings,
  shortenAddress,
  useConnectionConfig,
  useNativeAccount,
  useWalletModal,
  useQuerySearch,
  WRAPPED_SOL_MINT,
} from '@oyster/common';
import { ConnectButton } from '@oyster/common';
import { MobileNavbar } from '../MobileNavbar';
import { useMeta, useSolPrice } from '../../contexts';
import { useTokenList } from '../../contexts/tokenList';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { TokenCircle } from '../Custom';
const props = { iconSize: 30, showAddress: false, showBalance: true };

export const UserInfo = () => {
  const { connected } = useWallet();
  const { wallet, publicKey, disconnect } = useWallet();
  const { account } = useNativeAccount();
  const solPrice = useSolPrice();
  const [showAddFundsModal, setShowAddFundsModal] = useState<Boolean>(false);
  const tokenList = useTokenList();
  const { width } = useWindowDimensions();
  const iconSize = width < 576 ? 30 : 60;
  if (!wallet || !publicKey) {
    return null;
  }
  const balance = (account?.lamports || 0) / LAMPORTS_PER_SOL;
  const balanceInUSD = balance * solPrice;
  const solMintInfo = tokenList.tokenMap.get(WRAPPED_SOL_MINT.toString());
  const iconStyle: React.CSSProperties = {
    display: 'flex',
    width: props.iconSize,
    borderRadius: 50,
  };

  let name = props.showAddress ? shortenAddress(`${publicKey}`) : '';
  const unknownWallet = wallet as any;
  if (unknownWallet.name && !props.showAddress) {
    name = unknownWallet.name;
  }

  let image = <Identicon address={publicKey?.toBase58()} style={iconStyle} />;

  if (unknownWallet.image) {
    image = <img src={unknownWallet.image} style={iconStyle} />;
  }
  if(connected){
    
  }

  return (
    <>
      <div className="app-user-info">
        {connected && (
          <>
            <CurrentUserBadge
              showBalance={false}
              showAddress={true}
              iconSize={iconSize}
            />
            <div className="app-user-balance">
              <span style={{ color: 'rgba(255, 255, 255, 1)' }}>Balance&nbsp;&nbsp;</span>
              {' '}
              <span>
                {formatNumber.format(balance)}
                <span
                  style={{
                    borderRadius: '50%',
                    background: 'black',
                    display: 'inline-block',
                    padding: '1px 4px 4px 4px',
                    lineHeight: 1,
                  }}
                >
                  {/* <img src="/sol.svg" width="10" /> */}
                </span>
                SOL
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
