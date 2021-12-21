import React from 'react';
import { MapApiLoaderHOC } from 'react-bmapgl';
import JiangNan from '@/pages/component/store/JiangNan';
import { AK } from '@/pages/mock/constants';

class ContentCenter extends React.Component<any, any> {
  render() {
    const { value } = this.props;
    return <JiangNan />;
  }
}

export default MapApiLoaderHOC({ ak: AK })(ContentCenter);
