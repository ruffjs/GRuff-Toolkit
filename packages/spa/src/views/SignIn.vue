<template>
  <box
    :flex="1"
    row
    class="login-panel"
    width="100%"
    background-color="#5e8bde"
    :background-image="`url(${bgImageSrc})`"
    background-size="contain"
    background-repeat="no-repeat"
    background-position="left bottom"
    align="end center"
  >
    <box width="621" maxWidth="100%" height="322" center>
      <box width="427" maxWidth="100%" height="310" background="#3a64d9" paddingH="30">
        <box height="110" center>
          <txt size="21" color="white" weight="bold" line-height="50"
            >基站动环监控系统</txt
          >
        </box>
        <a-form
          :model="formModel"
          :rules="formRules"
          noStyle
          name="bsm"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          @validate="onValidate"
        >
          <a-form-item name="username">
            <a-input
              v-model:value="formModel.username"
              autocomplete="username"
              placeholder="手机号"
            >
              <template #prefix>
                <b-icon type="user-outlined" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password">
            <a-input
              v-model:value="formModel.password"
              @keyup.enter="onSubmit"
              placeholder="密码"
              autocomplete="current-password"
              type="password"
            >
              <template #prefix>
                <b-icon type="lock-outlined" />
              </template>
            </a-input>
          </a-form-item>
          <a-button
            @click="onSubmit"
            type="primary"
            :disabled="!formModel.username || !formModel.password"
            block
            >登录
          </a-button>
        </a-form>
      </box>
    </box>
  </box>
</template>

<script setup lang="ts">
import usePassport from "../traits/usePassport";
import defineFormModel from "@ruff-web/form-wrappers/src/traits/defineFormModel";
// import bgImageSrc from "@/assets/images/background.jpg"
const bgImageSrc = null;

const { signIn } = usePassport();
const { formModel, formRules, resetModel } = defineFormModel<{
  username: string;
  password: string;
}>({
  username: {
    data: "",
    rule: [{ required: true, message: "请输入手机号" }],
  },
  password: {
    data: "",
    rule: [{ required: true, message: "请输入密码" }],
  },
});

const onValidate = (name: string, status: boolean, errorMsgs: string | null) => {
  // console.log(name, status, errorMsgs)
};
const onSubmit = () => {
  if (formModel.username && formModel.password) {
    signIn(formModel.username, formModel.password);
  }
};
const onFinish = (values: any) => {
  // console.log('Success:', values);
  resetModel();
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<style lang="scss">
.login-panel {
  .ant-input.ant-input-borderless,
  .ant-input-affix-wrapper.ant-input-password {
    height: 40px !important;
    border: 1px solid #d9d9d9;
  }
}
</style>
