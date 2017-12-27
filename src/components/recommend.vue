<template>
  <div class="index">
    <div class="left">
      <div class="leftcontent" v-show="activeis" style="margin-bottom:60px;">
        <div class="block" style="position:relative;">
          <span class="demonstration">Click 指示器触发</span>
          <el-carousel trigger="click" height="300px">
            <el-carousel-item v-for="(item,index) in activeurl" :key="index">
              <img :src="item.url" style="width:900px;height:300px;">
            </el-carousel-item>
          </el-carousel>
        </div>
       </div> 
     <div class="leftcontent" v-if="indexdata.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2" >
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag1)">{{tag1}}</span>
       </div>
     </div> 
     <div class="leftcontent" v-if="indexdata2.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata2" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2" >
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag2)">{{tag2}}</span>
       </div>
     </div> 
     <div class="leftcontent" v-if="indexdata3.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata3" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2">
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag3)">{{tag3}}</span>
       </div>
     </div> 
     <div class="leftcontent" v-if="indexdata4.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata4" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2" >
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag4)">{{tag4}}</span>
       </div>
     </div> 
     <div class="leftcontent" v-if="indexdata5.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata5" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2">
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag5)">{{tag5}}</span>
       </div>
     </div> 
    </div>
    <div class="right">
      <div class="aside" v-show="loginis">
          <h4>热门推荐</h4>
          <div v-for="(item,index) in hotdata" :key='index'>
            <span class="span" style="background:#3a9e00;" v-if="index==0">{{index+1}}</span>
            <span class="span" style="background:#ff9933;" v-else-if="index==1">{{index+1}}</span>
            <span class="span" style="background:#ff0000;" v-else-if="index==2">{{index+1}}</span>
            <span class="span" v-else>{{index}}</span>
            <p class="hotp">{{item.content}}</p>
          </div>
      </div>
      <div class="aside" v-show="loginis==false">
        <h4>快速登录</h4>
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
          <a href="#" @click="login(1)">注册</a><a class="forgot" href="/forget">忘记密码</a>
        </div>
      </div>
      <div class="aside">
        <img class="app" src="/static/img/app.png">
      </div>
      <div class="more">
        <qun></qun>
      </div>
      <div class="aside" style="margin-top:20px;">
        <h4>行业分类</h4>
        <div class="diva" v-for="(item,index) in adata" :key="index">
          <a :href="item.url">{{item.name}}</a>
        </div>
      </div>
      <div class="aside" style="padding-top:0px; text-align:center;margin-top:20px;">
        <img style="margin-top:20px" src="/static/img/bottom.png">
      </div>
      
    </div>
    <div class="background" v-show="resetis">
      <div class="aside" id="reset" v-show="resetis">
        <h4>快速注册 <img class="cha" @click="login" src="/static/img/cha.png"></h4>
        <div class="demo-input-suffix">
          <el-input class="verify" @change="check('remail')" v-model="remail" placeholder="请填写邮箱地址"></el-input>
           <el-button class="btn1"  type="success" @click="emalicode">验证码</el-button>
           <span  v-show="remailis" style="display:block;margin-top:6px;font-size: 12px;margin-left: 20px;color: red;">请填写正确的邮箱格式，不能为空</span>
        </div>
        <div class="inputcheck" style="padding-top:10px;">
          <el-input class='form'  @change="check('rverify')" v-model="rverify" placeholder="请填写邮箱收到的验证码"></el-input>
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
          <a href="#" @click="login">登录</a><a class="forgot" href="/forget">忘记密码</a>
        </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import qun from '@/components/common/qun'
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  name: 'recommend',
  components: {
    qun
   },
  computed:{
    ...mapGetters({
      loginis:'loginnow'
    })
  },
  data () {
    return {
      adata:[
           {"name":"安全知识","url":"http://zhishi.secjia.com"},
          {"name":"黑客街","url":"http://www.hackjie.com"},
          {"name":"东轩'sBLOG","url":"http://www.dxblog.cn"},
          {"name":"即刻安全","url":"http://www.secist.com"},
          {"name":"Luan's Blog ","url":"http://lu4n.com"},
          {"name":"被黑站点统计","url":"http://www.hacked.com.cn"},
          {"name":"指尖安全","url":"http://www.secfree.com"}
      ],
      activeurl:[
        {"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"},
        {"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"},
        {"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"},

      ],
      remail:'',
      rverify:'',
      rpassword:'',
      rtwopwd:'',
      username:'',
      resetis:false,
      password:'',
      newcontentis:true,
      indexdata:[
          {"imgurl":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg","title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows"}
      ],
      indexdata2:[],
      indexdata3:[],
      indexdata4:[],
      indexdata5:[],
      hotdata:[
            {
              "content":"转移战场”的暗网市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣市场继续繁荣市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣"
            },
             {
              "content":"转移战场”的暗网市场继续繁荣市场继续繁荣"
            },

      ],
      baseurl:Url.baseurl,
      emalicodeis:false,
      rpasswordis:false,
      rtwopwdis:false,
      remailis:false,
      rverifyis:false,
      usernameis:false,
      passwordis:false,
      tag1:'',
      tag2:'',
      tag3:'',
      tag4:'',
      tag5:'',
      activeis:false
    }
  },
  mounted(){
    this.userdataget();
  },
  methods:{
      scripe(name){
        sessionStorage.setItem("subscripe", name);
        window.location.href="/insubscripe"
      },
     article(id){
        window.location.href='/article?topid='+id;
      },
      userdataget(){
        var vm=this;
          axios({
              method:'post',
              url:vm.baseurl + '/article/news_topic_list',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                  var arr=response.data.topic_data;
                  var l=arr.length;
                  for(var i=0;i<l;i++){
                    if(i==0){
                      vm.tag1=arr[i].keyword;
                      vm.indexdata=arr[i].news_data;
                    }else if(i==1){
                      vm.tag2=arr[i].keyword;
                      vm.indexdata2=arr[i].news_data;
                    }else if(i==2){
                      vm.tag3=arr[i].keyword;
                      vm.indexdata3=arr[i].news_data;
                    }else if(i==3){
                      vm.tag4=arr[i].keyword;
                      vm.indexdata4=arr[i].news_data;
                    }else if(i==4){
                      vm.tag5=arr[i].keyword;
                      vm.indexdata5=arr[i].news_data;
                    }
                  }
              }
          })
      },
      newcon(){
        this.newcontentis=false;
      },
      login(num){
        if(num==1){
          this.resetis=true;
        }else{
          this.resetis=false;
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
                vm.login();
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
          }).catch(function(error){
            console.log(error)
          })
          

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
  }

}
</script>

