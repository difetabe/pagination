<template>
  <nav
      v-if="itemsQuantity > pageSize"
      class="pagination is-centered"
  >
    <ul class="pagination-list">
      <li>
        <button
            data-test="prev"
            class="pagination-previous"
            @click="emitCurrentPage(currentPage - 1)"
            :class="{'disabled': currentPage === 1}"
        >
          Назад
        </button>
      </li>

      <li>
        <button
            class="pagination-link"
            v-for="(pageNumber) in paginate.pages"
            :key="pageNumber"
            @click="emitCurrentPage(pageNumber)"
            :class="{'is-current': pageNumber === currentPage}"
        >
          {{ pageNumber }}
        </button>
      </li>

      <li>
        <button
            data-test="next"
            class="pagination-next"
            @click="emitCurrentPage(currentPage + 1)"
            :class="{'disabled': currentPage === pageQuantity}"
        >
          Вперед
        </button>
      </li>

    </ul>
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
    },

    maxPagesShown: {
      type: Number,
      default: 5
    }
  })

  const emits = defineEmits(['set-current-page']);

  const pageQuantity = computed(() => {
    return Math.ceil(props.itemsQuantity / props.pageSize);
  });

  const paginate = computed(() => {
    let pages;
    let startPage;

    if (pageQuantity.value <= props.maxPagesShown) {
      pages = Array.from({length: pageQuantity.value}, (el, i) => i);
    } else {
      if (props.currentPage <= props.maxPagesShown - Math.floor(props.maxPagesShown / 2)) {
        startPage = 1;
      } else if (pageQuantity.value - props.currentPage <= Math.floor(props.maxPagesShown / 2)) {
        startPage = pageQuantity.value - (props.maxPagesShown - 1);
      } else {
        startPage = props.currentPage - Math.floor(props.maxPagesShown / 2);
      }
      pages = Array.from({length: props.maxPagesShown}, (v, i) => startPage + i);
    }
    return {
      pages: pages,
    };
  });

  function emitCurrentPage(page) {
    if (page === props.currentPage) return;
    if (page <= 0) return;
    if (page > pageQuantity.value) return;
    emits('set-current-page', page);
  }
</script>

<style lang="scss">
  .disabled {
    opacity: 0.6;
    pointer-events: none;
  }
</style>
