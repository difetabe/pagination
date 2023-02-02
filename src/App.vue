<script setup>
  import getData from "./components/randomData";
  import AppPagination from './components/AppPagination.vue';
  import {computed, ref} from "vue";

  const data = getData();

  const dataSize = computed(() => {
    return data.length;
  });

  const limit = 10;
  const currentPage = ref(1);

  function setPage(page) {
    currentPage.value = page;
  }
</script>

<template>
  <main>
    <div>
      <span
          v-for="el in data"
          :key="el"
      >{{ el }}</span>
    </div>
    <AppPagination
        @set-current-page="setPage"
        :itemsQuantity="dataSize"
        :pageSize="limit"
        :currentPage="currentPage"
    />
  </main>
</template>

<style scoped>
</style>
