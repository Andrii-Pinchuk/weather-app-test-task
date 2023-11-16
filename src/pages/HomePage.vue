<template>
  <MainHeader />
  <main class="main">
    <div class="tabs">
      <router-link to="/" :class="['tabs__link', { active: $route.path === '/' }]">Main</router-link>
      <router-link to="/favorite" :class="['tabs__link', { active: $route.path === '/favorite' }]"
        >Favorite</router-link
      >
    </div>
    <div v-for="(block, index) in weatherBlocks" :key="block.id" class="weather-block-wrap">
      <CityWeatherBlock :favorite-city="favoriteCities[index]" />
      <button class="button-delete-block" @click="removeWeatherBlock(block.id)">
        <span>Delete weather block</span>
      </button>
    </div>
    <button @click="addWeatherBlock" class="button-add-block">Add new weather block</button>

    <div v-if="showAddCityModal" class="modal">
      <div class="modal__content">
        <p>To add a city, remove one. You can only add up to 5 cities.</p>
        <button @click="closeAddCityModal" class="modal__button">OK</button>
      </div>
    </div>
  </main>
</template>

<script>
import CityWeatherBlock from "@/components/common/CityWeatherBlock.vue";
import MainHeader from "@/components/layout/MainHeader";

export default {
  name: "HomePage",
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
      weatherBlocks: [{ id: 1 }],
      maxVisibleBlocks: 5,
      showAddCityModal: false,
      itemRefs: [],
    };
  },
  methods: {
    closeAddCityModal() {
      this.showAddCityModal = false;
    },
    addWeatherBlock() {
      if (this.weatherBlocks.length === this.maxVisibleBlocks) {
        this.showAddCityModal = true;
        return;
      }
      const lastBlock = this.weatherBlocks[this.weatherBlocks.length - 1];
      const newBlock = { id: lastBlock.id + 1 };
      this.weatherBlocks.push(newBlock);
    },
    removeWeatherBlock(blockId) {
      if (this.weatherBlocks.length === 1) return;
      const index = this.weatherBlocks.findIndex((block) => block.id === blockId);
      if (index !== -1) {
        this.weatherBlocks.splice(index, 1);
      }
    },
    showFavoriteCities() {
      const favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];
      for (let i = 1; i < favoriteCities.length; i++) {
        this.addWeatherBlock();
      }
    },
  },
  created() {
    if (this.favoriteCities.length > 0) this.showFavoriteCities();
  },
};
</script>

<style scoped lang="scss">
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  &__button {
    margin-top: 10px;
  }
}

.weather-block-wrap {
  padding: 8px;
  border-bottom: 2px solid #b5b5d7;
}

.button-delete-block {
  margin-top: 12px;
  border: 2px solid #ff0033;
  color: #ff0033;
}

.button-add-block {
  margin: 8px 0 8px 8px;
  color: #007bff;
  border: 2px solid #007bff;
}

@include breakpoint(tablet) {
  .tabs {
    padding: 0 16px;
  }
  .weather-block-wrap {
    padding: 16px;
  }
  .button-add-block {
    margin: 16px 0 16px 16px;
  }
}
@include breakpoint(laptop) {
  .tabs {
    padding: 0 32px;
  }
  .weather-block-wrap {
    padding: 32px;
  }
  .button-add-block {
    margin: 32px 0 32px 32px;
  }
}

@include breakpoint(desktop) {
  .tabs {
    padding: 0 48px;
  }
  .weather-block-wrap {
    padding: 48px;
  }
  .button-add-block {
    margin: 48px 0 48px 48px;
  }
}
</style>
