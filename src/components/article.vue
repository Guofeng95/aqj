<template>
  <div class="article">
  	<div class="top">
  		<a>首页></a>
  		<a href="#">{{secondtit+'>'}}</a>
  		<a href="#">{{thirdtit}}</a>
  	</div>
    <div class="sumary">
      <h4>{{artitle}}</h4>
      <p>
        <span style="color:#0099CC;">{{artauthor}}</span>
        <span>{{'·'+arttime}}</span>
        <span>{{'·'+thirdtit}}</span>
        <span style="position:absolute;right:0;">
          <span>{{'阅读('+readnum+')'}}</span>
          <span>{{'评论('+comnum+')'}}</span>
           <img style="cursor:pointer;" @click='hdpout' src="/static/img/hdp.png">
        </span>
        
      </p>
    </div>
  	<div v-html="article">
  	</div>
  	<div class="down" v-if="downloaddata.length!=0">
  		<h4 class="hf">文章附件</h4>
      <div class="downcontent">
          <div  style="position:relative" v-for="(item,index) in downloaddata" :key="index">
            <img class="dimg" src="/static/img/flie.png">
            <p>
              <span class="dcon">{{item.content}}</span>
              <span class="dlarge">{{item.large}}</span>
              <span class="dnum">{{'下载（'+item.num+'）'}}</span>
            </p>
          </div>
      </div>
  	</div>
  	<div class="bottom">
      <p style="margin-top:10px; color:#a1a1a1;">*文章为作者独立观点，不代表安全加立场</p>
      <div class="downcontent">
        <p>本文由：安全加发布，版权归属于原作者。 如果转载，请注明出处及本文链接： </p>
        <p>{{aurl}}</p>
        <p>如果此文章侵权，请留言，我们进行删除。</p>
      </div>
    </div>
    <div class="author">
      <img src="/static/img/aface.png">
      <span class="aur">作者</span>
      <span class="aurname">{{artauthor}}</span>
      <span class="aurnum">为大家奉献了 2 篇文章</span>
    </div>
    <div class="btn">
      <button @click="like" v-if="likeis"><img src="/static/img/aok.png">{{'赞（'+zannum+'）'}}</button>
      <button @click="like('ok')" v-else><img src="/static/img/aok.png">{{'赞（'+zannum+'）'}}</button>
      <button @click="mark" v-if="markis"><img src="/static/img/astar.png">{{'收藏（'+scnum+'）'}}</button>
      <button @click="mark('ok')" v-else><img src="/static/img/astar.png">{{'收藏（'+scnum+'）'}}</button>
      <button><img src="/static/img/awx.png">分享到微信</button>
      <button><img src="/static/img/awb.png">分享到微博</button>
      <button><img src="/static/img/aqq.png">分享到QQ</button>
    </div>
    <div class="tagzi">
      <p style="font-size:14px;color:#a1a1a1; margin-bottom:10px;">您可能对以下关键词感兴趣哟，请用鼠标滑过或点击关键词 :</p>
      <ul>
        <li v-for="(item,index) in tagdata">
          <span style="color:#a1a1a1;" v-if="index!=0">/</span>
          <img src="/static/img/uno.png">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <h4 class="hf">相关文章</h4>
    <div class="articlecot">
      <div class="left">
        <p>接口都是客户肯定手机客户端快捷回复数的借口环境看·电话空号·vsnmsnbmnsabmbmn</p>
      </div>
      <div class="left">
        <p>接口都是客户肯定手机客户端快捷回复数的借口环境看·电话空号·</p>
      </div>
    </div>
     <h4 class="hf" style="clear:both;padding-top:20px;margin-bottom:40px;">参与讨论</h4>
     <div class="context">
        <el-input
        type="textarea"
        :rows="6"
        placeholder="请输入内容"
        v-model="textarea"
        resize="none"
        class="text"
        @change="compleng">
      </el-input>
      <span class="num">{{conleng+"/300"}}</span>
      <span class="tbtn" v-if="loginis" @click="newcomment">发表评论</span>
      <span class="tbtn" v-else style="background:#ccc;">发表评论</span>
      <span class="topt" @click="gotop"><img src="/static/img/atopgo.png"></span>
     </div>
    <div class="comment">
      <div class="comt" v-for="(item,index) in comdata">
        <img :src="item.url">
        <span class="comname">{{item.name}}<span class="comtime">{{"·"+item.time}}</span></span>
        
        <p class="comcontent">{{item.content}}</p>
      </div>
     <el-button class="combtn" type="success" v-show="combtnis" @click="comment" plain :loading="false">查看更多评论</el-button>
    </div>
    <div class="bigimg" v-show="bigimgis">
      <div>
        <img class="imges" :src="nowbig">
        <span @click="bigchange('left')"><img src="/static/img/imgleft.png"></span>
        <span style="left:820px;" @click="bigchange('right')"><img src="/static/img/imgright.png"></span>
        <span class="imgno"  @click="hdpout('no')"><img src="/static/img/imgno.png"></span>
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
  name:'article',
  computed:{
    ...mapGetters({
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow'
    })
  },
  data () {
    return {
      markis:true,
      likeis:true,
      combtnis:false,
      offset:0,
      nowbig:'',
      nowbignum:0,
      bigimgis:false,
      zannum:0,
      scnum:0,
      baseurl:Url.baseurl,
      hdpurl:[
      	// "http://7xkk1o.com1.z0.glb.clouddn.com/92a72a4647d1d3fa5f59189020641f4b.jpg",
      	// "http://7xkk1o.com1.z0.glb.clouddn.com/defaultAttachmentURL2.PNG",
      	// "http://7xkk1o.com1.z0.glb.clouddn.com/bf33c8b485d93a3b61fbe11420042d70.jpg",
      	// "http://7xkk1o.com1.z0.glb.clouddn.com/c895952e7031e7444a4c9fcd7afeb041.jpg"
      ],
      arttime:'',
      comnum:5454,
      readnum:4,
      artauthor:'dk',
      artitle:'wd',
      level:'',
      conleng:0,
      textarea:'',
      id:'',
      aurl:'http://toutiao.secjia.com/wannacry-2-0-protection',
      secondtit:'',
      thirdtit:'文章分类1',
      article:'<h2>wenzhang</h2>',
      downloaddata:[
      // {
      // 	"url":"djd1",
      // 	"large":"1.5m",
      // 	"content":"这里是附件文件名这里是附件文件名这里是附件文件名这里是附件文件名这里是",
      // 	"num":"6071"
      // }
      ],
      tagdata:[],
      comdata:[
              // {
              //   "url":"/static/img/userurl.png",
              //   "time":"11xiaoshi",
              //   "name":"线板吗就是",
              //   "content":"hgwhjgjheg今年上看到黄金客户就是肯定会查看回复等级考试继父回家"
              // }
      ]
    }
  },
  mounted(){
    var arr=window.location.href.split('?')[1].split("=");
    this.id=arr[1];
    if(arr[0]=="topid"){
      this.secondtit="安全头条"
    };
    var vm=this;
    var date={};
    date.id=this.id;
    vm.aurl=window.location.href;
    axios({
        method:'post',
        data:qs.stringify(date),
        url:vm.baseurl + '/article/news_content',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(response){
        if(response.data.status==1){
          var obj=response.data.news_data
          vm.artitle=obj.title;
          vm.artauthor=response.data.author;
          vm.arttime=obj.publish_time;
          vm.readnum=obj.read_count;
          vm.comnum=obj.comment_count;
          vm.thirdtit=response.data.tag;
          vm.article=response.data.doc;
          vm.zannum=obj.like_count;
          vm.hdpurl=obj.images;
          vm.nowbig=obj.thumbnail;
          vm.scnum=response.data.extra_data.mark_count;
          if(response.data.extra_data.liked==1){
          	vm.likeis=false;
          }
          if(response.data.extra_data.marked==1){
          	vm.markis=false;
          }
          vm.tagdata=response.data.keywords;
        }else{
          vm.$message.error(response.data.msg)
        }
    });
    this.comment()
  },
  methods:{
  	bigchange(lr){
  		if(lr=='left'){
  			if(this.nowbignum>0){
  				
  				this.nowbignum=this.nowbignum-1;
  				//alert(this.nowbignum)
  				this.nowbig=this.hdpurl[this.nowbignum];
  			}
  		}else{
  			var l=this.hdpurl.length-1;
  			if(this.nowbignum<l){
  				this.nowbignum=this.nowbignum+1;
  				//alert(this.nowbignum)
  				this.nowbig=this.hdpurl[this.nowbignum];
  			}
  		}

  	},
  	hdpout(no){
  		if(no=="no"){
  			this.bigimgis=false;
  			this.nowbignum=0;
  			this.nowbig=this.hdpurl[0];
  		}else{
  			this.bigimgis=true;
  		}
  		
  	},
  	like(ab){
  		var vm=this;
  		if(ab!="ok"){
  			  
		      var date={};
		      date.news_id=this.id;
			  axios({
		        method:'post',
		        data:qs.stringify(date),
		        url:vm.baseurl + '/article/news_like',
		       headers: {
		          'Content-Type': 'application/x-www-form-urlencoded'
		        }
		   		 }).then(function(response){
		        if(response.data.status==1){
		        	vm.zannum=vm.zannum+1;
		   	        vm.likeis=true;
		        }else{
		          vm.$message.warning(response.data.msg)
		        }
			   });
   		}else{
   			vm.$message.warning("您已经点赞了哦！")
   		}
  	  
  	},
  	mark(ab){
  	 var vm=this;
      var date={};
      if(ab=="ok"){
      	date.do_cancel=1
      }else{
      	date.do_cancel=0
      }
      date.news_id=this.id;
	  axios({
        method:'post',
        data:qs.stringify(date),
        url:vm.baseurl + '/article/news_mark',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
   		 }).then(function(response){
        if(response.data.status==1){
        	if(ab=="ok"){
        		vm.scnum=vm.scnum-1;
   	        	vm.markis=true;
        	}else{
        		vm.scnum=vm.scnum+1;
   	        	vm.markis=false;
        	}
        	
        }else{
          vm.$message.warning(response.data.msg)
        }
	   });
  	},
  	newcomment(){
  	  var vm=this;
      var date={};
      date.news_id=this.id;
      date.content=this.textarea;
      if(this.textarea!="" && this.textarea.length<=300){
      		axios({
	        method:'post',
	        data:qs.stringify(date),
	        url:vm.baseurl + '/article/news_new_comment',
	       headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	      }
	    }).then(function(response){
	        if(response.data.status==1){
	        	vm.$message.success("发送成功！")
	   	        vm.textarea='';
	   	        vm.comment("new");
	        }else{
	          vm.$message.error(response.data.msg)
	        }
	    });
      }else{
      		vm.$message.error("请输入1-300个字！")
      }
      
  	},
    compleng(){
      console.log(this.textarea)
      this.conleng=this.textarea.length;
    },
    gotop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    comment(ab){
      var vm=this;
      var date={};
      date.news_id=this.id;
      if(ab="new"){
      	this.comdata=[];
      	this.offset=0;
      }
      date.offset=this.offset;
      date.limit=10;
      axios({
	        method:'post',
	        data:qs.stringify(date),
	        url:vm.baseurl + '/article/news_comments',
	       headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	      }
	    }).then(function(response){
	        if(response.data.status==1){
	        	
	          	var arr = response.data.data;
	          	if(arr.length<10){
	          		vm.combtnis=false;
	          	}else{
	          		vm.combtnis=true;
	          		vm.offset=vm.offset+1;
	          	}
	          	arr.forEach( function(element, index) {
	          		var obj={};
	          		obj.url=element.user_url;
	          		obj.time=element.user_name;
	          		obj.time=element.comment_time;
	          		obj.content=element.comment_content;
	          		obj.id=element.comment_id;
	          		vm.comdata.push(obj)
	          	});
	          	

	        }else{
	          vm.$message.success(response.data.msg)
	        }
	    });
     }
  },

}
</script>
<style scoped>
 .article{
 	width: 904px;
 	margin:0 auto;

 }
 .top{
 	margin-top: 20px;
 	padding-bottom: 30px;
 }
 .top a{
 	text-decoration: none;
 	color: #3a9e00;
 	font-size: 14px;
 }
 .hf{
  color: #a1a1a1;
  font-size: 18px;
  margin-top: 60px;
  margin-bottom: 10px;
}
.downcontent{
  width: 860px;
  padding: 20px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  position: relative;
}
.downcontent div{
  padding: 10px 5px;
}

