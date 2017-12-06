<template>
  <div class="sub">
    <div class="collection">
      <h3>您订阅的文章：</h3>
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
    	<div class="conbot">
          加载更多
       </div>
     </div>
    <div class="subscripe">
      <h4>您订阅了以下关键词：</h4>
      <div class="stag" v-for="(item,index) in subtag">
        <img class="imgl" src="/static/img/tagnow.png">{{item}}<img class="imgr" src="/static/img/no.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
    		},
    		{
    			"title":"CNNVD关于Windows SMBLoris关键词1情况的通报SMBLoris关键词1情况的通报",
    			"editor":"马化腾",
    			"time":"2017-08-06",
    			"content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
    			"word":["关键词1","关键词2","关键词3"],
    			"read":1507,
    			"comment":"601",
    			"url":"http://image.tianjimedia.com/uploadImages/2013/197/89BS201JB4RR_1000x500.jpg"
    		},
    		{
    			"title":"CNNVD关于Windows SMBLoris关键词1情况的通报SMBLoris关键词1情况的通报",
    			"editor":"马化腾",
    			"time":"2017-08-06",
    			"content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
    			"word":["关键词1","关键词2","关键词3"],
    			"read":1507,
    			"comment":"601",
    			"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"
    		},
    		{
    			"title":"CNNVD关于Windows SMBLoris关键词1情况的通报SMBLoris关键词1情况的通报",
    			"editor":"马化腾",
    			"time":"2017-08-06",
    			"content":"在刚刚落幕的第20届Blackhat大会上，“机器学习”被反复提及，人工智能在网络安全各个领域得到广泛探索和应用尝试。",
    			"word":["关键词1","关键词2","关键词3"],
    			"read":1507,
    			"comment":"601",
    			"url":"http://image.tianjimedia.com/uploadImages/2013/197/89BS201JB4RR_1000x500.jpg"
    		},

    	],
    }
  }
}
</script>
<style scoped>
  .sub{
    width: 1100px;
    position: relative;
    overflow: hidden;
  }
	.collection{
		width: 790px;
    float: left;
	}
	.collect{
		width: 790px;
    overflow: hidden;
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
    .subscripe{
      position: absolute;
      width: 260px;
      top: 0;
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