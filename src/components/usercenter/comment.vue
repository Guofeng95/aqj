<template>
  <div class="comment">
  	<div class="collect" v-for="(item,index) in collectdata" :key="index">
      <h4>{{item.title}}</h4>
      <div>{{item.time}}</div>
      <p>{{item.content}}</p>
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
          "title":"其实没看懂什么意思",
          "time":"19秒前",
          "content":"来自文章，就啥都看见啊哈几点开始加快看看数据库，会听吗！"
        },
        {
          "title":"希望自费与外来语便宜",
          "time":"2分钟前",
          "content":"来自文章，就啥都看见啊哈几点开始加快看看数据库，会听吗充电接口恐龙快打离开了离苦得乐？"
        },
        {
          "title":"其实没看懂什么意思",
          "time":"19秒前",
          "content":"来自文章，就啥都看见啊哈几点开始加快看看数据库，会听吗！"
        },
        {
          "title":"希望自费与外来语便宜",
          "time":"2分钟前",
          "content":"来自文章，就啥都看见啊哈几点开始加快看看数据库，会听吗充电接口恐龙快打离开了离苦得乐？"
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
	.collect{
		width: 790px;
		padding: 30px 0;
    overflow: hidden;
    border-bottom:1px solid #f6f6f6;
	}
  .collect h4{
    font-size: 16px;
    margin-bottom: 16px;
  }
  .collect div{
    float: left;
    color: #cecece;
    margin-right: 16p;
  }
  .collect p{
    float: left;
    overflow: hidden;
    color: #cecece;
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