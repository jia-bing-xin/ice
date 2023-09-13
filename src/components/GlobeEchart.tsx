import { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import mapImg from '@/assets/img/地球.jpg'
function BaiduMapWithECharts(props: any) {
  const rodamData = (num = 100) => {
    // 模拟数据，构造飞线的起始经纬度
    let longitude = 116.2;
    let latitude = 39.56;
    const res = []
    // 随机数据 i控制线数量
    for (let i = 0; i < num; i++) {
      let longitude2 = Math.random() * 360 - 180;
      let latitude2 = Math.random() * 180 - 90;
      res.push({
        coords: [
          [longitude, latitude],
          [longitude2, latitude2],
        ],
        value: (Math.random() * 3000).toFixed(2),
      });
    }
    console.log(res, 'rodamData')
    return res
  }
  const coords = (arr: number[][]) => {
    const res = []
    for (let i = 0; i < arr.length; i += 100) {
      res.push(
        {
          type: 'scatter3D',
          coordinateSystem: 'globe',
          symbolSize: 2,
          data: [
            {
              // name: '北京',
              value: arr[i], // 北京的经纬度和海拔高度
              itemStyle: {
                width: 2,
                color: 'red', // 标点的颜色
              },
            },
          ],
          label: {
            show: true,
            formatter: '{b}',
          },
        })
    }
    console.log(res, 'res')
    return res
  }
  useEffect(() => {
    console.log(props)
    const MapChart = echarts.init(document.getElementById('container'));
    const initEchart = async () => {
      const option = {
        globe: {
          baseTexture: mapImg,
          shading: 'lambert',
          viewControl: {
            autoRotate: false,
            alpha: 40,
            beta: 196,
            minDistance: 300,
            maxDistance: 300,
            zoomSensitivity: 0
          },
          light: {
            ambient: {
              intensity: 1.5
            },
            main: {
              intensity: 0
            }
          },
        },
        series: [
          // ...coords(props.chinaGeo),
          {
            type: 'scatter3D',
            coordinateSystem: 'globe',
            symbolSize: 10,
            data: [
              {
                name: '北京',
                value: [116.407394, 39.904211, 0], // 北京的经纬度和海拔高度
                itemStyle: {
                  color: 'red', // 标点的颜色
                },
              },
            ],
            label: {
              show: true,
              formatter: '{b}',
            },
          },
          {
            type: "lines3D",
            coordinateSystem: "globe",
            effect: {
              show: true,
            },
            blendMode: "lighter",
            lineStyle: {
              width: 2,
            },
            data: rodamData(100),
            silent: false,
          },
        ],
      };
      option && MapChart.setOption(option);
    }
    initEchart()
    window.addEventListener('resize', () => {
      MapChart.resize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        MapChart.resize();
      });
      MapChart.dispose();
    };
  }, [props]);
  return (
    <div id="container" style={{ width: '100%', height: '100%' }}></div>
  );
}

export default BaiduMapWithECharts;
