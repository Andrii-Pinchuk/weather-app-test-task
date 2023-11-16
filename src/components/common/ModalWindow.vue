<template>
  <div v-if="showModal" class="modal">
    <div class="modal__content">
      <div class="modal__title">
        <slot name="title"></slot>
        <button @click="closeModal" class="modal__button modal__button--close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="#b5b5d7"
              d="M256 73.82A182.18 182.18 0 1 0 438.18 256 182.18 182.18 0 0 0 256 73.82zm90.615 272.724a24.554 24.554 0 0 1-34.712 0l-54.664-54.667-57.142 57.146a24.544 24.544 0 0 1-34.704-34.717l57.138-57.128-53.2-53.209a24.547 24.547 0 0 1 34.712-34.717l53.196 53.208 50.717-50.72a24.547 24.547 0 0 1 34.713 34.716l-50.713 50.722 54.659 54.65a24.56 24.56 0 0 1 0 34.717z"
              data-name="Close"
            />
          </svg>
        </button>
      </div>
      <div class="modal__message">
        <slot name="message"></slot>
      </div>
      <button v-if="onConfirm" @click="confirmAction" class="modal__button">Confirm</button>
      <button @click="closeModal" class="modal__button">
        {{ onConfirm ? Cancel : "Ok" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onConfirm: {
      type: Function,
    },
    onCancel: {
      type: Function,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      if (this.onCancel) this.onCancel();
      this.showModal = false;
    },
    confirmAction() {
      this.$emit("confirm");
    },
  },
};
</script>

<style scoped lang="scss">
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

  &__title,
  &__message {
    width: 100%;
    padding: 16px;
    border-bottom: 2px solid #b5b5d7;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: calc(100% - 64px);
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  &__button {
    margin-top: 10px;

    &--close {
      align-self: flex-end;
      background: transparent;
      padding: 0;
      margin-left: 4px;
      margin-top: 0;

      svg {
        background: transparent;
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>
