<template>
  <MainHeader />
  <main>
    <router-link to="/" class="link--to-home">Main</router-link>
    <router-link to="/favorite" class="link--to-favorite">Favorite</router-link>
    <div>
      <div class="autocomplete-container">
        <input
          v-model="searchInput"
          @input="handleInput"
          class="autocomplete-input"
          placeholder="Enter city name..."
        />
        <ul v-if="searchResults.length" class="autocomplete-list">
          <li
            v-for="result in searchResults"
            :key="result.id"
            @click="selectCity(result)"
          >
            {{ result.name }}, {{ result.country }}
          </li>
        </ul>
      </div>
      <button>Add to favorite</button>
      <CityWeatherBlock />
      <CityWeatherChart />
    </div>
  </main>
</template>

<script>
import CityWeatherBlock from "@/components/common/CityWeatherBlock.vue";
import MainHeader from "@/components/layout/MainHeader";
import CityWeatherChart from "@/components/common/CityWeatherChart";

export default {
  name: "HomePage",
  components: {
    CityWeatherChart,
    MainHeader,
    CityWeatherBlock,
  },
  data() {
    return {
      searchInput: "",
      searchResults: [],
    };
  },
  methods: {
    async handleInput() {
      if (this.searchInput.length < 3) return;
      try {
        const res = await this.$api.weather.getCities({
          q: this.searchInput,
          type: "like",
        });
        this.searchResults = res.data.list.map((city) => ({
          id: city.id,
          name: city.name,
          country: city.sys.country,
        }));
      } catch (err) {
        console.error("Get cities request error:", err);
      }
    },
    selectCity(city) {
      console.log("Selected city:", city);
    },
  },
};
</script>

<style scoped lang="scss">
.autocomplete-container {
  position: relative;
  display: inline-block;
}

.autocomplete-input {
  border-radius: 8px;
  border: 2px solid #b5b5d7;
  padding: 8px;
}

.autocomplete-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  list-style: none;
  background-color: #fff;
  border: 1px solid #b5b5d7;
  border-radius: 8px;
  padding: 0;
  margin: 0;
}

.autocomplete-list li {
  padding: 8px;
  cursor: pointer;
}

.autocomplete-list li:hover {
  background-color: #f2f2f2;
}
</style>
