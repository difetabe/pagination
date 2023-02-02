<template>
  <nav v-if="itemsQuantity > pageSize" class="pagination">
    <button
        data-test="prev"
        :class="{'disabled': currentPage === 1}"
        class="pagination__button"
        @click="emitCurrentPage(currentPage - 1)"
    >
      <svg width="16" height="16"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Chevron Back</title>
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48"
              d="M328 112L184 256l144 144"/>
      </svg>
    </button>
    <button
        class="pagination__button"
        v-for="pageNumber in pageQuantity"
        :key="pageNumber"
        @click="emitCurrentPage(pageNumber)"
        :class="{'currentPage': pageNumber === currentPage}"
    >
      {{ pageNumber }}
    </button>
    <button
        data-test="next"
        :class="{'disabled': currentPage === pageQuantity}"
        class="pagination__button next-page"
        @click="emitCurrentPage(currentPage + 1)"
    >
      <svg width="16" height="16"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Chevron Forward</title>
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48"
              d="M184 112l144 144-144 144"/>
      </svg>
    </button>
  </nav>
</template>

<script setup>
  import {computed} from "vue";

  const props = defineProps({
    itemsQuantity: {
      type: Number
    },
    pageSize: {
      type: Number,
      default: 10,
      validator: (value) => {
        if (value <= 0) {
          new Error("itemsPerPage attribute must be greater than 0.")
        }
        return true;
      },
    },
    currentPage: {
      type: Number,
      default: 1
    }
  })

  const emits = defineEmits(['set-current-page']);

  const pageQuantity = computed(() => {
    return Math.ceil(props.itemsQuantity / props.pageSize);
  });

  function emitCurrentPage(page) {
    if(page > 0 && page <= pageQuantity.value) {
      emits('set-current-page', page)
    }
  }
</script>

<style lang="scss">
  .pagination {
    display: flex;
    align-items: center;

    &__button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        color: #007aff;
      }
    }

    .currentPage {
      pointer-events: none;
      font-weight: bold;
      background-color: #f5f5f5;
      color: #007aff;
    }

    .disabled {
      opacity: 0.6;
      pointer-events: none;

      &:hover {
        color: inherit;
      }
    }

  }
</style>
