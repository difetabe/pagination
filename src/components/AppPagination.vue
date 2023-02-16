<template>
  <nav
      v-if="isVisible"
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
      <li v-for="page in pages">
        <span v-if="page.isDots">&hellip;</span>
        <button
            class="pagination-link"
            v-else
            :class="{'is-current': page.isSelected }"
            @click="emitCurrentPage(page.label)"
        > {{ page.label }}
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
  import {Button} from "./AppPagination/Button";

  const props = defineProps({
    numberOfItems: {
      type: Number,
      validator: (value) => value >= 0,
    },
    pageSize: {
      type: Number,
      default: 10,
      validator: (value) => value > 0,
    },
    currentPage: {
      type: Number,
      default: 1,
      validator: (value) => value > 0,
    },
  })

  const emits = defineEmits(['set-current-page']);

  const maxPagesShown = 5;
  const numberOfPages = computed(() => {
    return Math.ceil(props.numberOfItems / props.pageSize);
  });

  const isVisible = computed(() =>
      props.currentPage > 0
      && props.numberOfItems > 0
      && props.pageSize > 0
      && numberOfPages.value > 1
  )

  const pages = computed(() => {
    return makePagesBaseSequence(props.currentPage - 1, maxPagesShown)
        .map(pageNumber => {
          const isDots = isNaN(pageNumber);
          // const callback = !isDots
          //     ? () => emits('set-current-page', pageNumber)
          //     : () => {
          //     };

          return new Button(
              pageNumber,
              props.currentPage === pageNumber,
              isDots
          )
        })
  })

  function emitCurrentPage(page) {
    if (page !== props.currentPage
        && page > 0
        && page <= numberOfPages.value) {
      emits('set-current-page', page);
    }
  }

  function makePagesBaseSequence(offset, limit) {
    const baseArr = [];
    const centralButtons = [props.currentPage - 1, props.currentPage, props.currentPage + 1];

    if (numberOfPages.value <= limit) {
      return Array.from({length: numberOfPages.value}, (_, i) => i + 1);
    }

    if (props.currentPage <= 2) {
      return [1, 2, 3, 'dots', numberOfPages.value]
    }

    baseArr.push(1);

    if (offset > 2) {
      baseArr.push('dots')
    }

    if (offset < numberOfPages.value - 2) {
      baseArr.push(centralButtons)
    }

    if (offset < numberOfPages.value - 3) {
      baseArr.push('dots')
    }

    if (offset > numberOfPages.value - 3) {
      return [1, 'dots', numberOfPages.value - 2, numberOfPages.value - 1, numberOfPages.value];
    }

    baseArr.push(numberOfPages.value)
    return baseArr.flat()
  }
</script>

<style lang="scss">
  .disabled {
    opacity: 0;
    pointer-events: none;
  }
</style>
