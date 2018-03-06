<template>
  <div class="index" id="indexanqu">
    <div class="left">
      <div class="newcontent" v-show="newcontentis">
        <span @click="newcon">有新的文章发布啦,刷新一下,查看新内容！</span>
      </div>
      <div class="news" v-for="(item,index) in indexdata" :key="index" >
        <div class="newsone" v-if="item.form==1">
          <img :src="item.url[0]" @click="article(item.id)">
          <h3  @click="article(item.id)" >{{item.title}}</h3>
          <p>{{item.content}}</p>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
        <div class="newstwo" v-else-if="item.form==2">
          <h3  @click="article(item.id)">{{item.title}}</h3>
          <div>
            <img  @click="article(item.id)" style="margin-left:0;" :src="item.url[0]">
            <img  @click="article(item.id)" :src="item.url[1]">
            <img  @click="article(item.id)" :src="item.url[2]">
          </div>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
        <div class="newsthree" v-else-if="item.form==3">
          <h3  @click="article(item.id)">{{item.title}}</h3>
          <p style="margin-top:20px;">{{item.content}}</p>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
      </div>
      <div class="dashline"></div>
      <div class="conbot" v-show="conbotis" @click="indexdataget(10)">
        查看更多 精彩文章
      </div>
    </div>
    <div class="right">
      <div class="aside" v-show="loginis">
          <h4>热门推荐</h4>
          <div v-for="(item,index) in hotdata" :key='index' @click="article(item.id)" style="cursor:pointer">
            <span class="span" style="background:#3a9e00;"  v-if="index==0">{{index+1}}</span>
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
          <a href="#" @click="login(1)">注册</a><a class="forgot" href="#/forget">忘记密码</a>
        </div>
      </div>
      <div class="aside">
        <img class="app" src="/static/img/app.png">
      </div>
      <div class="more">
        <qun></qun>
      </div>
      <!-- <div class="aside" style="margin-top:20px;">
        <h4>行业分类</h4>
        <div class="diva" v-for="(item,index) in adata" :key="index">
          <a style="cursor:pointer" @click="gosearch(item.name)">{{item.name}}</a>
        </div>
      </div> -->
      <div class="aside" style="margin-top:20px;">
        <h4>友情链接</h4>
        <div class="diva" v-for="(item,index) in adatah" :key="index">
          <a style="cursor:pointer" :href="item.url">{{item.name}}</a>
        </div>
      </div>
      <div class="aside" style="padding-top:0px; text-align:center;margin-top:20px;position:relative;">
        <span id="year">2018</span>
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
          <a href="#" @click="login">登录</a><a class="forgot" href="#/forget">忘记密码</a>
        </div>
    </div>
    </div>
    
  </div>
