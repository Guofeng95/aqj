<template>
  <div class="collection">
  	<div class="collect" v-for="(item,index) in collectdata" :key="index">
  		<img class="img" :src="item.url">
  		<h4>{{item.title}}</h4>
  		<div><i class="el-icon-edit"></i><span style="margin-right:20px;">{{item.editor}}</span><i class="el-icon-time"></i><span>{{item.time}}</span></div>
  		<p>{{item.content}}</p>
  		<div class="cobottom">
  			<img src="/static/img/tag.png" />{{item.word[0]+"/"+item.word[1]+"/"+item.word[2]}}
  			<span>评论（{{item.comment}}）</span>
  			<span>阅读（{{item.read}}）</span>
  		</div>
  	</div>
  	<div class="conbot" v-show="conbotis">
        加载更多
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
      conbotis:true,
      baseurl:Url.baseurl,
      notice:'',
    	collectdata:[
    		{
    			"title":"CNNVD关于Windows SMBLoris关键词1情况的通报SMBLoris关键词1情况的通报",
    			"editor":"马化腾",
    			"time":"2017-08-06",
    			"content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
    			"word":["关键词1","关键词2","关键词3"],
    			"read":1507,
    			"comment":601,
    			"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"
    		}
    	],
    }
  },
  mounted(){
    this.collectdata=[];
    this.searchdata()
  },
  methods:{
    searchdata(){
        var vm=this;
        var date={};
          date.limit=10;
          date.notice=this.notice;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_list_my_marked',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
            console.log(response)
              if(response.data.status==1){
                vm.notice=response.data.prev_notice;
                if(response.data.data.length == 10){
                  vm.conbotis=true;
                }else{
                  vm.conbotis=false;
                }
                  response.data.data.forEach( function(element, index) {
                    var obj={};
                    obj.title=element.title;
                    obj.id=element.id;
                    obj.content ="在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。";
                    obj.read=1507;
                    obj.comment=601;
                    obj.time="2017-08-06";
                    obj.url='http://img2.imgtn.bdimg.com/it/u=4178531770,3008072672&fm=27&gp=0.jpg';
                    obj.word=["关键词1","关键词2","关键词3"];
                    obj.editor="马化腾";
                    vm.collectdata.push(obj);
                  });
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
    }
  }
}
</script>
<style scoped>
	.collection{
		width: 790px;
		overflow: hidden;
	}
	.collect{
		width: 790px;
    margin-top: 10px; 
		padding-bottom: 10px;
    border-bottom: 1px dashed #ebebeb;
	}
	.collect .img{
		display: block;
		float: left;
		height: 180px;
		width: 250px;
		margin-right:10px;
	}
	.collect h4{
		height: 60px;
		line-height: 26px;
		font-size:24px; 
		overflow: hidden;
	}
	
	.collect div {
		color: #aeaeae;
		font-size:14px; 
	}
	.collect i{
		color: #888888;
		margin-right: 6px;
	}
	.collect p{
		height: 60px;
		font-size: 14px;
		margin-top: 10px;
		margin-bottom: 10px;
		overflow: hidden;
	}
	.cobottom{
		height: 20px;
		line-height: 20px;
	}
	.cobottom img{
		display: block;
		float: left;
	}
	.cobottom span{
		display: block;
		float: right;
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
</style>