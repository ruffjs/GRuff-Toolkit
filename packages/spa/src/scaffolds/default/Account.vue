<template>
  <a-dropdown v-if="profile && profile.name" placement="bottomRight">
    <b-touchable :padding="[0, 10]" row>
      <box height="20">
        <a-avatar :size="20" :src="avatar" class="antd-pro-global-header-index-avatar" />
      </box>

      <box margin-left="5">
        <txt class="top-bar-text">{{ profile.display }}</txt>
      </box>
    </b-touchable>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="logout" @click="handleLogout">
          <ruff-icon type="antd" name="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <a-spin v-else size="small" :style="{ marginLeft: 8, marginRight: 8 }">
    <b-touchable :padding="[0, 10]" row>
      <txt line-height="22">获取用户信息</txt>
    </b-touchable>
  </a-spin>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import usePassport from "../../traits/useUserPassport";
import avatar from "../../assets/images/avatar.png";
import { getSPAContext } from "../../context";

const { profile, signIn: updateInfo, signOut: handleLogout } = usePassport();

onMounted(async () => {
  // console.log("user profile", profile.value);
  const { storage, updateUserData } = getSPAContext();
  if (storage.user.uid) {
    const userData = await updateUserData(storage.user.uid);
    // console.log(userData);
    updateInfo(userData);
  }
});
</script>
<style lang="scss" scoped></style>
