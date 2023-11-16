<template>
  <div class="weather-forecast">
    <div class="forecast-switch weather-forecast__switch">
      <button :class="{ 'forecast-switch__button--active': isHourlyActive }" @click="switchToHourly">Hourly</button>
      <button :class="{ 'forecast-switch__button--active': isOneDayActive }" @click="switchTo1Day">1 Day</button>
      <button :class="{ 'forecast-switch__button--active': isFiveDaysActive }" @click="switchTo5Days">5 Days</button>
    </div>
    <div class="weather-forecast__row" v-if="isHourlyActive">
      <div v-for="hourData in processedForecast" :key="hourData.dt" class="forecast-item weather-forecast__item">
        <p class="forecast-item__time">{{ hourData.dt_txt }}</p>
        <img
          :src="'https://openweathermap.org/img/wn/' + hourData.weather[0].icon + '@4x.png'"
          alt="Weather Icon"
          class="forecast-item__icon"
        />
        <p class="forecast-item__temp">Temperature: {{ Math.round(hourData.main.temp) }} °C</p>
        <p class="forecast-item__humidity">Humidity: {{ hourData.main.humidity }}%</p>
      </div>
    </div>
    <div class="weather-forecast__row" v-else-if="isOneDayActive">
      <div
        v-for="dayData in processedForecast.slice(0, 1)"
        :key="dayData.date"
        class="forecast-item weather-forecast__item"
      >
        <p class="forecast-item__date">{{ dayData.date }}</p>
        <img
          :src="'https://openweathermap.org/img/wn/' + dayData.icon + '@4x.png'"
          alt="Weather Icon"
          class="forecast-item__icon"
        />
        <p class="forecast-item__temp">Avg Temperature: {{ dayData.averageTemp }} °C</p>
        <p class="forecast-item__humidity">Humidity: {{ dayData.averageHumidity }}%</p>
      </div>
    </div>
    <div class="weather-forecast__row" v-else-if="isFiveDaysActive">
      <div v-for="dayData in processedForecast" :key="dayData.date" class="forecast-item weather-forecast__item">
        <p class="forecast-item__date">{{ dayData.date }}</p>
        <img
          :src="'https://openweathermap.org/img/wn/' + dayData.icon + '@4x.png'"
          alt="Weather Icon"
          class="forecast-item__icon"
        />
        <p class="forecast-item__temp">Avg Temperature: {{ dayData.averageTemp }} °C</p>
        <p class="forecast-item__humidity">Humidity: {{ dayData.averageHumidity }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forecastData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    processedForecast() {
      const currentDate = new Date().toLocaleDateString();

      if (this.isHourlyActive) {
        return this.forecastData.filter(
          (hourData) => new Date(hourData.dt * 1000).toLocaleDateString() === currentDate
        );
      } else if (this.isOneDayActive) {
        const dayData = this.calculateDayAverages(currentDate);
        return dayData ? [dayData] : [];
      } else if (this.isFiveDaysActive) {
        return this.calculate5DaysAverages(currentDate);
      }

      return [];
    },
  },
  data() {
    return {
      isHourlyActive: true,
      isOneDayActive: false,
      isFiveDaysActive: false,
    };
  },
  methods: {
    switchToHourly() {
      this.isHourlyActive = true;
      this.isOneDayActive = false;
      this.isFiveDaysActive = false;
    },
    switchTo1Day() {
      this.isHourlyActive = false;
      this.isOneDayActive = true;
      this.isFiveDaysActive = false;
    },
    switchTo5Days() {
      this.isHourlyActive = false;
      this.isOneDayActive = false;
      this.isFiveDaysActive = true;
    },
    calculateDayAverages(date) {
      const dayData = this.forecastData.filter(
        (hourData) => new Date(hourData.dt_txt.split(" ")[0]).toLocaleDateString() === date
      );
      if (dayData.length === 0) return null;
      return {
        date: dayData[0].dt_txt.split(" ")[0],
        icon: dayData[0].weather[0].icon,
        averageTemp: this.calculateAverage(dayData.map((data) => data.main.temp)),
        averageHumidity: this.calculateAverage(dayData.map((data) => data.main.humidity)),
      };
    },
    calculate5DaysAverages() {
      const daysData = {};
      this.forecastData.forEach((hourData) => {
        const date = hourData.dt_txt.split(" ")[0];
        const roundedHourDataTemp = Math.round(hourData.main.temp);
        const roundedHourDataHumidity = Math.round(hourData.main.humidity);

        if (!daysData[date]) {
          daysData[date] = {
            date: date,
            icon: hourData.weather[0].icon,
            temps: [roundedHourDataTemp],
            humidities: [roundedHourDataHumidity],
          };
        } else {
          daysData[date].temps.push(hourData.main.temp);
          daysData[date].humidities.push(hourData.main.humidity);
        }
      });

      return Object.values(daysData).map((dayData) => ({
        date: dayData.date,
        icon: dayData.icon,
        averageTemp: this.calculateAverage(dayData.temps),
        averageHumidity: this.calculateAverage(dayData.humidities),
      }));
    },
    calculateAverage(values) {
      return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    },
  },
};
</script>

<style scoped lang="scss">
.weather-forecast {
  border: 2px solid #b5b5d7;
  border-radius: 8px;
  padding: 10px;
  overflow-x: auto;

  &__switch {
    margin-bottom: 10px;
  }

  &__row {
    display: flex;
    overflow-x: auto;
    padding-bottom: 12px;
  }

  &__item {
    margin-right: 12px;
  }
}

.forecast-switch {
  display: flex;
  justify-content: flex-start;
}

.forecast-switch__button {
  padding: 8px;
  margin-right: 10px;
  border: 2px solid #b5b5d7;
  border-radius: 4px;
  cursor: pointer;

  &--active {
    color: #007bff;
    border: 2px solid #007bff;
  }
}

.forecast-item {
  flex: 0 0 auto;
  padding: 12px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__time,
  &__date,
  &__temp,
  &__humidity {
    margin: 0;
    color: #333;
  }

  &__icon {
    width: 100px;
    height: auto;
  }
}
</style>
