import React from 'react';
import MapContainer from '@/pages/component/MapContainer';
import { APILoader } from '@uiw/react-baidu-map';
import { AK } from '@/pages/mock/jiangnan';

const ContentCenter: React.FC<{}> = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <APILoader akay={AK}>
        <MapContainer />
      </APILoader>
    </div>
  );
};

export default ContentCenter;
