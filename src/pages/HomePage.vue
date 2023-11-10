<template>
  <MainHeader />
  <main>
    <router-link to="/" class="link--to-home">Main</router-link>
    <router-link to="/favorite" class="link--to-favorite">Favorite</router-link>
    <div>
      <input type="text" />
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
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
}
</style>
