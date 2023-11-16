<template>
  <MainHeader />
  <main class="main-page">
    <div class="tabs">
      <router-link to="/" :class="['tabs__link', { active: $route.path === '/' }]">Main</router-link>
      <router-link to="/favorites" :class="['tabs__link', { active: $route.path === '/favorites' }]">
        Favorite
      </router-link>
    </div>
    <div v-for="(block, index) in weatherBlocks" :key="block.id" class="weather-block-wrap">
      <CityWeatherBlock :favorite-city="favoriteCities[index]" />
      <button class="button-delete-block warn" @click="removeWeatherBlock(block.id)">
        <span>Delete weather block</span>
      </button>
    </div>
    <button @click="addWeatherBlock" class="button-add-block primary">Add new weather block</button>
  </main>
  <ModalWindow ref="modalWindow" :on-confirm="onConfirm">
    <template v-slot:title>
      <h3>{{ modalTitle }}</h3>
    </template>
    <template v-slot:message>
      <p>{{ modalMessage }}</p>
    </template>
  </ModalWindow>
</template>

<script>
import CityWeatherBlock from "@/components/weather/CityWeatherBlock.vue";
import MainHeader from "@/components/layout/MainHeader";
import ModalWindow from "@/components/common/ModalWindow";

export default {
  name: "HomePage",
  components: {
    MainHeader,
    CityWeatherBlock,
    ModalWindow,
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
      modalTitle: "",
      modalMessage: "",
      itemRefs: [],
      onConfirm: null,
    };
  },
  methods: {
    addWeatherBlock() {
      if (this.weatherBlocks.length === this.maxVisibleBlocks) {
        this.modalTitle = "Adding a block is forbidden";
        this.modalMessage = "To add a block, remove one. You can only add up to 5 blocks";
        this.$refs.modalWindow.openModal();
        return;
      }
      const lastBlock = this.weatherBlocks[this.weatherBlocks.length - 1];
      const newBlock = { id: lastBlock.id + 1 };
      this.weatherBlocks.push(newBlock);
    },
    removeWeatherBlock(blockId) {
      if (this.weatherBlocks.length === 1) {
        this.modalTitle = "Deleting a block is forbidden";
        this.modalMessage = "At least one block on the page";
        this.$refs.modalWindow.openModal();
        return;
      }
      const index = this.weatherBlocks.findIndex((block) => block.id === blockId);
      if (index !== -1) {
        this.modalTitle = "Delete a block ";
        this.modalMessage = "Are you sure you want to delete the block?";
        this.onConfirm = () => this.weatherBlocks.splice(index, 1);
        this.$refs.modalWindow.openModal();
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
    color: $main-text-color;
    font-weight: bold;
    padding: 10px;
    border-radius: 4px 4px 0 0;
    border-top: 2px solid transparent; // text on all tabs should be at the same horizontal level
    cursor: pointer;
    transition: background-color 0.3s;

    &:not(.active):hover {
      background-color: $hover-color;
    }

    &.active {
      position: relative;
      border-top: 2px solid $main-theme-color;
      border-right: 2px solid $main-theme-color;
      border-left: 2px solid $main-theme-color;
      color: $secondary-theme-color;

      &::after {
        position: absolute;
        bottom: -3px;
        left: 0;
        content: "";
        width: 100%;
        height: 4px;
        background-color: $main-background-color;
      }
    }
  }
}

.weather-block-wrap {
  padding: 8px;
  border-bottom: 2px solid $main-theme-color;
}

.button-delete-block {
  margin-top: 12px;
}

.button-add-block {
  margin: 8px 0 8px 8px;
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
  .button-delete-block {
    margin-top: 28px;
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
  .button-delete-block {
    margin-top: 44px;
  }
}
</style>
