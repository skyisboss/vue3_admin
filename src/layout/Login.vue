<template>
  <div class="login-container">
    <div class="container mx-auto max-w-lg form-wrap">
      <div class="bg-white rounded-sm mx-10">
        <div class="py-10 px-16">
          <div class="text-center">
            <span class="logo-text-zh text-xl">{{
              $t("login.page_title")
            }}</span>
          </div>
          <el-divider class="mt-8 mb-14">
            <el-dropdown>
              <span class="el-dropdown-link flex items-center">
                <i class="ri-translate text-base mr-2"></i>简体中文
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>简体中文</el-dropdown-item>
                  <el-dropdown-item>繁体中文</el-dropdown-item>
                  <el-dropdown-item>English</el-dropdown-item>
                  <el-dropdown-item>Tiếng Việt</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-divider>

          <el-form
            label-position="top"
            label-width="80px"
            :model="form"
            :rules="rule"
            :hide-required-asterisk="true"
            ref="refForm"
            size="medium"
          >
            <el-form-item label="" prop="username">
              <el-input
                v-model="form.username"
                :placeholder="$t('login.type_username')"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="form.password"
                :placeholder="$t('login.type_password')"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="captcha" v-if="showCaptcha">
              <el-input
                v-model="form.captcha"
                :placeholder="$t('login.type_captcha')"
                prefix-icon="el-icon-warning-outline"
                class="captcha-wrap"
              >
                <template #suffix>
                  <div class="captcha-image c-p" @click="getCaptcha">
                    <img :src="captcha_image" />
                  </div>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item class="mb-5 mt-12">
              <el-button
                type="primary"
                class="w-full"
                :loading="loading"
                @click="submitLogin"
                >{{ $t("login.login_text") }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <p class="text-gray-500 pt-14 text-center mr-6">
        欢迎使用OK站群系统 v1.09
      </p>
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
      showCaptcha: true,
      captcha_image: "",
      form: {
        username: "",
        password: "",
        captcha: "",
        captcha_id: "",
      },
      rule: {
        username: [
          {
            required: true,
            message: t("login.type_username"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: t("login.type_password"),
            trigger: "blur",
          },
        ],
        captcha: [
          {
            required: true,
            message: t("login.type_captcha"),
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