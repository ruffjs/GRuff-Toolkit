<template>
  <router-view>
    <template #default="{ Component, route }">
      <keep-alive>
        <component
          :is="Component"
          :key="route.meta.usePathKey ? route.fullPath : route.name"
        />
      </keep-alive>
    </template>
  </router-view>
</template>

<script setup lang="ts"></script>