<style scoped>
.demonstration{
  position: absolute;
  background:rgba(255,118,0,0.8);
  color: #fff;
  height: 40px;
  width: 900px;
  display: block;
  top:300px;
  line-height: 40px;
  text-align: center;
}
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
.index{
  margin-top: 20px;
  width: 1300px;
  overflow: hidden;
}
.left{
  width: 924px;
  float: left;
  margin-right:22px;
  border-right: 1px solid #d7d7d7;
}
.right{
  float: left;
  width: 302px;
}
.leftcontent{
  width: 900px;
  border-radius: 3px;
  margin-bottom: 20px;
  border: 1px solid #ebebeb;
  box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
}
.out{
  position: relative;
  width: 100%;
  height: 250px;
  border:1px solid #d7d7d7;
}
.out .oneimg{
  width: 100%;
  height: 250px;
}
.out .onespan{
  position: absolute;
  cursor: pointer;
  bottom: 0;
  left: 0;
  width:calc( 100% - 40px);
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color:#fff; 
  padding:0 20px;
  background-color: #ff8a00;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.out1,.out2{
  width: 100%;
  height: 130px;
  border-bottom: 1px dashed #ccc;
  position: relative;
}
.out2{
  height: 35px;
  color:#A1A1A1;
  font-size: 14px;
  padding-top: 10px;
  border-bottom: 1px solid #ccc;
}
.out2 .wbtn{
  background: #ff8a00;
  color: #fff;
  border-radius: 4px;
  padding: 4px 6px;
  margin-left: 14px;
  margin-top: 16px;
  cursor: pointer;
}
.out1 .ospan{
  cursor: pointer;
  display: block;
  width: 650px;
  padding-left: 20px;
  height: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
   white-space: nowrap;
  line-height: 130px;
}
.out1 .ospan:hover{
  color: #ff8a00;
}

.out1 .oimg{
  position: absolute;
  right:20px;
  top: 20px;
  width: 160px;
  height: 90px;
}
.news {
  border-bottom: 2px dashed #f2f2f2;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 10px;
  position: relative;
}
.news h4{
  font-size: 18px;
}
.news p{
  font-size: 14px;
}
.newsone img{
  display: block;
  width: 320px;
  height: 180px;
  float: left;
  margin-right:10px; 
}
.newsone p{
  margin-top: 20px;
  margin-bottom: 40px;
}
.icon{
  position: absolute;
  right: 0;
  bottom: 10px;
  color: #aeaeae;
}
.newstwo img{
  display: block;
  width: 220px;
  height: 120px;
  float: left;
  margin-left: 28px;
  margin-top: 12px;
  margin-bottom: 40px;
}
.newsthree p{
  margin-top: 40px;
  margin-bottom: 40px;
}
.conbot{
  color: #fff;
  text-align: center;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  margin: 10px 0;
  border-radius: 6px;
  background:rgba(111, 186, 44, 1);
  cursor: pointer;
}
.aside{
    width: 326px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    padding:0 15px;
    padding-top: 26px;
    padding-right: 10px;
    overflow: hidden;
  }
  .aside h4{
    margin-bottom: 30px;
    margin-left: 10px;
    font-size: 18px;
  }
  .aside .span{
    width: 20px;
    display: block;
    float: left;
    text-align: center;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    background: #aeaeae;
    border-radius: 100%;
    color: white;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 10px;
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
  .aside div .hotp{
    width: 200px;
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
  #reset{
    width: 270px;
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
