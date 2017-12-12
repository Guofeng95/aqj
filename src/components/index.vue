<template>
  <div class="index">
    <div class="left">
      <div class="newcontent" v-show="newcontentis">
        <span @click="newcon">有新的文章发布啦,<span style="color:#52a4fb;">刷新一下</span>,查看新内容！</span>
      </div>
      <div class="news" v-for="(item,index) in indexdata" :key="index">
        <div class="newsone" v-if="item.form==1">
          <img :src="item.url[0]">
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
        <div class="newstwo" v-else-if="item.form==2">
          <h4>{{item.title}}</h4>
          <div>
            <img style="margin-left:0;" :src="item.url[0]">
            <img :src="item.url[1]">
            <img :src="item.url[2]">
            <img :src="item.url[3]">
          </div>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
        <div class="newsthree" v-else-if="item.form==3">
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
      </div>
      <div class="conbot">
        查看更多 精彩文章
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
          <a href="#" @click="login(1)">注册</a><a class="forgot" href="#/forget">忘记密码</a>
        </div>
      </div>
      <div class="aside">
        <img class="app" src="/static/img/app.png">
      </div>
      <div class="more">
        <img style="margin-top:10px" src="/static/img/qun.png">
        <span ></span>
        <span class="tu"></span>
      </div>
      <div class="aside" style="margin-top:20px;">
        <h4>友情链接</h4>
        <div class="diva" v-for="(item,index) in adata" :key="index">
          <a :href="item.url">{{item.name}}</a>
        </div>
      </div>
      <img style="margin-top:20px" src="/static/img/bottom.png">
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
          <a href="#" @click="login">登录</a><a class="forgot" href="#">忘记密码</a>
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
  name: 'index',
  computed:{
    ...mapGetters({
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow'
    })
  },
  data () {
    return {
      baseurl:Url.baseurl,
      emalicodeis:false,
      rpasswordis:false,
      rtwopwdis:false,
      remailis:false,
      rverifyis:false,
      usernameis:false,
      passwordis:false,
      adata:[
          {"name":"勒索病毒","url":"www.baidu.com"},
          {"name":"勒索病毒","url":"www.baidu.com"},
          {"name":"美国科学家将恶","url":"www.baidu.com"},
          {"name":"美国科学家将恶","url":"www.baidu.com"},
          {"name":"美国科学家将恶","url":"www.baidu.com"},
          {"name":"转移战场的","url":"www.baidu.com"},
          {"name":"转移战场的","url":"www.baidu.com"}
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
          {"title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报",
           "url":["http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"],
           "form":1,
           "content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
           "time":"2017-08-06",
           "good":"1507",
           "read":"1507",
           "comment":"507"
         },
         {"title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报",
           "url":[
            "http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg",
            "http://h.hiphotos.baidu.com/image/pic/item/aec379310a55b3193c60aeec48a98226cefc1789.jpg",
            "http://c.hiphotos.baidu.com/image/pic/item/b8389b504fc2d562d7a1cc74ec1190ef77c66cf9.jpg",
            "http://image.tianjimedia.com/uploadImages/2013/197/89BS201JB4RR_1000x500.jpg"
           ],
           "form":2,
           "content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
           "time":"2017-08-06",
           "good":"1507",
           "read":"1507",
           "comment":"507"
         },
         {"title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报",
           "url":["http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"],
           "form":3,
           "content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
           "time":"2017-08-06",
           "good":"1507",
           "read":"1507",
           "comment":"507"
         },
         {"title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报",
           "url":["http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"],
           "form":1,
           "content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
           "time":"2017-08-06",
           "good":"1507",
           "read":"1507",
           "comment":"507"
         },
         {"title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报",
           "url":["http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"],
           "form":1,
           "content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
           "time":"2017-08-06",
           "good":"1507",
           "read":"1507",
           "comment":"507"
         },


      ],
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

      ]

    }
  },
  methods:{
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
                vm.$store.state.userurl=vm.baseurl+'/static/'+response.data.avatar;
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
  margin-top: 10px;
  width: 1300px;
  overflow: hidden;
}
.left{
  width: 985px;
  float: left;
  margin-right:13px;
}
.right{
  float: left;
  width: 302px;
}
.newcontent{
  width: 983px;
  height: 24px;
  background: #ffeeee;
  border:1px solid #fec2e0;
  font-size: 14px;
  text-align: center;
  line-height: 24px;
}
.newcontent span{
  color: #ff6633;
  cursor: pointer;
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
    width: 270px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    border-radius: 4px;
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
