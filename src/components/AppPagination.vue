<template>
  <nav
      v-if="correctPaging"
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

      <li v-if="firstButtonIsShowed">
        <button
            class="pagination-link"
            @click="emitCurrentPage(1)"
            :class="{'is-current': 1 === currentPage}"
        >
          {{ 1 }}
        </button>
      </li>

      <li v-if="hiddenPagesInStart">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <li>
        <button
            class="pagination-link"
            v-for="(pageNumber) in pages"
            :key="pageNumber"
            @click="emitCurrentPage(pageNumber)"
            :class="{'is-current': pageNumber === currentPage}"
        >
          {{ pageNumber }}
        </button>
      </li>

      <li v-if="hiddenPagesInEnd">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <li v-if="lastButtonIsShowed">
        <button
            class="pagination-link"
            @click="emitCurrentPage(numberOfPages)"
            :class="{'is-current': numberOfPages === currentPage}"
        >
          {{ numberOfPages }}
        </button>
      </li>

      <li>
        <button
            data-test="next"
            class="pagination-next"
            @click="emitCurrentPage(currentPage + 1)"
            :class="{'disabled': currentPage === numberOfPages}"
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
    numberOfItems: {
      type: Number,
      validator: (value) => {
        if (value <= 0) {
          new Error("itemsPerPage attribute must be greater than 0.")
        }
        return true;
      },
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
      default: 1,
      validator: (value) => {
        if (value <= 0) {
          new Error("itemsPerPage attribute must be greater than 0.")
        }
        return true;
      },
    },
  })

  const emits = defineEmits(['set-current-page']);

  const maxPagesShown = 5;
  const numberOfPages = computed(() => {
    return Math.ceil(props.numberOfItems / props.pageSize);
  });

  const pages = computed(() => {
    const allPages = (start = 1) => Array.from({length: numberOfPages.value}, (el, i) => i + start);

    if (numberOfPages.value <= maxPagesShown) {
      return allPages();
    }
    if (props.currentPage < maxPagesShown - 2) {
      return allPages(2).slice(0, 2);
    }
    if (props.currentPage === 3) {
      return allPages(2).slice(0, 3);
    }
    if (numberOfPages.value - props.currentPage === 2) {
      return allPages(numberOfPages.value - (maxPagesShown - 2)).slice(0, 3);
    }
    if (numberOfPages.value - props.currentPage < 2) {
      return allPages(numberOfPages.value - (maxPagesShown - 2)).slice(1, 3);
    } else {
      return allPages(props.currentPage - 1).slice(0, 3);
    }
  });

  const firstButtonIsShowed = computed(() => numberOfPages.value > maxPagesShown);
  const lastButtonIsShowed = computed(() => numberOfPages.value > maxPagesShown);
  const hiddenPagesInEnd = computed(() =>
      pages.value.length < maxPagesShown
      && props.currentPage < (numberOfPages.value - maxPagesShown / 2));
  const hiddenPagesInStart = computed(() =>
      pages.value.length < maxPagesShown
      && props.currentPage > maxPagesShown - 2);

  const correctPaging = computed(() =>
      props.currentPage > 0
      && props.numberOfItems > 0
      && props.pageSize > 0
      && numberOfPages.value > 1
  )

  function emitCurrentPage(page) {
    if (page !== props.currentPage
        && page > 0
        && page <= numberOfPages.value) {
      emits('set-current-page', page);
    }
  }

</script>

<style lang="scss">
  .disabled {
    opacity: 0;
    pointer-events: none;
  }
</style>
