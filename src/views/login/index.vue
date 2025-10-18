<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width: 480px;">
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="" style="height: 170px;"/>
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handleChange">{{ formType ? '返回登录' : '注册账号'}}</el-link>
            </div>
            <el-form :model="loginForm" style="max-width: 600px" class="demo-ruleForm" :rules="rules" ref="loginFormRef">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" :prefix-icon="UserFilled"></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" type="password" placeholder="密码" :prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item v-if="formType" prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock">
                        <!-- 点击发送验证码 按钮 -->
                        <template #append>
                            <span @click="countdownChange">{{ countdown.validText }}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :style="{ width: '100%' }" @click="submitForm(loginFormRef)">
                        {{ formType ? '注册账号' : '登录' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import {getCode,userAuthentication,login,menuPermissions} from '@/api'
import { Lock, UserFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive, ref,computed } from 'vue';
import { useRouter } from 'vue-router';
import { Store, useStore } from 'vuex';
// 单独引入ElMessage可能不能正常显示该组件的位置和样式，还需补充引入以下文件
import 'element-plus/es/components/message/style/css'; 

const imgUrl = new URL('../../../public/login-nav.png', import.meta.url).href

const router = useRouter()
const store = useStore()

const routerList = computed(() => (store.state.menu.routerList))

// 表单数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode:''
})

// 切换表单(0登录 1注册)
const formType = ref(0)
const handleChange = () => {
    formType.value = formType.value ? 0 : 1  
}

// 账号校验规则
const validUser = (rule,value,callback) => {
    // 不能为空
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        const phoneReg = /^1(3[0-9]|4[01456789]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        phoneReg.test(value) ? callback() : callback(new Error('请输入格式正确的手机号'))
    }
}

// 密码校验
const validPwd = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    }
    else {
        const pwdReg = /^[a-zA-Z0-9]{4,16}$/
        pwdReg.test(value) ? callback() : callback(new Error('请输入格式正确的密码'))
    }
}

// 表单校验
const rules = reactive({
    userName: [{ validator: validUser, trigger: 'blur' }],
    passWord: [{ validator: validPwd, trigger:'blur'}]
})

// 点击发送短信验证码
const countdown = reactive({
    validText: '获取验证码',
    time: 60
})
// 验证短信是否已发送（在60秒内只发送一次）
let flag = false
const countdownChange = () => {
    // 如果短信已发送，则不处理
    if (flag) return 
    // 校验手机号格式是否正确
    const phoneReg = /^1(3[0-9]|4[01456789]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
        return ElMessage({
            message: '请输入正确的手机号',
            type: 'warning',
        })
    }

    // 倒计时
    const time = setInterval(() => {
        if (countdown.time <= 0) {
            countdown.time = 60
            countdown.validText = '获取验证码'
            flag = false
            // 清除定时器，以免重复倒计时
            clearInterval(time)
        }
        else {
            countdown.time -= 1
            countdown.validText = `剩余${countdown.time}s`
        }
    }, 1000)
    flag = true 
    getCode({ tel: loginForm.userName }).then(({ data }) => {
        // console.log(data,'data')
        if (data.code === 10000) {
            ElMessage.success('发送成功')
        }
    })
}

// 提交表单
// 表单校验 
const loginFormRef = ref()
const submitForm = async (formEl) => {
    if (!formEl) return
    // 手动触发校验
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log()
            console.log(loginForm, 'submit!')
            // 注册页面
            if (formType.value) {
                userAuthentication(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('注册成功，请登录')
                        // 跳转到登录页面
                        formType.value = 0
                    }
                })
            }
            // 登录页面
            else {
                login(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('登录成功！')
                        console.log(data)
                        // 将token和用过户信息缓存到浏览器
                        localStorage.setItem('pz_token', data.data.token)
                        localStorage.setItem('pz_userInfo', JSON.stringify(data.data.userInfo))
                        menuPermissions().token(({ data }) => {
                            store.commit('dynamicMenu', data.data)
                            console.log('routerList',routerList)
                            router.push('/')
                        })
                    }
                })
            }
        }
        else {
            console.log(fields,'error submit!')
        }
    })
}

</script>

<style lang="less" scoped>
:deep(.el-card__header) {
    padding: 0;
  }
  .login-container {
    height: 100%;
    background-image: url('/login-bg.png');
    background-size: cover; /* 覆盖整个容器 */
    background-position: center; /* 居中显示 */
    background-repeat: no-repeat; /* 不重复 */
    background-attachment: fixed; /* 固定背景，内容滚动时背景不动 */
    .card-header{
      background-color: #d0f9f4;
      img {
        width: 430px;
      }
    }
    .jump-link {
      text-align: right;
      margin-bottom: 10px;
    }
  }
</style>

