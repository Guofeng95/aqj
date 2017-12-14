<template>
  <div class="article">
  	<div class="top">
  		<a>首页></a>
  		<a href="#">{{secondtit+'>'}}</a>
  		<a href="#">{{thirdtit}}</a>
  	</div>
  	<div v-html="article">
  	</div>
  	<div class="down">
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
      <span>作者</span>
      <span>张三丰</span>
      <span>为大家奉献了2篇文章</span>
    </div>
    <div>
      <button><img src="/static/img/aok.png">赞（49）</button>
      <button><img src="/static/img/astar.png">收藏（49）</button>
      <button><img src="/static/img/awx.png">分享到微信</button>
      <button><img src="/static/img/awb.png">分享到微博</button>
      <button><img src="/static/img/aqq.png">分享到QQ</button>
    </div>
    <div>
      <p>您可能对以下关键词感兴趣哟，请用鼠标滑过或点击关键词</p>
      <ul>
        <li>
          <img src="/static/img/uno.png">
          <span>关键词1/</span>
        </li>
      </ul>
    </div>
    <h4 class="hf">相关文章</h4>
    <div>
      <div class="left">
        <p>接口都是客户肯定手机客户端快捷回复数的借口环境看·电话空号·</p>
      </div>
      <div class="left">
        <p>接口都是客户肯定手机客户端快捷回复数的借口环境看·电话空号·</p>
      </div>
    </div>
     <h4 class="hf">参与讨论</h4>
     <div>
        <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      <span>发表评论</span>
      <span><img src="/static/img/atopgo.png"></span>
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
      textarea:'',
      id:'',
      aurl:'http://toutiao.secjia.com/wannacry-2-0-protection',
      secondtit:'安全头条',
      thirdtit:'文章分类1',
      article:'<h2>wenzhang</h2>',
      downloaddata:[{
      	"url":"djd1",
      	"large":"1.5m",
      	"content":"这里是附件文件名这里是附件文件名这里是附件文件名这里是附件文件名这里是",
      	"num":"6071"
      }]
    }
  },
  methods:{
    
  },

}
</script>
<style scoped>
 .article{
 	width: 904px;
 	margin:0 auto;
 	overflow: hidden;
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
</style>