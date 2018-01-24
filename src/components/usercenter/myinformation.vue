<template>
  <div class="comment">
    <div class="collect" v-for="(item,index) in collectdata" :key="index" v-if="collectdata.length>0">
      <h4>{{item.title}}</h4>
      <div>{{item.time}}</div>
      <p><a style="cursor:pointer">{{item.content}}</a></p>
    </div>
    <div v-if="collectdata.length==0" class="collect">
      <h4></h4>
      <div></div>
      <p><a style="cursor:pointer">无消息</a></p>
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
      atricleurl:Url.atricleurl,
      notice:'',
      conbotis:true,
      collectdata:[
      ],
    }
  },
  mounted(){
    //this.collectdata=[];
    this.searchdata();
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
              url:vm.baseurl + '/user/message_list',
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
                    obj.time=element.time;
                    obj.content =element.text;
                    vm.collectdata.push(obj);
                  });
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
    },
    article(id,name){
      window.location.href=window.location.href=this.atricleurl+'topid='+id+'comid='+name;
    }
  }

}
</script>
<style scoped>
  .comment{
    width: 790px;
     border-radius: 4px;
    box-shadow:2px 2px 7px #ccc;
    padding: 10px; 
    overflow: hidden;
  }
  .collect{
    width: 770px;
    padding: 30px 10px;
    overflow: hidden;
    border-bottom:1px dashed #d7d7d7;
  }
  .collect h4{
    font-size: 16px;
    float: left;
    margin-bottom: 16px;
  }
  .collect div{
    float: right;
    color: #797979;
    margin-right: 16p;
  }
  .collect p{
    clear: both;
    overflow: hidden;
    color: #797979;
  }
  .collect p a{
    color: #797979;
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