<script setup>
  import getData from "./utils/randomData";
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
        :itemsQuantity="100"
        :pageSize="limit"
        :currentPage="currentPage"
    />
  </main>
</template>
