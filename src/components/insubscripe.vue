<template>
  <div class="index">
    <div class="left">
      <h4 class="top">{{subscripe}}<span>{{'共'+1+'篇文章'}}</span></h4>

      <div class="news tablenew"> 
        <div class="demo-input-suffix">
          <label>Title:</label>
          <el-input
            v-model="seotitle">
          </el-input>
        </div>
        <div class="demo-input-suffix">
          <label>Keywords:</label>
          <el-input
            v-model="seokeywords">
          </el-input>
        </div>
        <div class="demo-input-suffix">
          <label>Description:</label>
          <el-input
            v-model="seodescription">
          </el-input>
        </div>
        <el-button type="success" style="margin-left:30px;" @click="seogo" round>保存seo设置</el-button>
      </div>
      <div class="news" v-for="(item,index) in indexdata" :key="index" >
        <div class="newsone" v-if="item.form==1">
          <img :src="item.url[0]" @click="article(item.id)">
          <h4  @click="article(item.id)" >{{item.title}}</h4>
          <p>{{item.content}}</p>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
        <div class="newstwo" v-else-if="item.form==2">
          <h4  @click="article(item.id)">{{item.title}}</h4>
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
          <h4  @click="article(item.id)">{{item.title}}</h4>
          <p>{{item.content}}</p>
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
      <div class="aside">
          <h3 class="h3">订阅该关键词可以在第一时间获得相关信息</h3>
          <el-button class="dybtn" type="success" @click="subscr('new')" v-show="subis">我要订阅</el-button>
          <el-button class="dybtn" type="success" @click="subscr('old')" v-show="subis==false">已订阅</el-button>
      </div>
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
      <div class="more">
        <qun></qun>
      </div>
      <img style="margin-top:20px" src="/static/img/bottom.png">
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
  name: 'subscripe',
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
      seokeywords:'',
      seodescription:'',
      seotitle:'',
      subis:true,
      subscripe:'',
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
      newcontentis:false,
      indexdata:[],
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
  mounted(){
    var vm=this;
    this.indexdata=[];
    this.subscripe=sessionStorage.getItem("subscripe");
    this.indexdataget(10,"first");
    var date={};
    date.keyword=this.subscripe;
    axios({
        method:'post',
        data:qs.stringify(date),
        url:vm.baseurl + '/article/news_get_keyword_seo_data',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(response){
        if(response.data.status==1){
          vm.seotitle=response.data.title;
          vm.seokeywords=response.data.keywords;
          vm.seodescription=response.data.description;
        }else{
          vm.$message.warning(response.data.msg);
        }

    });
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
      seogo(){
        var vm=this;
        var data={};
        data.keyword=this.subscripe;
        data.title=vm.seotitle;
        data.keywords=vm.seokeywords;
        data.description=vm.seodescription;
        axios({
            method:'post',
            data:qs.stringify(data),
            url:vm.baseurl + '/article/news_update_keyword_seo_data',
           headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(response){
            if(response.data.status==1){
              vm.$message.success("保存成功！");
            }else{
              vm.$message.warning(response.data.msg);
            }

        })
      },
      subscr(name){
        var vm=this;
        var date={};
        date.keyword=this.subscripe;

        if(name=="new"){
           date.do_cancel=0;
        }else{
          date.do_cancel=1;
        }
        axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_subscribe_keyword',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                vm.subis=!vm.subis;
              }else{
                vm.$message.warning(response.data.msg);
              }

          })

      },
      article(id){
        window.location.href='/#/article?topid='+id;
      },
      indexdataget(limit,times){
        var vm=this;
        var date={};
          date.limit=limit;
          date.notice=this.notice;
          date.keyword=this.subscripe;
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
                  if(response.data.subscribed==0){
                    vm.subis=true;
                  }else{
                     vm.subis=false;
                  }
                  response.data.data.forEach( function(element, index) {
                    var obj={};
                    obj.title=element.title;
                    obj.id=element.id;
                    obj.content = element.summary;
                    obj.good=element.like_count;
                    obj.read=element.read_count;
                    obj.comment=element.comment_count;
                    obj.time=element.publish_time;
                    obj.url=element.images;
                    var l=element.images.length;
                    if(l==0){
                      obj.form=3
                    }else if(l==1){
                      obj.form=1;
                    }else{
                      obj.form=2;
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
  }

}
</script>

<style scoped>
.top{
  font-size: 36px;
  padding: 4px 0;
  position: relative;
}
.top span{
  position: absolute;
  width: 117px;
  display: block;
  height: 26px;
  font-size: 16px;
  color: #a1a1a1;
  border:1px solid #d7d7d7;
  text-align: center;
  border-radius: 4px;
  line-height: 26px;
  top: 16px;
  left: 100px;
}
.demo-input-suffix {
  margin-left: 30px;
  margin-bottom: 20px;
}
.demo-input-suffix .el-input{
  width: 740px;
} 
.demo-input-suffix label{
  width: 100px;
  display: block;
  float: left;
}
.h3{
  width: 280px;
  margin: 0 auto;
  font-weight: normal;
}
.dybtn{
  display: block;
  margin:20px auto;
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
  width: 903px;
  float: left;
  padding-right: 20px;
  margin-right:20px;
  border-right: 1px solid #d3d3d3;
}
.right{
  float: left;
  width: 352px;
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
  border-top: 1px dashed #d3d3d3;
  overflow: hidden;
  padding-top: 24px;
  padding-bottom: 24px;
  position: relative;
}
.tablenew{
  border: 1px dashed #d3d3d3;
  border-bottom: none;
}
.news h4{
  font-size: 18px;
  cursor: pointer;
}
.news p{
  font-size: 14px;
  color: #777777;
}
.newsone img{
  display: block;
  width: 320px;
  height: 200px;
  float: left;
  margin-right:10px; 
  cursor: pointer;
}
.newsone p{
  margin-top: 20px;
  margin-bottom: 40px;
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
  width: 288px;
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
.aside{
    width: 312px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    border-radius: 0px;
    padding: 0 20px;
    padding-top: 26px;
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
    width: 260px;
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
</style>
