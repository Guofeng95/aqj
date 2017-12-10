<template>
  <div class="level">
  	<h4>重置密码</h4>
    <div  class="password">
      <el-input class="input" v-model="password" placeholder="请输入新密码"></el-input>
      <el-input class="input" v-model="newpwd" placeholder="请再输入一遍"></el-input>
      <el-button class="input" type="success" @click="subgo">提交</el-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  data () {
    return {
      password:'',
      newpwd:'',
      status:true,
      baseurl:Url.baseurl,
    }
  },
  methods:{
    subgo(){
      var vm=this;
      var date={};
      date.email=this.remail;
      date.for="reset_password"
      axios({
          method:'post',
          data:qs.stringify(date),
          url:vm.baseurl + '/user/verify_email',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(response){
          if(response.data.status==1){
            vm.emalicodeis=true;
          }else{
            vm.$message.success(response.data.msg)
          }
      });
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