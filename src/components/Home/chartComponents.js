import {useEffect} from "react";
import * as echarts from "echarts";

const ChartComponents = ({className}) =>{

  useEffect(()=>{
    var myChart = echarts.init(document.getElementById('mainChart'));
    myChart.setOption(
      {
        series: [
          {
            name: '',
            type: 'pie',
            radius: '95%',
            label: {
              show: false
            },
            data: [
              { value: 50,
                itemStyle: { color: '#8A24F0'},
                emphasis: {
                  scale: true,
                  offset: 50, // 设置偏移量，值越大，偏移越远
                 }
              },
              { value: 25, itemStyle: { color: '#BB34FC' } },
              { value: 5, itemStyle: { color: '#D165FD' } },
              { value: 10, itemStyle: { color: '#D877FD' } },
              { value: 10, itemStyle: { color: '#E59CFE' } },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          }
        ]
      }
    );
  }, []);

  return <div className={className} id={"mainChart"}>

  </div>;
};

export default ChartComponents;
