import React, { useState } from 'react';
import {
  CustomOverlay,
  Map,
  MapTypeControl,
  NavigationControl,
  ScaleControl,
} from '@uiw/react-baidu-map';
import styles from './index.less';
import { Popover } from 'antd';
import {
  optionSelect as options,
  ZheJiangYongKangConfig,
} from '@/pages/mock/jiangnan';
import IconFont from '@/pages/component/IconFont';
import { useModel } from 'umi';

const defaultSettings = {
  enableDragging: true, // 是否开启地图可拖拽缩放
  enableScrollWheelZoom: true, //是否开启鼠标滚轮缩放
  zoom: 15, // 缩放级别 - 500米 3 - 19
  currentCity: ZheJiangYongKangConfig.currentCity,
};

interface MapContainerProps {}

const MapContainer: React.FC<MapContainerProps> = () => {
  // @ts-ignore
  const { children2, center } = useModel('useMapModal');
  const handleClick = (event: any) => {
    console.log(event);
  };

  function markerRef(props: any) {
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
        center={center || ZheJiangYongKangConfig.center}
      >
        {children2?.map((i: any) => {
          return (
            <CustomOverlay
              key={i?.type + '-' + i?.serialNumber}
              ref={markerRef}
              paneName="floatPane"
              position={{ lng: i?.lng, lat: i?.lat }}
            >
              <div className={styles.tip}>
                <Popover
                  placement="right"
                  title={'分区：' + i?.area}
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
                  <div style={{ position: 'relative' }}>
                    <span
                      className={styles.num}
                      style={{
                        transform:
                          i?.serialNumber < 99
                            ? 'translate(-50%, -50%)'
                            : 'scale(0.68) translate(-72%, -80%)',
                      }}
                    >
                      {i?.serialNumber}
                    </span>
                    <IconFont
                      style={{ fontSize: 32 }}
                      type={`icon-dw-${i?.type || 1}`}
                    />
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
