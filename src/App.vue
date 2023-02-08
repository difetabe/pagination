<script setup>
  import AppPagination from './components/AppPagination.vue';
  import {ref} from "vue";

  const limit = 10;
  const currentPage = ref(1);

  function setPage(page) {
    currentPage.value = page;
  }
</script>

<template>
  <main>
    <AppPagination
        @set-current-page="setPage"
        :number-of-items="100"
        :page-size="limit"
        :current-page="currentPage"
    />
  </main>
</template>
