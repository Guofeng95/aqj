<template>
  <div id="app" @click="munugo(1)">
    <div class="head">

      <img class="logo"  src="/static/img/logo.gif" title="安全加" @click="indexgo">
      <h1 class="logofont" @click="indexgo">安全加</h1>
      <span class="logobeat" @click="indexgo">beta</span>
      <h2  @click="hlight('recommend')"><router-link id="recommend" class="tj" to="/recommend">推荐</router-link></h2>
      <h2  @click="hlight('inde')"><router-link id="inde" to="/">安全头条</router-link></h2>
      <h2 @click="hlight('know')"><a id="know"  class="know" href="http://zhishi.secjia.com/">安全知识</a></h2>
      <div class="search">
        <el-input
          placeholder="搜索安全信息"
          v-model="search"
          id="searchin"
          @focus="serkey">
        </el-input>
        <span class="span1" @click="gosearch"></span>
      </div>
      <div v-on:loginnow="changelog" class="loginno" v-show="loginis==false">
        <span @click="login(1)" style="margin-right:16px;">登录</span>
        <span @click="reset(1)">注册</span>
      </div>
      <div class="loginno" v-show="loginis">
        <a href="#/manenger" v-if="userlevel==1"><img style="margin-top:4px;margin-right:2px;" src="/static/img/messenger.png"/>管理</a>
        <!-- <a href="#/usercenter"><img style="margin-right:4px;" src="/static/img/user.png"/>用户中心</a> -->
        <a style="margin-right:130px;" href="#/usercenter">
          <el-badge :value="val" class="item">
            <img src="/static/img/ding.png"/>
          </el-badge>
        </a>
        <div class="userimg" @click.stop="munugo(2)">
          <img :src="userurl">
        </div>
        <div class="userstatus">
          {{userstatus}}
        </div>
        <div class="munu1" v-show="munuis">
          <div class="one">
            <img style="margin-top:4px;margin-left:-4px;margin-right:2px" src=" /static/img/level.png">
            <a  href="#/level">{{userstatus}}</a>
          </div>
          <div>
            <img style="margin-top:2px" src=" /static/img/star.png">
            <a   href="#/collection">我的收藏</a>
          </div>
          <div>
            <img style="margin-top:4px;margin-right:4px" src=" /static/img/wifi.png">
            <a  href="#/subscripe">我的订阅</a>
          </div>
          <div>
            <img style="margin-top:2px;" src=" /static/img/mail.png">
            <a  id="mail" href="#/comment">我的评论</a>
          </div>
          <div class="one">
            <img style="margin-top:6px;margin-left:2px;margin-right:2px" src=" /static/img/download.png">
            <a  href="#/download">我上传的</a>
          </div>

          <div class="one">
            <img style="margin-top:4px;margin-right:5px" src=" /static/img/shezhi.png">
            <a href="#/reset">设置</a>
          </div>
          <div >
            <img style="margin-top:6px;margin-right:2px" src=" /static/img/out.png">
            <a href="#" @click="removein">退出登录</a>
          </div> 
        </div>
      </div>
    </div>
    <div style="height:60px;"></div>
    <router-view/>
    <!-- <div class="indexbottom">
      © 2017 安全加 社区. All Rights Reserved.
      <span class="botline" ></span>
    </div> -->
    <span class="line"></span>
    <div class="background" v-show="resetis">
      <div class="aside1" id="reset" v-show="resetis">
        <h4>快速注册 <img class="cha" @click="reset" src="/static/img/cha.png"></h4>
        <div class="demo-input-suffix">
          <el-input class="verify" @change="check('remail')" v-model="remail" placeholder="请填写邮箱地址"></el-input>
           <el-button class="btn1" style="padding:0;"  type="success" @click="emalicode">验证码</el-button>
           <span  v-show="remailis" style="display:block;margin-top:6px;font-size: 12px;margin-left: 20px;color: red;">请填写正确的邮箱格式，不能为空</span>
        </div>
        <div class="inputcheck" style="padding-top:20px;">
          <el-input class='form' @change="check('rverify')" v-model="rverify" placeholder="请填写邮箱收到的验证码"></el-input>
          <span v-show="rverifyis">请填写验证码</span>
        </div>
        <div class="inputcheck">
          <el-input class='form' type="password" @change="check('rpassword')" v-model="rpassword" placeholder="请设置密码,6-14位字符"></el-input>
          <span  v-show="rpasswordis" >密码应为数字、字母、英文标点符号，长度为6-14位</span>
        </div>
        <div class="inputcheck" style="margin-bottom:10px;">
           <el-input class='form' type="password" @change="check('rtwopwd')" v-model="rtwopwd" placeholder="请再次输入刚才的密码"></el-input>
           <span  v-show="rtwopwdis" >两次密码不统一</span>
        </div>
        <div style="clear:both"></div>
        <a class="btn" @click="resetgo">立即注册</a>
        <div class="btna">
          <a style="background:#00cc33" :href="baseurl+'/user/wxlog'">
            <img style="margin-top:4px;margin-left:6px;margin-right:2px;" src="/static/img/wx.png">微信
          </a>
          <a style="background:#ff0000;margin-left:10px;margin-right:10px;" :href="baseurl+'/user/wblog'">
            <img style="margin-left:6px;" src="/static/img/wb.png">微博
          </a>
          <a style="background:#00ccff;line-height:34px;" :href="baseurl+'/user/qqlog'">
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
        <div class="aside1" id="log" v-show="logis">
          <h4>快速登录 <img class="cha" @click="login" src="/static/img/cha.png"></h4>
          <div class="inputcheck">
            <el-input class='form' v-model="username" placeholder="请填写手机号或邮箱"></el-input>
            <span  v-show="usernameis" >手机号或邮箱不存在</span>
          </div>
          <div class="inputcheck" style="margin-bottom:10px;">
           <el-input class='form' type="password" v-model="password" placeholder="请输入密码"></el-input>
           <span  v-show="passwordis" >密码错误请重新输入</span>
          </div>
          <div style="clear:both"></div>
          <a class="btn" @click="sublogin"><img src="/static/img/btn.png" />立即登录</a>
          <div class="btna">
            <a style="background:#00cc33" :href="baseurl+'/user/wxlog'">
              <img style="margin-top:4px;margin-left:6px;margin-right:2px;" src="/static/img/wx.png">微信
            </a>
            <a style="background:#ff0000;margin-left:10px;margin-right:10px;" :href="baseurl+'/user/wblog'">
              <img style="margin-left:6px;" src="/static/img/wb.png">微博
            </a>
            <a style="background:#00ccff;line-height:34px;" :href="baseurl+'/user/qqlog'">
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
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow',
      userlevel:'userlevelnow'
    })
  },
  data () {
    return {
      val:0,
      munuis:false,
      emalicodeis:false,
      baseurl:Url.baseurl,
      search: '',
      logis:false,
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
      timeer:''
    }
  },
  mounted(){
     var id2 = document.getElementById('inde');
     id2.style.color="#fda861";
    this.$store.state.loginis=false;
    var vm=this;
    //console.log(axios)
   axios({
        method:'post',
        url:vm.baseurl + '/user/ping',
    }).then(function(response){
        if(response.data.status==1){
          vm.$store.state.loginis=true;
          if(response.data.verified==1){
            vm.$store.state.userstatus="未认证"
          }else if(response.data.verified==2){
            vm.$store.state.userstatus="待确认"
          }else if(response.data.verified==3){
            vm.$store.state.userstatus="已认证"
          }
          vm.$store.state.userurl=response.data.avatar;
          vm.$store.state.userlevel=response.data.is_admin;
        }else{
          vm.$store.state.loginis=false;
        }
    });
    axios({
          method:'post',
          url:vm.baseurl + '/user/message_check_new',
      }).then(function(response){
          if(response.data.status==1){
            vm.val=response.data.count;
          }
      });
    this.timeer=setInterval(function(){
       axios({
          method:'post',
          url:vm.baseurl + '/user/message_check_new',
      }).then(function(response){
          if(response.data.status==1){
            vm.val=response.data.count;
          }
      });

    },60000)
    document.onkeydown=function(event){
      var e = event || window.event || arguments.callee.caller.arguments[0];
       if(e && e.keyCode==13){ // enter 键
              if(vm.$store.state.loginis==false  && vm.logis==true){
                vm.sublogin();
              }
        }
    }

    

  },
  methods:{
    indexgo(){
      window.location.href="#/"
    },
    serkey(){
      var vm=this;
      var id=document.querySelector(".search input");
      //console.log(id)
      id.onkeydown=function(e){
        if(e.keyCode==13){
          vm.gosearch();
        }
      }
    },
    gosearch(){
      sessionStorage.setItem("search",this.search)
      window.location.href="#/search?"+this.search;
    },
    hlight(name){
      var id1 = document.getElementById('recommend');
        id1.style.color="#ababab";
        var id2 = document.getElementById('inde');
        id2.style.color="#ababab";
        var id3 = document.getElementById('know');
         id3.style.color="#ababab";
        var id6 = document.getElementById(name);
        id6.style.color="#fda861";
    },
    munugo(index){
      if(index==2){
        if(this.munuis){
          this.munuis=false;
        }else{
           this.munuis=true;
        }
      }else{
        this.munuis=false;
      }
      
     
    },
    removein(){
        var vm=this;
        axios({
              method:'post',
              url:vm.baseurl + '/user/logout',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                
                console.log(response.data)
                vm.$store.state.loginis=false;
                window.location.href="#/"
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
        
      },
    emalicode(){
      var vm=this;
      if(this.remail !='' && this.remailis==false){
          var date= {};
          date.email=this.remail;
          date.for="register"
              var date1= {};
              date1.email=this.remail;
              date1.for="query"
              axios({
                method:'post',
                  data:qs.stringify(date1),
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
                vm.login();
                //console.log(response.data)
                  if(response.data.verified==1){
                    vm.$store.state.userstatus="未认证"
                  }else if(response.data.verified==2){
                    vm.$store.state.userstatus="待确认"
                  }else if(response.data.verified==3){
                    vm.$store.state.userstatus="已认证"
                  }
                  vm.$store.state.userurl=response.data.avatar;
                  vm.$store.state.userlevel=response.data.is_admin;
                vm.$store.state.loginis=true;
              }else{
                vm.$message.warning("账号密码错误");
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
                    vm.$message.success('注册成功');
                    vm.login();
                    window.location.reload();
                  }else{
                    vm.$message.error(response.data.msg);
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
.aside1 .inputcheck{
  position: relative;
  margin-bottom: 40px;
}
.aside1 .inputcheck span{
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
a{ text-decoration: none; color: #333;}
#app {
  width: 1200px;
  margin: 0 auto;
  background: white;
  overflow: auto;
  min-height: calc( 100vh - 81px);
}
.indexbottom{
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #d3d3d3;
  text-align: center;
  width: 100%;
  font-size: 14px;
  position: relative;
  margin-top: 20px;
}
.head{
  border-bottom: 1px solid #e4e4e4;
  height: 60px;
  position: fixed;
  top: 0;
  width: 1200px;
  z-index: 3;
  left:calc(50% - 600px);
  background: #f5f5f5;
}
.head .logo{
  display: block;
  float: left;
  margin-top: 14px;
  cursor: pointer;
}

.head .logofont,.head .logobeat {
  display: block;
  float: left;
  cursor: pointer;
}
.head .logofont{
  font-size: 28px;
  color: #6fba2c;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
}
.head .logobeat{
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 4px;
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
  
  /*color: #fda861;*/
}
.head .tj{
  width: 44px;
  height: 24px;
  border: 1px solid #fda861;
  text-align: center;
  line-height: 24px;
  border-radius: 4px;
  color: #ababab;
  margin-top: 18px;
}
.head .know{
  color: #ababab;
}
/*.head h2 a{ 
  color:#ababab;
}*/
.search{
  width: 182px;
  float: left;
  height: 30px;
  margin-top: 15px;
  margin-left: 20px;
  position: relative;
}
.search .span1{
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  right: 0;
  top: 0;
  background: url(/static/img/s.png) no-repeat center center;
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
.head .loginno  a{
  color: #6fba2c;
}
.head .loginno  .munu1 a{
  color: #a1a1a1;
}
.line{
  position: fixed;
  width: 100%;
  height: 60px;
  background: #f5f5f5;
  border-bottom: 1px solid #e4e4e4;
  top: 0px;
  left: 0;
  z-index: 1;
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
.aside1 h4{
    margin-bottom: 30px;
    margin-left: 10px;
    font-size: 18px;
  }
.aside1{
    width: 270px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    border-radius: 4px;
    padding:0 15px;
    padding-top: 26px;
    padding-right: 10px;
    overflow: hidden;
  }
.aside1 div{
    width: 290px;
    height: 30px;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .aside1 div p{
    width: 210px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .aside1 .form{
    height: 34px;
    width: 260px;
    margin-top: 4px;
  }
  .aside1 .btn{
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
  .aside1 .btn img{
    position: absolute;
    left: 60px;
    top: 4px;
  }
  .aside1 .btna a{
    width: 80px;
    height: 32px;
    border-radius: 6px;
    display: block;
    float: left;
    margin-top: 14px;
    color: #fff;
    line-height: 32px;
    text-decoration: none;
  }
  .aside1 div a img{
    display: block;
    float: left;
  }
  .aside1 div{
    clear: both;
  }
  .aside1 div p{
    width: 90px;
    float: left;
  }
  .aside1 .ahref{
    padding-top: 10px;
  }
  .aside1 .ahref a{
    display: block;
    float:left;
    color: #3399d6;
    font-size: 14px;
    text-decoration: none;
    line-height: 30px;
    margin-left: 10px;
  }
  .aside1 .ahref .forgot{
    margin-left: 70px;
  }
  .app{
    display: block;
    margin-bottom: 20px;
  }
  .more{
    position: relative;
  }
  
   .aside1 .diva{
    width: 120px;
    float: left;
    clear: none;
    margin-left: 10px;
  }
  .aside1 .diva a{
    text-decoration: none;
    color: #333;
  }
 #reset
  { 
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -247px;
    margin-left: -145px;
  }
  #log{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -202px;
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
 .aside1 .verify{
    width: 196px;
  }
  .background .aside  .form{
    margin-top: 20px;

  }
  .background .aside .btn{
    margin-top: 20px;
  }
  .munu1{
    float: left;
    top: 54px;
    right: 50px;
    width: 130px;
    border-radius: 4px;
    box-shadow:2px 2px 7px #ccc;
    padding-left: 3px;
    padding-right: 3px;
     position: absolute;
     background: #fff;
     z-index: 1000;
  }
  .munu1 div{
    width: 120px;
    margin:0 auto;
    height: 28px;
    line-height: 28px;
    margin-top: 4px;
  }
  .munu1 div img{
    display: block;
    float: left;
  }
  .munu1 .one{
    border-bottom:1px solid #f2f2f2; 
  }
  .munu1 div a{
    font-size: 14px;
    text-decoration: none;
    color: #333;
    margin: 0;
    font-weight: normal;
  }
  
</style>