.dimg{
  display: block;
}
.dcon{
  
  width: 800px;
  position: absolute;
  height: 30px;
  top: 10px;
  left: 58px;
  color: #333;
}
.dlarge{
  font-size: 14px;
  color: #a1a1a1;
  position: absolute;
  left: 58px;
  top: 40px;
}
.dnum{
  font-size: 14px;
  color: #a1a1a1;
  position: absolute;
  left: 108px;
  top: 40px;
}
.bottom p{
  font-size: 14px;
}
.author{
  width: 270px;
  margin:30px auto;
  height: 80px;
  position: relative;
}
.author img{
  width: 80px;
  height: 80px;
}
.author span{
  position: absolute;
  display: block;
}
.author .aur{
  color: #ff9966;
  width: 60px;
  height: 24px;
  border:1px solid #ff9966;
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  border-radius: 4px;
  top: 10px;
  left: 100px;
}
.author .aurname{
  font-size: 24px;
  top: 12px;
  left: 176px;
}
.author .aurnum{
  font-size: 14px;
  color: #a1a1a1;
  left: 100px;
  top: 58px;
}
.btn{
  margin-left: 110px;
  margin-bottom: 40px;
}
.btn button{
  width: 120px;
  height: 40px;
  color: #fff;
  border-radius: 4px;
  border:none;
  background: #6fba2c;
  line-height: 40px;
  margin-left: 20px;
  font-size: 14px;
  cursor: pointer;
}
.btn button img{
  display: block;
  float: left;
  margin-top:10px;
  margin-left: 10px;

}
.tagzi ul li{
  display: block;
  float: left;
  margin-left: 10px;
  font-size: 14px;
  color: rgb(0,153,204);
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.tagzi ul li img{
  margin-left: 4px;
}
.tagzi ul li:hover {
  color: rgb(255,102,0)
}
.articlecot div{
  width: 400px;
  padding: 10px 20px;
  padding-bottom: 0;
  display: block;
  float: left;
  border:1px solid #d7d7d7;
  border-radius: 6px;
  background: #fcfcfc;
}
.articlecot .left{
  margin-right: 10px;
}
.articlecot div p{
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  margin-bottom: 10px;
}
.context{
  width: 900px;
  position: relative;
}
.text{
  width: 900px;
}
.context .num{
  color: #a1a1a1;
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 110px;
}
.context .tbtn{
  width: 100px;
  height: 30px;
  display: block;
  background: #61a326;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  line-height: 30px;
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;
}
.context .topt{
  display: block;
  right: -60px;
  cursor: pointer;
  top: 40px;
  position: absolute;
  width: 44px;
  height: 38px;
  background: #61a326;
  padding-top: 6px;
  border-radius: 4px;
}
.context .topt img{
  display: block;
  margin-left: 7px;
}
.comment{
  margin-top: 30px;
}
.comt{
  padding: 10px 0;
  position: relative;
  overflow: hidden;
  border-bottom: 1px dashed #f7f7f7;
}
.comt img{
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: block;
  float: left;

}
.comt .comname{
  position: absolute;
  top:10px;
  left: 50px;
  color:#91baf8;
  font-size: 14px; 
}
.comt .comtime{
  color:#dedcda;
  font-size: 14px;
}
.comt .comcontent{
  width: 700px;
  padding-top:20px;
  margin-left: 50px;
  font-size: 14px;
  color: #333;
}
.combtn{
  margin:30px auto;
  margin-left: 400px;
}
.sumary h4{
  font-size: 28px;
  font-weight: normal;
  margin-bottom: 20px;
}
.sumary p{
  margin-bottom: 40px;
  position: relative;
}
.sumary p span{
  font-size: 14px;
  color:#AEAEAE;
}
.bigimg{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  top: 0;
  left: 0;
}
.bigimg div{
  width: 900px;
  height: 474px;
  position: absolute;
  border:4px solid #fff;
  border-radius: 8px;
  top: 50%;
  left: 50%;
  margin-top: -237px;
  margin-left: -450px;
}
.bigimg .imges{
  display: block;
  width: 900px;
  height: 474px;
  margin: 0 auto;
}
.bigimg span{
  display: block;
  width: 50px;
  height: 50px;
  padding: 2px;
  cursor: pointer;
  border-radius: 100%;
  background: #ccc;
  position: absolute;
  left: 20px;
  top: 220px;
}
.bigimg .imgno{
	top: -40px;
	left: 910px;
	width: 30px;
   height: 30px;
   padding-top: 10px;
   padding-left: 10px;
}
</style>