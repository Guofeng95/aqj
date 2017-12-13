<template>
  <div class="article">
  	<div class="top">
  		<a>首页></a>
  		<a href="#">{{secondtit+'>'}}</a>
  		<a href="#">{{thirdtit+'>'}}</a>
  	</div>
  	<div v-html="article">
  	</div>
  	<div >
  		<h4>文章附件</h4>
  		<div v-for="(item,index) in downloaddata" :key="index">
  			<img src="/static/img/file.png">
  			<p>
  				<span>{{item.content}}</span>
  				<span>{{item.large}}</span>
  				<span>{{'下载（'+item.num+'）'}}</span>
  			</p>
  		</div>
  	</div>
  	<div></div>

  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  data () {
    return {
      id:'',
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
 	width: 900px;
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

</style>