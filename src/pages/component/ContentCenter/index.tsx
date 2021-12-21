import React from 'react';
import MapContainer from '@/pages/component/MapContainer';
import { AK } from '@/pages/mock/constants';
import { APILoader } from '@uiw/react-baidu-map';

const ContentCenter: React.FC<any> = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <APILoader akay={AK}>
        <MapContainer />
      </APILoader>
    </div>
  );
};

export default ContentCenter;
