<template>
  <div id="app">
    <div class="head">
      <img class="logo" src="/static/img/logo.png" title="logo">
      <router-link class="tj" to="/recommend">推荐</router-link>
      <router-link to="/">安全头条</router-link>
      <router-link class="know" to="/bar">安全知识</router-link>
      <div class="search">
        <el-input
          placeholder="搜索安全信息"
          suffix-icon="el-icon-search"
          v-model="search">
        </el-input>
      </div>
      <div v-on:loginnow="changelog" class="loginno" v-show="loginis==false">
        <span @click="login(1)" style="margin-right:16px;">登录</span>
        <span @click="reset(1)">注册</span>
      </div>
      <div class="loginno" v-show="loginis">
        <a href="#/manenger"><img src="/static/img/messenger.png"/>管理</a>
        <a href="#/usercenter"><img src="/static/img/user.png"/>用户中心</a>
        <a style="margin-right:130px;" href="#"><img src="/static/img/ding.png"/></a>
        <div class="userimg">
          <img src="http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg">
        </div>
        <div class="userstatus">
          {{userstatus}}
        </div>
      </div>
    </div>
    <router-view/>
    <span class="line"></span>
    <div class="background" v-show="resetis">
      <div class="aside" id="reset" v-show="resetis">
        <h4>快速注册 <img class="cha" @click="reset" src="/static/img/cha.png"></h4>
        <div class="demo-input-suffix">
          <el-input class="verify" @change="check('remail')" v-model="remail" placeholder="请填写邮箱地址"></el-input>
           <el-button class="btn1"  type="success" @click="emalicode">验证码</el-button>
           <span  v-show="remailis" style="display:block;margin-top:6px;font-size: 12px;margin-left: 20px;color: red;">请填写正确的邮箱格式，不能为空</span>
        </div>
        <div class="inputcheck" style="padding-top:10px;">
          <el-input class='form' @change="check('rverify')" v-model="rverify" placeholder="请填写邮箱收到的验证码"></el-input>
          <span v-show="rverifyis">请填写验证码</span>
        </div>
        <div class="inputcheck">
          <el-input class='form' @change="check('rpassword')" v-model="rpassword" placeholder="请设置密码,6-14位字符"></el-input>
          <span  v-show="rpasswordis" >密码应为数字、字母、英文标点符号，长度为6-14位</span>
        </div>
        <div class="inputcheck" style="margin-bottom:10px;">
           <el-input class='form' @change="check('rtwopwd')" v-model="rtwopwd" placeholder="请再次输入刚才的密码"></el-input>
           <span  v-show="rtwopwdis" >两次密码不统一</span>
        </div>
        <div style="clear:both"></div>
        <a class="btn" @click="resetgo">立即注册</a>
        <div class="btna">
          <a style="background:#00cc33">
            <img style="margin-top:4px;margin-left:6px;margin-right:2px;" src="/static/img/wx.png">微信
          </a>
          <a style="background:#ff0000;margin-left:10px;margin-right:10px;">
            <img style="margin-left:6px;" src="/static/img/wb.png">微博
          </a>
          <a style="background:#00ccff;line-height:34px;">
            <img style="margin-left:8px;margin-top:2px;margin-right:3px;" src="/static/img/qq.png">QQ
          </a>
        </div>
        <div class="ahref">
          <p>已有账号？</p>
          <a href="#" @click="login(2)">登录</a><a @click="reset" class="forgot" href="#/forget">忘记密码</a>
        </div>
      </div>
      </div>
      <div class="background" v-show="logis">
        <div class="aside" id="log" v-show="logis">
          <h4>快速登录 <img class="cha" @click="login" src="/static/img/cha.png"></h4>
          <div class="inputcheck">
            <el-input class='form' v-model="username" placeholder="请填写手机号或邮箱"></el-input>
            <span  v-show="usernameis" >手机号或邮箱不存在</span>
          </div>
          <div class="inputcheck" style="margin-bottom:10px;">
           <el-input class='form' v-model="password" placeholder="请输入密码"></el-input>
           <span  v-show="passwordis" >密码错误请重新输入</span>
          </div>
          <div style="clear:both"></div>
          <a class="btn" @click="sublogin"><img src="/static/img/btn.png" />立即登录</a>
          <div class="btna">
            <a style="background:#00cc33">
              <img style="margin-top:4px;margin-left:6px;margin-right:2px;" src="/static/img/wx.png">微信
            </a>
            <a style="background:#ff0000;margin-left:10px;margin-right:10px;">
              <img style="margin-left:6px;" src="/static/img/wb.png">微博
            </a>
            <a style="background:#00ccff;line-height:34px;">
              <img style="margin-left:8px;margin-top:2px;margin-right:3px;" src="/static/img/qq.png">QQ
            </a>
          </div>
          <div class="ahref">
            <p>还没有账号？</p>
            <a href="#" @click="reset(2)">注册</a><a @click="login" class="forgot" href="#/forget">忘记密码</a>
          </div>
      </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  name: 'app',
  computed:{
    ...mapGetters({
      loginis:'loginnow'
    })
  },
  data () {
    return {
      emalicodeis:false,
      baseurl:Url.baseurl,
      search: '',
      logis:false,
      userstatus:"未认证",
      resetis:false,
      remail:'',
      rverify:'',
      rpassword:'',
      rtwopwd:'',
      username:'',
      password:'',
      rpasswordis:false,
      rtwopwdis:false,
      remailis:false,
      rverifyis:false,
      usernameis:false,
      passwordis:false,
    }
  },
  mounted(){

    this.$store.state.loginis=false;
    var vm=this;
    //console.log(axios)
    axios({
        method:'post',
        url:vm.baseurl + '/user/ping',
    }).then(function(response){
        if(response.data.status==1){
          vm.$store.state.loginis=true;
        }else{
          vm.$store.state.loginis=false;
        }
    });
  

  },
  methods:{
    emalicode(){
      var vm=this;
      if(this.remail !='' && this.remailis==false){
          var date= {};
          date.email=this.remail;
          date.for="register"
          var vm=this;
              var date= {};
              date.email=this.remail;
              date.for="query"
              axios({
                method:'post',
                  data:qs.stringify(date),
                  url:vm.baseurl + '/user/verify_email',
                 headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(function(response){
                  if(response.data.status!=1){
                      axios({
                          method:'post',
                          data:qs.stringify(date),
                          url:vm.baseurl + '/user/verify_email',
                         headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                      }).then(function(response){
                          if(response.data.status==1){
                            vm.$message.success('验证码已发送');
                            vm.emalicodeis=true;
                          }else if(response.data.status==0){
                            vm.$message.success(response.data.msg);
                            vm.emalicodeis=true;
                          }else{
                            vm.$message.warning(response.data.msg);
                          }
                      });


                  }else{
                    vm.$message.warning("此邮箱已经注册");
                  }
              });
      // console.log(date) 
      }else{
        this.check('remail');

      }

    },
    reset(index){
      if(index==1){
        this.resetis=true;
      }else if(index==2){
        this.resetis=true;
        this.logis=false;
      }else {
        this.resetis=false;
      }
      
    },
    login(index){
      if(index==1){
        this.logis=true;
      }else if(index==2){
        this.resetis=false;
        this.logis=true;
      }else{
        this.logis=false;
      }
    },
    changelog(data){
      if(data[0]=="ok"){
        this.logis=2;
      }
    },
    sublogin(){
      var vm=this;
      if(this.username!='' && this.password!=""){
          var date={};
          date.username=this.username;
          date.password=this.password;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/user/login',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                
                console.log(response.data)
                this.login();
                vm.$store.state.loginis=true;
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
          

      }else{
        this.$message.error('请填写信息');
      }
      
    },
    check(style){
      if(style=="remail"){
        var isok=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.remail);
        if(isok){
          this.remailis=false;
        }else{
          this.remailis=true;
          this.emalicodeis=false;
        }
      }
      if(style=="rverify"){
        if( this.rverify==''){
          this.rverifyis=true;
        }else{
          this.rverifyis=false;
        }
      }

      if(style=="rpassword"){
        var isok=/^[a-zA-Z0-9,.'"]{6,14}$/.test(this.rpassword);
        if(isok){
          this.rpasswordis=false;
        }else{
          this.rpasswordis=true;
        }
      }
      if(style=="rtwopwd"){
        if(this.rtwopwd==this.rpassword){
          this.rtwopwdis=false;
        }else{
          this.rtwopwdis=true;
        }
      }
    },
    resetgo(){
      var vm=this;
      if(this.rpasswordis==false && this.rverifyis==false && this.remailis==false && this.rtwopwdis==false){
        if(this.rpassword!="" && this.rverify!='' && this.remail!='' && this.rtwopwd!=''){
            if(this.emalicodeis==true){
              var nickname="社区用户";
              axios({
                  method:'post',
                  data:qs.stringify({"verification_code":this.rverify,"username":this.remail,"password":this.rpassword,"password1":this.rtwopwd,"nickname":nickname}),
                  url:vm.baseurl + '/user/register',
              }).then(function(response){
                  if(response.data.status==1){
                    vm.$message.warning('注册成功');
                    vm.login(2);
                  }else{
                    alert(response.data.msg);
                  }
              });
            }else{
              this.$message.warning('请获取验证码');
            }
        }else{
          this.$message.error('请填写信息');
        }
      }
    }
  }
}
</script>

<style>
.aside .inputcheck{
  position: relative;
  margin-bottom: 40px;
}
.aside .inputcheck span{
  display: block;
  font-size: 12px;
  margin-left: 0px;
  color: red;
}
*{padding: 0;margin: 0;font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}
html body{
  width: 100%;
  height: 100%;
  color: #333;
}
li{list-style: none;};
a{text-decoration: none; color: #333;}
#app {
  width: 1300px;
  margin: 0 auto;
  background: white;
  overflow: auto;
}
.head{
  border-bottom: 1px solid #e4e4e4;
  height: 60px;
}
.head .logo{
  display: block;
  float: left;
  margin-top: 10px;
}
.head a{
  display: block;
  float: left;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 40px;
  color: #6fba2c
}
.head .tj{
  width: 44px;
  height: 24px;
  border: 1px solid #ffd6eb;
  text-align: center;
  line-height: 24px;
  border-radius: 4px;
  color: #ababab;
}
.head .know{
  color: #333;
}
.search{
  width: 182px;
  float: left;
  height: 30px;
  margin-top: 15px;
  margin-left: 20px;
}
.search input{
  height: 30px;
  background: #f2f2f2;
}
.search .el-input__suffix{
  top: -4px;
}
.loginno{
  display: block;
  float: right;
  position: relative;
}
.loginno span{
  color: #6fba2c;
  font-size: 16px;
  margin-top: 20px;
  display: block;
  float: left;
  cursor: pointer;
}
.line{
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  top: 60px;
  left: 0;
}
.loginno img{
  display: block;
  float: left;
}
.loginno a{
  margin-left: 26px;
}
.userimg{
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 100%;
  overflow: hidden;
  position: absolute;
  right: 60px;
  cursor: pointer;
  top: 10px;
}
.userimg img{
  width: 40px;
  height: 40px;
}
.userstatus{
  width: 40px;
  height: 16px;
  border: 1px solid #ffc57f;
  color: #ffc57f;
  border-radius: 4px;
  position: absolute;
  font-size: 12px;
  text-align: center;
  right: 10px;
  top: 20px;
}
 .aside h4{
    margin-bottom: 30px;
    margin-left: 10px;
    font-size: 18px;
  }
.aside{
    width: 270px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    border-radius: 4px;
    padding:0 15px;
    padding-top: 26px;
    padding-right: 10px;
    overflow: hidden;
  }
.aside div{
    width: 290px;
    height: 30px;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .aside div p{
    width: 210px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .aside .form{
    height: 34px;
    width: 260px;
    margin-top: 4px;
  }
  .aside .btn{
    display: block;
    height: 36px;
    width: 260px;
    border-radius: 4px;
    background: #ff0000;
    color: #fff;
    line-height: 36px;
    text-align: center;
    position: relative;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
  }
  .aside .btn img{
    position: absolute;
    left: 60px;
    top: 4px;
  }
  .aside .btna a{
    width: 80px;
    height: 32px;
    border-radius: 6px;
    display: block;
    float: left;
    margin-top: 14px;
    color: #fff;
    line-height: 32px;
  }
  .aside div a img{
    display: block;
    float: left;
  }
  .aside div{
    clear: both;
  }
  .aside div p{
    width: 90px;
    float: left;
  }
  .aside .ahref{
    padding-top: 10px;
  }
  .aside .ahref a{
    display: block;
    float:left;
    color: #3399d6;
    font-size: 14px;
    text-decoration: none;
    line-height: 30px;
    margin-left: 10px;
  }
  .aside .ahref .forgot{
    margin-left: 70px;
  }
  .app{
    display: block;
    margin-bottom: 20px;
  }
  .more{
    position: relative;
  }
  .more span{
    display: block;
    width: 40px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 50px;
    cursor: pointer;
  }
  .more .tu{
    cursor: pointer;
    width: 90px;
    height: 90px;
    left: 24px;
    top: 80px;
  }
   .aside .diva{
    width: 120px;
    float: left;
    clear: none;
    margin-left: 10px;
  }
  .aside .diva a{
    text-decoration: none;
    color: #333;
  }
  #reset,#log{
    position: absolute;
    left: 50%;
    top: 180px;
    margin-left: -145px;
  }
  .background{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 6;
  }
  .cha{
    display: block;
    position: absolute;
    right: 26px;
    cursor: pointer;
    top: 26px;
  }
  .btn1{
    width: 60px;
    height: 38px;
    text-align: center;
    padding-left:0;
    padding-right:0;
  }
 .aside .verify{
    width: 196px;
  }
  .background .aside  .form{
    margin-top: 20px;

  }
  .background .aside .btn{
    margin-top: 20px;
  }
</style>
