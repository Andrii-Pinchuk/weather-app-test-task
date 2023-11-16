<template>
  <div class="weather-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "CityWeatherForecastChart",
  props: {
    forecastData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    renderChart() {
      const todayForecast = this.forecastData.filter((data) => {
        const currentDate = new Date();
        const forecastDate = new Date(data.dt_txt);

        return (
          forecastDate.getDate() === currentDate.getDate() &&
          forecastDate.getMonth() === currentDate.getMonth() &&
          forecastDate.getFullYear() === currentDate.getFullYear()
        );
      });

      const labels = todayForecast.map((data) => data.dt_txt.split(" ")[1]);
      const temperatureData = this.forecastData.map((data) => Math.round(data.main.temp));
      const ctx = this.$refs.chartCanvas.getContext("2d");

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: temperatureData,
              borderColor: "#007bff",
              backgroundColor: "rgba(0,123,255,0.1)",
              borderWidth: 2,
              color: "#777",
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: "#777",
                font: {
                  size: 16,
                  weight: 700,
                  family: "Roboto",
                },
              },
            },
            y: {
              ticks: {
                color: "#777",
                font: {
                  size: 16,
                  weight: 700,
                  family: "Roboto",
                },
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#777",
                font: {
                  size: 16,
                  weight: 700,
                  family: "Roboto",
                },
              },
            },
            title: {
              display: true,
              text: "Current day hourly temperature chart",
              color: "#444",
              font: {
                size: 24,
                weight: 700,
                family: "Roboto",
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.renderChart();
  },
};
</script>

<style scoped lang="scss">
.weather-chart {
  margin-top: 20px;

  canvas {
    border: 2px solid $main-theme-color;
    border-radius: 8px;
    padding: 12px;
    width: 100%;
    max-width: 1200px;
    max-height: 500px;
  }
}
</style>
