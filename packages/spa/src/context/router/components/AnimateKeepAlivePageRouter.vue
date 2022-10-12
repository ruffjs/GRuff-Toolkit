<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.fullPath : route.name"
          />
        </keep-alive>
      </transition>
    </template>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped>
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-15px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(10px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
