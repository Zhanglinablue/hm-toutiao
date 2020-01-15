<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
 <van-cell-group>
   <van-field v-model="loginform.mobile"  :error-message="errmg.mobile" @blur="errormobile" label="手机号" placeholder="请输入手机号"></van-field>
   <van-field v-model="loginform.code" :error-message="errmg.code" @blur="errorcode" label="验证码" placeholder="请输入验证码">
      <van-button slot="button" size="small" type="primary">发送验证码</van-button>
   </van-field>
 </van-cell-group>
 <div class='btn-box'>
   <van-button type="info" @click="login" size="small" round  block>登录</van-button>
</div>
  </div>
</template>

<script>
// import '../../utils/plugin'
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginform: {
        mobile: '13911111111',
        code: '246810'
      },
      errmg: {
        mobile: null,
        code: null
      }
    }
  },
  methods: {

    errormobile () {
      if (!this.loginform.mobile) {
        this.errmg.mobile = '请输入手机号'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginform.mobile)) {
        this.errmg.mobile = '请输入正确的手机号格式'
        return false
      }
      this.errmg.mobile = null
      return true
    },
    errorcode () {
      if (!this.loginform.code) {
        this.errmg.code = '请输入验证码'
        return false
      }
      if (!/^\d{6}$/.test(this.loginform.code)) {
        this.errmg.code = '请输入正确格式验证码'
        return false
      }
      this.errmg.code = null
      return true
    },
    async  login () {
      if (this.errormobile() && this.errorcode()) {
        const data = await login(this.loginform)
        this.updateUser({ user: data })
        this.$gnotify({ type: 'success', message: '登陆成功' })
        let { directUrl } = this.$route.query
        this.$router.push(directUrl || '/')
      }
    },
    ...mapMutations(['updateUser'])
  }

}
</script>

<style lang="less" scoped>
 .btn-box {
     padding: 20px;
   }
</style>