</template>
<script>
import qun from '@/components/common/qun'
import {mapGetters} from "vuex"
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  name: 'index',
   components: {
    qun
   },
  computed:{
    ...mapGetters({
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow'
    })
  },
  data () {
    return {
      atricleurl:Url.atricleurl,
      insubscripeurl:Url.insubscripeurl,
      nextnotice:'',
      timer:'',
      conbotis:false,
      notice:'',
      baseurl:Url.baseurl,
      emalicodeis:false,
      rpasswordis:false,
      rtwopwdis:false,
      remailis:false,
      rverifyis:false,
      usernameis:false,
      passwordis:false,
      adatah:[ 
          {"name":"安全知识","url":"http://zhishi.secjia.com"},
          {"name":"黑客街","url":"http://www.hackjie.com"},
          {"name":"东轩'sBLOG","url":"http://www.dxblog.cn"},
          {"name":"即刻安全","url":"http://www.secist.com"},
          {"name":"Luan's Blog ","url":"http://lu4n.com"},
          {"name":"被黑站点统计","url":"http://www.hacked.com.cn"},
          {"name":"指尖安全","url":"http://www.secfree.com"}
      ],
      adata:[
          {"name":"政府"},
          {"name":"金融"},
          {"name":"运营商"},
          {"name":"能源"},
          {"name":"全行业"}
      ],
      remail:'',
      rverify:'',
      rpassword:'',
      rtwopwd:'',
      username:'',
      resetis:false,
      password:'',
      newcontentis:false,
      indexdata:[],
      hotdata:[
            {
              "content":"转移战场”的暗网市场继续繁荣"
            }

      ]

    }
  },
  beforeDestroy: function () {
    console.log('清除')
    clearInterval(this.timer)
  },
  mounted(){
    var vm=this;
    this.indexdata=[];
    this.hotda();
    this.indexdataget(7,"first");
    this.timer=setInterval(function(){
          var date={};
          date.notice=vm.nextnotice;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_check_new',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
            if(response.data.status==1){
              vm.newcontentis=true;
            }else{
              vm.newcontentis=false;
            }
          })
    },10000);
     
     function getScrollTop(){
      　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      　　if(document.body){
      　　　　bodyScrollTop = document.body.scrollTop;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollTop = document.documentElement.scrollTop;
      　　}
      　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      　　return scrollTop;
      }

      //文档的总高度

      function getScrollHeight(){
      　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      　　if(document.body){
      　　　　bodyScrollHeight = document.body.scrollHeight;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollHeight = document.documentElement.scrollHeight;
      　　}
      　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      　　return scrollHeight;
      }

      //浏览器视口的高度

      function getWindowHeight(){
      　　var windowHeight = 0;
      　　if(document.compatMode == "CSS1Compat"){
      　　　　windowHeight = document.documentElement.clientHeight;
      　　}else{
      　　　　windowHeight = document.body.clientHeight;
      　　}
      　　return windowHeight;
      }

      window.onscroll = function(){
      　　if(getScrollTop() + getWindowHeight() == getScrollHeight()){
      　　　 if(vm.conbotis==true){
                vm.indexdataget(10);
            }
      　　}
      };
    
  },
  methods:{
      gosearch(search){
        window.location.href=this.insubscripeurl+encodeURIComponent(search);
      },
      hotda(){
        var vm=this;
        vm.hotdata=[];
        var date={};
        date.limit=6;
        axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/hot_news_list',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                response.data.data.forEach( function(element, index) {
                  var obj={};
                  obj.content = element.title;
                  obj.id=element.id;
                  vm.hotdata.push(obj)
                });
              }
          })
      },
      article(id){
        window.location.href=this.atricleurl+'topid='+id;
      },
      indexdataget(limit,times){
        var vm=this;
        var date={};
          date.limit=limit;
          date.notice=this.notice;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_list',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                  if(times=="first"){
                    vm.nextnotice=response.data.next_notice;
                  }
                  vm.notice=response.data.prev_notice;
                  if(limit==response.data.data.length){
                    vm.conbotis=true;
                  }else{
                    vm.conbotis=false;
                  }
                  response.data.data.forEach( function(element, index) {
                    var obj={};
                    obj.title=element.title;
                    obj.id=element.id;
                    obj.content = element.summary;
                    obj.good=element.like_count;
                    obj.read=element.read_count;
                    obj.comment=element.comment_count;
                    obj.time=element.publish_time.split(" ")[0];
                    obj.url=element.images;
                    var l=element.images.length;
                    if(l==0){
                      obj.form=3
                    }else if(l>=3){
                      obj.form=2;
                    }else{
                      obj.form=1;
                    };
                    vm.indexdata.push(obj);
                  });
              }else{
                vm.$message.warning('拉取失败!');
              }
          });
      },
      newcon(){
        this.indexdata=[];
        this.indexdataget(7,"first");
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
                    vm.login()
                    window.location.href="#/"
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
  margin-top: 20px;
  width: 1200px;
  overflow: hidden;
}
.left{
  width: 803px;
  float: left;
  padding-right: 20px;
  margin-right:20px;
  border-right: 1px  solid  #f2f2f2;
}
.right{
  float: left;
  width: 332px;
}
.newcontent{
  width: 903px;
  height: 34px;
  background: #fff9ed;
  text-align: center;
  line-height: 34px;
  margin-bottom: 18px;
}
.newcontent span{
  color: #ff8a00;
  font-size: 14px;
  cursor: pointer;
}
.news {
  border-top: 1px  solid  #f2f2f2;
  overflow: hidden;
  padding-top: 24px;
  padding-bottom: 24px;
  position: relative;
}
.news h3{
  width: 543px;
  font-size: 18px;
  cursor: pointer;
  height: 50px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden;  /** 隐藏超出的内容 **/
}

.news p{
  font-size: 14px;
  color: #777777;
}
.newsone img{
  display: block;
  width: 170px;
  height: 130px;
  float: left;
  margin-right:10px; 
  cursor: pointer;
}
.newsone p{
  margin-top: 20px;
  margin-bottom: 40px;
  margin-left: 180px;
}
.icon{
  position: absolute;
  right: 0;
  bottom: 24px;
  color: #aaaaaa;
  font-size: 12px;
}
.newstwo img{
  display: block;
  width: 256px;
  height: 180px;
  float: left;
  margin-left: 14px;
  margin-top: 12px;
  margin-bottom: 40px;
  cursor: pointer;
}
.newsthree p{
  margin-top: 40px;
  margin-bottom: 40px;
}
.dashline{
  border-top: 1px dashed #d3d3d3;
}
.conbot{
  color: #fff;
  text-align: center;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  margin: 10px 0;
  border-radius: 0px;
  background:rgba(111, 186, 44, 1);
  cursor: pointer;
}
a{ text-decoration: none;}
.aside{
    width:312px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    border-radius: 0px;
    
    overflow: hidden;
    padding: 0 0 0 40px;
    padding-top: 26px;
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
    width: 240px;
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
    top: 50%;
    margin-left: -145px;
    width: 260px;
    padding: 10px 20px;
    border-radius: 4px;
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
  #year{
    position: absolute;
    background: #fff;
    font-size: 14px;
    top: 23px;
    left: 64px
  }
</style>
