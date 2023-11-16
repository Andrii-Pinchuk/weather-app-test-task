<template>
  <MainHeader />
  <main class="favorites-page">
    <div class="tabs">
      <router-link to="/" :class="['tabs__link', { active: $route.path === '/' }]">Main</router-link>
      <router-link to="/favorites" :class="['tabs__link', { active: $route.path === '/favorites' }]">
        Favorite
      </router-link>
    </div>
    <div v-if="favoriteCities.length">
      <div v-for="(block, index) in favoriteCities" :key="block.id" class="weather-block-wrap">
        <CityWeatherBlock :favorite-city="favoriteCities[index]" :readOnlyMode="true" />
      </div>
    </div>
    <div class="favorite-page__help-text" v-else>Add at least 1 city to favorites on the main page, please!</div>
  </main>
</template>

<script>
import CityWeatherBlock from "@/components/weather/CityWeatherBlock.vue";
import MainHeader from "@/components/layout/MainHeader";

export default {
  name: "FavoritesPage",
  components: {
    MainHeader,
    CityWeatherBlock,
  },
  computed: {
    favoriteCities() {
      return JSON.parse(localStorage.getItem("favoriteCities")) || [];
    },
  },
  data() {
    return {
      maxVisibleBlocks: 5,
      modalTitle: "",
      modalMessage: "",
      itemRefs: [],
    };
  },
};
</script>

<style scoped lang="scss">
.favorites-page {
  &__help-text {
    padding: 8px;
    font-size: $secondary-title-size;
    font-weight: $bold-text;
    width: 100%;
    text-align: center;
  }
}
.tabs {
  display: flex;
  padding: 0 8px;
  border-bottom: 2px solid #b5b5d7;

  &__link {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    padding: 10px;
    border-radius: 4px 4px 0 0;
    border-top: 2px solid transparent; // text on all tabs should be at the same horizontal level
    cursor: pointer;
    transition: background-color 0.3s;

    &:not(.active):hover {
      background-color: #ddd;
    }

    &.active {
      position: relative;
      border-top: 2px solid #b5b5d7;
      border-right: 2px solid #b5b5d7;
      border-left: 2px solid #b5b5d7;
      color: #ffd700;

      &::after {
        position: absolute;
        bottom: -3px;
        left: 0;
        content: "";
        width: 100%;
        height: 4px;
        background-color: #f0f0f0;
      }
    }
  }
}

.weather-block-wrap {
  padding: 8px;
  border-bottom: 2px solid #b5b5d7;
}

@include breakpoint(tablet) {
  .tabs {
    padding: 0 16px;
  }
  .weather-block-wrap {
    padding: 16px;
  }
  .favorites-page {
    &__help-text {
      padding: 16px;
      margin-top: 16px;
    }
  }
}
@include breakpoint(laptop) {
  .tabs {
    padding: 0 32px;
  }
  .weather-block-wrap {
    padding: 32px;
  }
  .favorites-page {
    &__help-text {
      margin-top: 32px;
    }
  }
}

@include breakpoint(desktop) {
  .tabs {
    padding: 0 48px;
  }
  .weather-block-wrap {
    padding: 48px;
  }
  .favorites-page {
    &__help-text {
      margin-top: 48px;
    }
  }
}
</style>
