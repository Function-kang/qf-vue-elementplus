<template>
  <div class="login">
    <div class="login-con">
      <ul class="menu-tab">
        <li
          v-for="v in MenuData"
          :class="{ current: v.current }"
          :key="v.type"
          @click="clickMenu(v)"
        >
          {{ v.text }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            minlength="6"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            v-model="ruleForm.passwords"
            type="password"
            autocomplete="off"
            minlength="6"
            maxlength="15"
          />
        </el-form-item>

        <!-- 表单按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn block"
            @click="submitForm(ruleFormRef)"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { CkEmail, CkPass } from "../../util/index";
import { link } from "../../api/link";
import { apiUrl } from "../../api/url.js";

const MenuData = reactive([
  {
    text: "登录",
    current: true, // 值为true，当前是登录界面
    type: "login",
  },
  {
    text: "注册",
    current: false,
    type: "register",
  },
]);

const clickMenu = (item: { text: string; current: boolean; type: string }) => {
  MenuData.forEach((elemt) => {
    elemt.current = false;
  });
  item.current = true;
  console.log(model);
  // 修改保存点击的状态
  model.value = item.type;
};

let model = ref("login");

onMounted(() => {
  console.log("PROD_APP_API ===>>>", process.env.PROD_APP_API);
  console.log("VUE_APP_API ===>>>", process.env.VUE_APP_API);
  console.log("NODE_ENV ===>>>", process.env.NODE_ENV);
});

// 表单
const ruleFormRef = ref<FormInstance>();

const checkUser = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("邮箱不能为空！！！"));
  } else if (CkEmail(value)) {
    callback(new Error("邮箱格式不正确！！！"));
  } else {
    callback();
  }
};

const password = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("密码不能为空！！！"));
  } else if (CkPass(value)) {
    callback(new Error("密码格式有误必须在6至15位字母+数字！！！"));
  } else {
    callback();
  }
};
const passwords = (rule: any, value: any, callback: any) => {
  if (model.value === "login") {
    callback();
  }

  if (value === "") {
    callback(new Error("重复密码不能为空！！！"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入密码必须相同！！！"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  password: "",
  passwords: "",
});

// 自定义验证天剑
const rules = reactive({
  username: [{ validator: checkUser, trigger: "blur" }],
  password: [{ validator: password, trigger: "blur" }],
  passwords: [{ validator: passwords, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log("submit!", apiUrl.one);

      const data = await link({ url: apiUrl.one });
      console.log("data ===>>>", data);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss">
.login {
  height: 100%;
  background-color: blue;
  overflow: auto;

  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  .demo-ruleForm {
    width: 30%;
    margin: 50px auto;
    label {
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: #fff;
    }
    .block {
      display: block;
      width: 100%;
    }
    .login-btn {
      margin-top: 20px;
    }
  }
}
</style>