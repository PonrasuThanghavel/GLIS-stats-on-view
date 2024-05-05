import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/animations/loading.json'; 

const HeatmapChart = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(''); 

  useEffect(() => {
    fetchData(selectedRegion);
  }, [selectedRegion]); 
  const fetchData = async (selectedRegion) => {
    setLoading(true);
    try {
      const response = await axios.get('https://glis-stats-on-view.onrender.com/api/bus-stations');
      const data = response.data;
      const filteredData = data.filter(item => item.Reg === selectedRegion);
      const heatmapChartData = filteredData.map(item => ({
        x: item.PopulationDensity,
        y: item.Rev,
        value: item.FootTraffic,
        accScore: item.Acc_Score,
        aqi: item.AQI,
        name: item.Name
      }));
      setHeatmapData(heatmapChartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <div className="dashboard-card">
      <div className="region-filter">
          <label htmlFor="region">Select Region:</label>
            <select className='region-sort-btn' id="region" value={selectedRegion} onChange={handleRegionChange}>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Erode">Erode</option>
              <option value="Kanniyakumari">Kanniyakumari</option>
              <option value="Madurai">Madurai</option>
              <option value="Salem">Salem</option>
              <option value="Trichy">Trichy</option>
              <option value="Vellur">Vellur</option>
            </select>
      </div>
      {loading ? (
        <div className="loading-animation">
          <Lottie animationData={loadingAnimation} loop autoplay />
        </div>
      ) : (
        <Chart
          options={{
            chart: {
              type: 'heatmap',
              height: 350
            },
            dataLabels: {
              enabled: true
            },
            colors: ["#008FFB"],
            title: {
              text: 'Heatmap of Population Density vs Revenue',
              align: 'center'
            },
            xaxis: {
              title: {
                text: 'Population Density'
              }
            },
            yaxis: {
              title: {
                text: 'Revenue'
              }
            },
            tooltip: {
              custom: function({ series, seriesIndex, dataPointIndex, w }) {
                const { accScore, aqi, name } = w.config.series[seriesIndex].data[dataPointIndex];
                return (
                  '<div class="tooltip">' +
                  '<span>Name: ' + name + '</span>' +
                  '<br>' +
                  '<span>AQI: ' + aqi + '</span>' +
                  '<br>' +
                  '<span>Accessibility Score: ' + accScore + '</span>' +
                  '</div>'
                );
              }
            }
          }}
          series={[{
            name: '',
            data: heatmapData
          }]}
          type="heatmap"
          height={350}
        />
      )}
    </div>
  );
};

export default HeatmapChart;
