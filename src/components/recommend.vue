<template>
  <div class="index">
    <div class="left">
     <div class="leftcontent">
       <div style="width:100%;"  v-for="(item,index) in indexdata" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.imgurl">
           <span class="onespan">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan">{{item.title}}</span>
           <img class="oimg" :src="item.imgurl">
         </div>
       </div>
       <div class="out2">
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn">威胁处理</span>
       </div>
     </div> 
     
    </div>
    <div class="right">
      <div class="aside" v-show="loginis">
          <h4>热门推荐</h4>
          <div v-for="(item,index) in hotdata" :key='index'>
            <span style="background:#3a9e00;" v-if="index==0">{{index+1}}</span>
            <span style="background:#ff9933;" v-else-if="index==1">{{index+1}}</span>
            <span style="background:#ff0000;" v-else-if="index==2">{{index+1}}</span>
            <span v-else>{{index}}</span>
            <p class="hotp">{{item.content}}</p>
          </div>
      </div>
      <div class="aside" v-show="loginis==false">
        <h4>快速登录</h4>
        <el-input class='form' v-model="username" placeholder="请填写手机号或邮箱"></el-input>
        <el-input class='form' v-model="password" placeholder="请输入密码"></el-input>
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
      <div class="aside" style="margin-top:20px;">
        <h4>行业分类</h4>
        <div class="diva" v-for="(item,index) in adata" :key="index">
          <a :href="item.url">{{item.name}}</a>
        </div>
      </div>
      <div class="more">
        <img style="margin-top:10px" src="/static/img/qun.png">
        <span ></span>
        <span class="tu"></span>
      </div>
    </div>
    <div class="background" v-show="resetis">
      <div class="aside" id="reset" v-show="resetis">
        <h4>快速注册 <img class="cha" @click="login" src="/static/img/cha.png"></h4>
        <div class="demo-input-suffix">
          <el-input class="verify" v-model="remail" placeholder="请填写邮箱地址"></el-input>
           <el-button class="btn1" type="success">验证码</el-button>
        </div>
        <el-input class='form' v-model="rverify" placeholder="请填写邮箱收到的验证码"></el-input>
        <el-input class='form' v-model="rpassword" placeholder="请设置密码,不得少于8个字符"></el-input>
        <el-input class='form' v-model="rtwopwd" placeholder="请再次输入刚才的密码"></el-input>
        <a class="btn">立即注册</a>
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
export default {
  name: 'recommend',
  computed:{
    ...mapGetters({
      loginis:'loginnow'
    })
  },
  data () {
    return {
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
          {"imgurl":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg","title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows"},
          {"imgurl":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg","title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报"},
          {"imgurl":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg","title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报"},
          {"imgurl":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg","title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows SMBLoris关键词1情况的通报"}
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
        this.$store.state.loginis=true;
      }
  }

}
</script>

<style scoped>
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
.leftcontent{
  width: 960px;
  border-radius: 3px;
  border: 1px solid #ebebeb;
  box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
}
.out{
  position: relative;
  width: 100%;
  height: 250px;
}
.out .oneimg{
  width: 100%;
  height: 250px;
}
.out .onespan{
  position: absolute;
  bottom: 0;
  left: 0;
  width:calc( 100% - 40px);
  display: block;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  padding:0 20px;
  background-color: rgba(215, 215, 215, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.out1,.out2{
  width: 100%;
  height: 74px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.out2{
  height: 35px;
  color:#A1A1A1;
  font-size: 14px;
  padding-top: 10px;
}
.out2 .wbtn{
  background: rgba(111, 186, 44, 1);
  color: #fff;
  border-radius: 4px;
  padding: 4px 6px;
  margin-left: 14px;
  margin-top: 16px;
  cursor: pointer;
}
.out1 .ospan{
  display: block;
  width: 650px;
  padding-left: 20px;
  height: 74px;
  overflow: hidden;
  text-overflow: ellipsis;
   white-space: nowrap;
  line-height: 74px;
}
.out1 .oimg{
  position: absolute;
  right:20px;
  top: 7px;
  width: 100px;
  height: 60px;
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
  .aside span{
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
