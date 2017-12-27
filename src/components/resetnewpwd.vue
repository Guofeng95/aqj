<template>
  <div class="level">
  	<h4>重置密码</h4>
    <div  class="password" v-show="status">
      <div class="inputcheck">
          <el-input class='form' type="password" @change="check('rpassword')" v-model="password" placeholder="请设置密码,6-14位字符"></el-input>
          <span  v-show="passwordis" >密码应为数字、字母、英文标点符号，长度为6-14位</span>
        </div>
        <div class="inputcheck" >
           <el-input class='form' type="password" @change="check('rtwopwd')" v-model="newpwd" placeholder="请再次输入刚才的密码"></el-input>
           <span  v-show="newpwdis" >两次密码不统一</span>
        </div>
      <el-button class="input" type="success" @click="subgo">提交</el-button>
    </div>
    <div v-show="status==false">
      <h3 class="input" style="text-align:center">恭喜您，密码重置成功！</h3>
      <el-button class="input" type="success" @click="goback">返回首页并登录</el-button>
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
      passwordis:false,
      newpwdis:false,
      newpwd:'',
      status:true,
      baseurl:Url.baseurl,
    }
  },
  methods:{
    subgo(){
      var vm=this;
      if(this.password!='' && this.newpwd !=""){
        if(this.passwordis==false && this.newpwdis==false){
            var date={};
            date.new_password=this.password;
            axios({
                method:'post',
                data:qs.stringify(date),
                url:vm.baseurl + '/user/reset_password',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function(response){
                if(response.data.status==1){
                  vm.$message.success("修改成功");
                  vm.status=false;
                }else{
                  vm.$message.success(response.data.msg)
                }
            });
            
          }
      }else{
        vm.$message.error("请填写信息")
      }
      
    },
     check(style){
      if(style=="rpassword"){
        var isok=/^[a-zA-Z0-9,.'"]{6,14}$/.test(this.password);
        if(isok){
          this.passwordis=false;
        }else{
          this.passwordis=true;
        }
      }
      if(style=="rtwopwd"){
        if(this.newpwd==this.password){
          this.newpwdis=false;
        }else{
          this.newpwdis=true;
        }
      }
    },
    goback(){
      window.location.href="/"
    }
  }
}
</script>
<style scoped>
 .inputcheck{
  width: 280px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 40px;
}
.inputcheck span{
  position: absolute;
  font-size: 12px;
  margin-left: 0px;
  color: red;
  top: 50px;
}
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
    margin-bottom: 40px;
  }

</style>