<template>
  <div class="level">
  	<h4>重置密码</h4>
    <div v-show="status">
      <el-input class="input" v-model="email" placeholder="请输入注册时填写的邮箱地址"></el-input>
      <p class="input" style="color:red;height:20px;font-size：14px;">{{error}}</p>
      <el-button class="input" type="success" @click="eamilgo">发送邮件</el-button>
    </div>
    <div v-show="status==false">
      <p class="input" style="width:400px;font-size:14px">
        尊敬的用户，我们已向您提供的邮箱<span style="color:red">{{email}}</span>发送了一封邮件。请进到该邮箱查收，并按照邮件提示的信息操作。
      </p>
      <el-button class="input" type="success" @click="eamilgo">没有收到，重新验证邮件</el-button>
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
      email:'',
      password:'',
      newpwd:'',
      status:true,
      baseurl:Url.baseurl,
      error:''
    }
  },
  methods:{
    eamilgo(){
      var vm=this;
      var date={};
      this.error="";
      var isok=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.email);
      date.email=this.email;
      date.for="reset_password"
      if(isok){
              var date1= {};
              date1.email=this.email;
              date1.for="query"
              axios({
                method:'post',
                  data:qs.stringify(date1),
                  url:vm.baseurl + '/user/verify_email',
                 headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(function(response){
                  if(response.data.status==1){
                      axios({
                          method:'post',
                          data:qs.stringify(date),
                          url:vm.baseurl + '/user/verify_email',
                         headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                      }).then(function(response){
                          if(response.data.status==1){
                            vm.staus=false;
                          }else{
                            vm.$message.success(response.data.msg)
                          }
                      });


                  }else{
                    vm.error="此邮箱未注册"
                  }
              });

      }else{
         vm.error="邮箱格式错误"
      }
      
      
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
  }
  .level .password .input{
    margin-top: 0;
    margin-bottom: 40px;
  }
</style>