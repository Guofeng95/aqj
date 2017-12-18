<template>
  <div class="comment">
  	<div class="collect" v-for="(item,index) in collectdata" :key="index">
      <h4>{{item.title}}</h4>
      <div>{{item.time}}</div>
      <p> 来自文章：<a href="#">{{item.content}}</a></p>
  	</div>
  	<div class="conbot" v-show="conbotis" @click="searchdata">
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
      baseurl:Url.baseurl,
      notice:'',
      conbotis:true,
    	collectdata:[
    		{
          "title":"其实没看懂什么意思",
          "time":"19秒前",
          "content":"就啥都看见啊哈几点开始加快看看数据库，会听吗！"
        },
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
              url:vm.baseurl + '/article/news_list_my_comments',
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
                    obj.title=element.content;
                    obj.id=element.id;
                    obj.time='19秒前';
                    obj.content = '就啥都看见啊哈几点开始加快看看数据库，会听吗！';
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
    margin-left: 10px;
  }
  .collect p a{
    color: #cecece;
    text-decoration: none;
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