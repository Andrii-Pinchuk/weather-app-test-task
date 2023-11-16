<template>
  <div class="city-weather-block">
    <div class="city-weather-block__header">
      <div v-if="!readOnlyMode" class="autocomplete">
        <input v-model="searchInput" @input="handleInput" class="autocomplete__input" placeholder="Enter city name" />
        <ul v-if="searchResults.length" class="autocomplete__list">
          <li v-for="result in searchResults" :key="result.id" @click="selectCity(result)">
            {{ result.name }}, {{ result.sys.country }}
          </li>
        </ul>
      </div>
      <button v-if="!readOnlyMode" v-show="selectedCity" @click="toggleFavoriteStatus" class="button-favorite">
        <svg
          v-if="isFavorite"
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          width="655.359"
          height="655.359"
          viewBox="0 0 6.827 6.827"
        >
          <path
            style="fill: #ffd700; fill-rule: nonzero; stroke: #ffd700; stroke-width: 0.3"
            d="m3.51 1.252.546 1.536 1.628.043.29.008-.23.176-1.293.993.463 1.563.082.277-.239-.163-1.344-.923-1.343.923-.239.164.082-.278.462-1.564-1.292-.992-.23-.176.29-.008 1.63-.044.544-1.535.097-.274z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          width="655.359"
          height="655.359"
          viewBox="0 0 6.827 6.827"
        >
          <path
            style="fill: none; stroke: #ffd700; stroke-width: 0.3"
            d="m3.51 1.252.546 1.536 1.628.043.29.008-.23.176-1.293.993.463 1.563.082.277-.239-.163-1.344-.923-1.343.923-.239.164.082-.278.462-1.564-1.292-.992-.23-.176.29-.008 1.63-.044.544-1.535.097-.274z"
          />
        </svg>
      </button>
    </div>
    <p v-if="!selectedCity" class="city-weather-block__help-text">Please choose a city to see the weather</p>
    <div v-else>
      <div class="city-weather-block__city-wrap">
        <CityInfo :city="selectedCity" />
      </div>
      <div class="city-weather-block__forecast-wrap">
        <CityWeatherForecastCard :forecast-data="this.forecastData" />
      </div>
      <div class="city-weather-block__forecast-chart-wrap">
        <CityWeatherForecastChart :forecast-data="this.forecastData" />
      </div>
    </div>
  </div>
</template>

<script>
import CityInfo from "@/components/weather/CityInfo";
import CityWeatherForecastCard from "@/components/weather/CityWeatherForecastCard";
import CityWeatherForecastChart from "@/components/weather/CityWeatherForecastChart";

export default {
  name: "CityWeatherBlock",
  components: {
    CityInfo,
    CityWeatherForecastCard,
    CityWeatherForecastChart,
  },
  props: {
    favoriteCity: {
      type: Object,
      default: null,
    },
    readOnlyMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    favoriteCities() {
      return JSON.parse(localStorage.getItem("favoriteCities")) || [];
    },
  },
  data() {
    return {
      searchInput: "",
      searchResults: [],
      selectedCity: null,
      forecastData: [],
      isFavorite: false,
    };
  },
  methods: {
    handleInput() {
      if (this.searchInput.length < 3) {
        this.searchResults = [];
        return;
      }
      this.getCities();
    },
    selectCity(city) {
      if (this.selectedCity && this.selectedCity.id === city.id) {
        this.searchInput = "";
        this.searchResults = [];
        return;
      }
      this.isFavorite = false;
      this.searchInput = "";
      this.searchResults = [];
      this.getForecast(city);
    },
    toggleFavoriteStatus() {
      const localFavoriteCities = [...this.favoriteCities];
      const cityIndex = localFavoriteCities.findIndex((city) => city.id === this.selectedCity.id);
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite && cityIndex === -1) {
        localFavoriteCities.push(this.selectedCity);
      } else if (!this.isFavorite && cityIndex !== -1) {
        localFavoriteCities.splice(cityIndex, 1);
      }

      this.favoriteCities = [...localFavoriteCities];
      localStorage.setItem("favoriteCities", JSON.stringify(localFavoriteCities));
    },
    async getCities() {
      try {
        const res = await this.$api.weather.getCities({
          q: this.searchInput,
          type: "like",
        });
        this.searchResults = res.data.list;
      } catch (err) {
        console.error("Get cities request error:", err);
      }
    },
    async getForecast(city) {
      try {
        const { data } = await this.$api.weather.getThreeHourForecast({
          lat: city.coord.lat,
          lon: city.coord.lon,
          exclude: "minutely,daily,alerts",
        });
        this.forecastData = data.list;
        this.selectedCity = { ...city, additionalInfo: { ...data.city } };
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    },
  },
  created() {
    if (this.favoriteCity) {
      this.isFavorite = true;
      this.getForecast(this.favoriteCity);
    }
  },
};
</script>

<style scoped lang="scss">
.city-weather-block {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__help-text {
    margin-top: 10px;
    color: $main-text-color;
  }
  &__city-wrap {
    margin-bottom: 12px;
  }
  &__forecast-wrap {
    margin-bottom: 4px;
  }
}

.autocomplete {
  position: relative;
  display: inline-block;

  &__input {
    border-radius: 8px;
    border: 2px solid #b5b5d7;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      border: 2px solid #007bff !important;
    }
  }

  &__list {
    position: absolute;
    top: 110%;
    left: 0;
    width: 100%;
    list-style: none;
    background-color: #fff;
    border: 2px solid #b5b5d7;
    border-radius: 8px;
    padding: 0;
    margin: 0;

    li {
      padding: 8px;
      cursor: pointer;
      border-radius: 8px;

      &:hover {
        background-color: #ddd;
      }
    }
  }
}

.button-favorite {
  display: flex;
  align-items: center;

  svg {
    width: 36px;
    height: 36px;
  }

  &:hover {
    background-color: transparent;
    svg path {
      fill: #ffd700 !important;
    }
  }
}

@include breakpoint(tablet) {
  .autocomplete {
    &__input {
      width: 334px;
    }
  }
}
</style>
