<template>
  <div class="city">
    <h3 class="city__title">{{ city.name }}, {{ city.additionalInfo.country }}</h3>
    <h4 class="city__subtitle">{{ currentDateFormatted }}</h4>
    <div class="city__info-wrap">
      <div class="city__weather-info">
        <div class="city__weather-details">
          <h4>Current weather</h4>
          <span>Temperature: {{ Math.round(city.main.temp) }} °C</span>
          <span>Feels Like: {{ Math.round(city.main.feels_like) }} °C</span>
          <span>Humidity: {{ Math.round(city.main.humidity) }}%</span>
          <span>Wind Speed: {{ Math.round(city.wind.speed) }} m/s</span>
          <span>Cloudiness: {{ city.clouds.all }}%</span>
        </div>
        <img
          :src="'https://openweathermap.org/img/wn/' + city.weather[0].icon + '@4x.png'"
          alt="Weather Icon"
          class="city__weather-icon"
        />
      </div>
      <div class="city__additional-info">
        <h4>Additional info</h4>
        <span>Population: {{ city.additionalInfo.population }} ppl</span>
        <span>Sunrise: {{ sunriseFormatted }}</span>
        <span>Sunset: {{ sunsetFormatted }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CityInfo",
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sunriseFormatted() {
      return this.formatTime(this.city.additionalInfo.sunrise);
    },
    sunsetFormatted() {
      return this.formatTime(this.city.additionalInfo.sunset);
    },
    currentDateFormatted() {
      return this.formatDate(this.city.dt);
    },
  },
  methods: {
    formatTime(dt) {
      const date = new Date(dt * 1000);
      const options = {
        hour: "numeric",
        minute: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
    formatDate(dt) {
      const date = new Date(dt * 1000);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
  },
};
</script>

<style scoped lang="scss">
.city {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &__title {
    align-self: flex-start;
    font-size: 32px;
    margin: 4px 0 12px;
    color: #333;
  }

  &__subtitle {
    align-self: flex-start;
    font-size: 18px;
    color: $secondary-text-color;
    margin-bottom: 12px;
  }

  &__info-wrap {
    display: flex;
    flex-direction: column;

    h4 {
      font-size: $secondary-title-size;
      color: $main-text-color;
    }
  }

  &__weather-info,
  &__additional-info {
    display: flex;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__weather-info {
    flex-direction: column-reverse;
    align-items: center;
  }

  &__additional-info {
    margin-top: 12px;
    flex-direction: column;

    span {
      margin-top: 16px;
      color: $main-text-color;
    }
  }

  &__weather-icon {
    width: 150px;
    height: auto;
    margin-bottom: 10px;
  }

  &__weather-details {
    display: flex;
    flex-direction: column;

    span {
      margin-top: 16px;
      color: $main-text-color;
    }
  }

  @include breakpoint(tablet) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__title {
      margin: 12px 0 16px;
    }

    &__info-wrap {
      flex-direction: row;
    }

    &__weather-info {
      flex-direction: row;
    }

    &__additional-info {
      margin-top: 0;
      margin-left: 16px;
    }
  }
  @include breakpoint(desktop) {
    &__title {
      margin: 28px 0 32px;
    }
  }
}
</style>
