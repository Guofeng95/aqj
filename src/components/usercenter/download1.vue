<template>
  <div class="comment">
    <h3>我上传的文档</h3>
    <div class="download">
      <div class="collect" v-for="(item,index) in collectdata" :key="index">
        <div>{{item.content}}</div>
        <span style="margin-left:180px">{{item.time}}</span>
        <span style="margin-left:20px">{{item.num}}</span>
        <a>查看</a>
        <a>下载</a>
      </div>
    </div>
  	
  	<div class="conbot">
        加载更多
     </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    	collectdata:[
    		{
          "num":"1999",
          "time":"2017-8-23",
          "content":"来自文章，就啥都看见啊哈几点开始加快看",
          "id":"1230",
          "url":"#"
        },
        {
          "num":"1999",
          "time":"2017-8-23",
          "content":"来自文章，就啥都看见啊哈几点开始加快看看数据库，会听吗充电接口恐龙快打离开了离苦得乐",
          "id":"1230",
          "url":"#"
        },
       {
          "num":"1999",
          "time":"2017-8-23",
          "content":"来自文章，就啥都看见啊哈几点开始加快看看数据",
          "id":"1230",
          "url":"#"
        },
        {
          "num":"1999",
          "time":"2017-8-23",
          "content":"来自文章，就啥都看见啊哈几点开始加快看看数据库，会听吗充电接口恐龙快打离开了离苦得乐",
          "id":"1230",
           "url":"#"
        }

    	],
    }
  }
}
</script>
<style scoped>
	.comment{
		width: 790px;
		overflow: hidden;
	}
  .comment h3{
    font-size: 16px;
    margin-bottom: 14px;
  }
  .download{
    width: 788px;
    overflow: hidden;
    background: #fdfdfd;
    border:1px solid #f2f2f2;
    border-radius: 6px;
  }
	.collect{
		width: 790px;
    height: 40px;
	}
  .collect div{
    margin-left: 10px;
    width: 340px;
    height: 40px;
    font-size: 14px;
    color: #333;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
  }
  .collect span{
    display: block;
    height: 40px;
    float: left;
    font-size: 14px;
    color: #bcbcc2;
    line-height: 40px;
    width: 80px;
  }
  .collect a{
    display: block;
    height: 40px;
    float: left;
    font-size: 14px;
    color: #169bd5;
    line-height: 40px;
    width: 40px;
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