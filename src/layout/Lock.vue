<template>
  <div class="login-container">
    <div class="container mx-auto max-w-lg form-wrap">
      <div class="bg-white rounded-md mx-10">
        <div class="p-10">
          <div class="text-center">
            <span class="logo-text-zh text-xl">{{
              $t("lock.page_title")
            }}</span>
          </div>

          <el-form
            label-position="top"
            label-width="80px"
            :model="form"
            :rules="rule"
            :hide-required-asterisk="true"
            ref="refForm"
            size="medium"
          >
            <el-form-item label="" prop="password" class="mt-5 mb-10">
              <el-input
                v-model="form.password"
                :placeholder="$t('lock.type_password')"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>

            <el-form-item class="mb-0">
              <el-button
                type="primary"
                class="w-full"
                :loading="loading"
                @click="submitLogin"
                >{{ $t("lock.lock_text") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
export default {
  setup() {
    const { locale, t } = useI18n();
    const data = reactive({
      refForm: null,
      loading: false,
      form: {
        password: "",
      },
      rule: {
        password: [
          {
            required: true,
            message: t("lock.type_password"),
            trigger: "blur",
          },
        ],
      },
    });

    const submitLogin = () => {};

    return {
      ...toRefs(data),
      submitLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  color: var(--text-color-primary);
  background-color: #36474f;
  position: relative;
  height: 100%;
}
.form-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 15vh;
}
.el-input__icon {
  font-size: 1rem;
}
</style>