<template>
  <div class="bg-background flex min-h-screen flex-col overflow-hidden">
    <div class="grid flex-1 grid-cols-1 gap-4 p-4 lg:grid-cols-5">
      <!-- TODO: Add logo or some images in here -->
      <div class="col-span-2 hidden rounded-2xl bg-red-300 lg:block"></div>
      <div class="col-span-full flex flex-col items-center justify-center lg:col-span-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
