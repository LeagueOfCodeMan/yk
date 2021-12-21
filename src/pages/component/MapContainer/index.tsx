import React, { useEffect, useState } from 'react';
import {
  APILoader,
  CustomOverlay,
  InfoWindow,
  Map,
  MapTypeControl,
  Marker,
  NavigationControl,
  PanoramaControl,
  PointCollection,
  requireScript,
  ScaleControl,
} from '@uiw/react-baidu-map';
import styles from './index.less';
import { createFromIconfontCN } from '@ant-design/icons';
import { handleMarkerData } from '@/pages/utils';
import { Popover } from 'antd';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3044025_3hmbyerhjhd.js',
});
const defaultSettings = {
  enableDragging: true, // 是否开启地图可拖拽缩放
  enableScrollWheelZoom: true, //是否开启鼠标滚轮缩放
  currentCity: '浙江省永康市',
  zoom: 15, // 缩放级别 - 500米 3 - 19
  center: {
    lng: 120.034116,
    lat: 28.875991,
  },
};

const overlayList = handleMarkerData();
const MapContainer: React.FC<any> = () => {
  const handleClick = (event: any) => {
    console.log(event);
  };
  const [visiable, setVisiable] = useState(false);
  const [item, setItem] = useState<any>();

  const handleOverlayClick = (e: any, item: any) => {
    console.log(e, item);
    setVisiable(true);
    setItem(item);
  };

  function markerRef(props) {
    if (props && props.customOverlay) {
      console.log(
        'CustomOverlay::',
        props.customOverlay,
        props.map,
        props.BMap,
      );
    }
  }

  return (
    <>
      <Map
        {...(defaultSettings as any)}
        mapType={BMAP_SATELLITE_MAP}
        onClick={handleClick}
      >
        {overlayList?.map((i: any) => {
          return (
            <CustomOverlay
              key={i?.pid + '-' + i?.serialNumber}
              ref={markerRef}
              paneName="floatPane"
              position={{ lng: i?.lng, lat: i?.lat }}
              style={{
                whiteSpace: 'nowrap',
                // transform: `translateX(-50%)`,
              }}
            >
              <div
                className={styles.tip}
                onClick={(e) => handleOverlayClick(e, i)}
              >
                <Popover
                  placement="right"
                  title={'分区' + i?.area}
                  content={
                    <div>
                      <div>编号：{i?.serialNumber}</div>
                      <div>企业名称：{i?.companyName}</div>
                      <div>注册地址：{i?.registerAddress}</div>
                      <div>法定代表人：{i?.legalPerson}</div>
                      <div>企业负责人：{i?.companyLeader}</div>
                      <div>质量负责人：{i?.qualityLeader}</div>
                      <div>联系电话：{i?.tel}</div>
                    </div>
                  }
                  trigger="click"
                >
                  <div>
                    <span className={styles.num}>{i?.serialNumber}</span>
                    <IconFont style={{ fontSize: 32 }} type="icon-dingwei" />
                  </div>
                </Popover>
              </div>
            </CustomOverlay>
          );
        })}
        <NavigationControl />
        <ScaleControl />
        <MapTypeControl
          offset={new BMap.Size(40, 40)}
          anchor={BMAP_ANCHOR_BOTTOM_RIGHT}
        />
      </Map>
    </>
  );
};

export default MapContainer;
