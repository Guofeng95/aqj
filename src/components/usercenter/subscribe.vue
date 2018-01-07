<template>
  <div class="sub">
    <div class="collection">
      <h3>您订阅的文章：</h3>
    	<div class="collect" v-for="(item,index) in collectdata" :key="index">
    		<img class="img" :src="item.url">
    		<h4 @click="article(item.id)">{{item.title}}</h4>
    		<div><i class="el-icon-edit"></i><span style="margin-right:20px;">{{item.editor}}</span><i class="el-icon-time"></i><span>{{item.time}}</span></div>
    		<p>{{item.content}}</p>
    		<div class="cobottom">
    			<img src="/static/img/tag.png" />{{item.word[0]+"/"+item.word[1]+"/"+item.word[2]}}
    			<span>评论（{{item.comment}}）</span>
    			<span>阅读（{{item.read}}）</span>
    		</div>
    	</div>
      <div v-if="collectdata.length==0" class="collect">
        <h4></h4>
        <div></div>
        <p><a style="cursor:pointer">无订阅文章</a></p>
      </div>
    	<div class="conbot" v-show="conbotis" @click="searchdata">
          加载更多
       </div>
     </div>
    <div class="subscripe">
      <h4>您订阅了以下关键词：</h4>
      <div class="stag" v-for="(item,index) in subtag">
        <img class="imgl" src="/static/img/tagnow.png">{{item}}<img @click="deleate(item)" class="imgr" src="/static/img/no.png">
      </div>
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
      baseurl:Url.baseurl,
      notice:'',
      conbotis:false,
      subtag:["关键词2","关键词2","关键词2","关键词2","关键词2","关键词2","关键词2","关键词2","关键词2","关键词2","关键词2","关键词2"],
    	collectdata:[
    		{
    			"title":"CNNVD关于Windows SMBLoris关键词1情况的通报SMBLoris关键词1情况的通报",
    			"editor":"马化腾",
    			"time":"2017-08-06",
    			"content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
    			"word":["关键词1","关键词2","关键词3"],
    			"read":1507,
    			"comment":"601",
    			"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"
    		}

    	],
    }
  },
  mounted(){  
    this.subtag=[];
    this.collectdata=[];
    this.searchdata()
  },
  methods:{
    deleate(id){
      var vm=this;
        this.$confirm('你确定要删除该收藏吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          var date={};
          date.keyword=id;
          date.do_cancel=1;
          axios({
                method:'post',
                data:qs.stringify(date),
                url:vm.baseurl + '/article/news_subscribe_keyword',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function(response){
                if(response.data.status==1){
                  vm.subtag=[];
                  vm.collectdata=[];
                  vm.searchdata()
                  vm.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }else{
                  vm.$message.warning(response.data.msg);
                }

            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    article(id){
        window.location.href='#/article?topid='+id;
    },
    searchdata(){
        var vm=this;
        var date={};
          date.limit=10;
          date.notice=this.notice;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_list_my_subscription',
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
                    obj.content =element.summary;
                    obj.read=element.read_count;
                    obj.comment=element.comment_count;
                    obj.time=element.publish_time;
                    obj.url=element['images'][0];
                    obj.word=element.keywords;
                    obj.editor=element.author_name;
                    vm.collectdata.push(obj);
                  });
                   vm.subtag=response.data.keywords;
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
    }
  }
}
</script>
<style scoped>
  .sub{
    width: 1080px;
    min-height:calc( 100vh - 184px);
    position: relative;
    overflow: hidden;
  }
	.collection{
		width: 790px;
    float: left;
    padding: 20px 10px;
     border-radius: 4px;
    box-shadow:2px 2px 7px #ccc;
	}
	.collect{
		width: 790px;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px dashed #d7d7d7;
		margin-bottom: 10px;

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
    cursor: pointer;
		overflow: hidden;
	}
  .collect h4:hover{
    color: #ff8a00;
  }
  .collect p a{
    color: #797979;
    text-decoration: none;
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
    .subscripe{
      position: absolute;
      width: 260px;
      top: 20px;
      right:0px;
      overflow: hidden;
    }
    .subscripe h4,.collection h3{
      font-weight: normal;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .stag{
      width: 150px;
      height: 28px;
      background: #f2f2f2;
      border-radius: 6px;
      margin-bottom: 14px;
      padding: 6px 40px;
      position: relative;
      font-size: 14px;
      line-height: 28px;
    }
    .stag .imgl{
      position: absolute;
      left: 10px;
      top: 8px;
      cursor: pointer;
    }
    .stag .imgr{
      position: absolute;
      right: 10px;
      top: 8px;
      cursor: pointer;
    }
</style>