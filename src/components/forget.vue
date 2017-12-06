<template>
  <div class="level">
  	<h4>重置密码</h4>
    <div v-show="status">
      <el-input class="input" v-model="eamil" placeholder="请输入注册时填写的邮箱地址"></el-input>
      <el-button class="input" type="success" @click="eamilgo">发送邮件</el-button>
    </div>
    <div v-show="status==false" class="password">
      <el-input class="input" v-model="password" placeholder="请输入新密码"></el-input>
      <el-input class="input" v-model="newpwd" placeholder="请再输入一遍"></el-input>
      <el-button class="input" type="success" @click="subgo">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      eamil:'',
      password:'',
      newpwd:'',
      status:true
    }
  },
  methods:{
    eamilgo(){
      this.status=false;
    },
    subgo(){
      window.location.href="#/"
    }
  }
}
</script>
<style scoped>
  .level{
    width: 790px;
    height: 432px;
    background-color:#fff;
    box-shadow: 0 0 8px 0 rgba(0,59,89,0.15);
    border-radius: 6px;
    margin:100px auto;
  }
  .level h4{
    font-size: 24px;
    padding-top: 60px;
    padding-bottom: 30px;
   text-align: center;
  }
  .level .input{
    width: 280px;
    display: block;
    margin:20px auto;
    margin-bottom: 60px;
  }
  .level .password .input{
    margin-top: 0;
    margin-bottom: 40px;
  }
</style>