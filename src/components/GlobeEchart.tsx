import React, { useEffect } from 'react';
import BMap from 'bmapgl';
import echarts from 'echarts';
import 'echarts-gl';

const BaiduMapWithECharts = () => {
  useEffect(() => {
    // 创建百度地图实例
    const map = new BMap.Map("map-container");

    // 初始化地图
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

    // 创建ECharts地球实例
    const chart = echarts.init(document.getElementById('echarts-container'), 'dark');

    // 添加地球图层
    chart.setOption({
      globe: {},
      series: []
    });

    // 监听地图缩放事件
    map.addEventListener('zoomend', function () {
      const zoom = map.getZoom();
      // 在ECharts地球上设置相应缩放
      chart.setOption({
        globe: {
          viewControl: {
            distance: zoom * 100
          }
        }
      });
    });

    // 在ECharts地球上监听鼠标点击事件
    chart.on('click', function (params) {
      const { lat, lng } = params.value;
      // 在百度地图上找到对应的位置并进行相关操作
      const point = new BMap.Point(lng, lat);
      map.centerAndZoom(point, map.getZoom());
    });

    // 在组件卸载时销毁地图和地球实例，以防止内存泄漏
    return () => {
      map.clearOverlays();
      chart.dispose();
    };
  }, []);

  return (
    <div>
      <div id="map-container" style={{ width: '50%', height: '400px', float: 'left' }}></div>
      <div id="echarts-container" style={{ width: '50%', height: '400px', float: 'left' }}></div>
    </div>
  );
};

export default BaiduMapWithECharts;
