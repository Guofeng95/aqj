<template>
  <div class="usercenter">
  	<h2>用户中心</h2>
  	<div class="munu">
  		<div class="one">
  			<img style="margin-top:8px;margin-right:4px;margin-left:2px;" src=" /static/img/message.png">
  			<a @click="light('myifor')" style="color:#ff8a00;" id="myifor" href="#/usercenter">我的消息</a>
  		</div>
  		<div>
  			<img style="margin-top:2px" src=" /static/img/star.png">
  			<a @click="light('usercenter')"  id="usercenter" href="#/collection">我的收藏</a>
  		</div>
  		<div>
  			<img style="margin-top:4px;margin-right:4px" src=" /static/img/wifi.png">
  			<a @click="light('wifi')" id="wifi" href="#/subscripe">我的订阅</a>
  		</div>
  		<div>
  			<img style="margin-top:2px;" src=" /static/img/mail.png">
  			<a @click="light('amail')" id="amail" href="#/comment">我的评论</a>
  		</div>
  		<div>
  			<img style="margin-top:6px;margin-left:2px;margin-right:2px" src=" /static/img/download.png">
  			<a @click="light('download')" id="download" href="#/download">上传头像</a>
  		</div>
  		<div>
  			<img style="margin-top:4px;margin-left:-4px;margin-right:2px" src=" /static/img/level.png">
  			<a @click="light('level')" id="level" href="#/level">我的认证</a>
  		</div>
  		<div>
  			<img style="margin-top:4px;margin-right:5px" src=" /static/img/shezhi.png">
  			<a href="#/reset">设置</a>
  		</div>
  		<div>
  			<img style="margin-top:6px;margin-right:2px" src=" /static/img/out.png">
  			<a href="#" @click="removein">退出登录</a>
  		</div> 
  	</div>
  	<router-view class="content"></router-view>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  computed:{
    ...mapGetters({
      loginis:'loginnow'
    })
  },
  data () {
    return {
      baseurl:Url.baseurl,
    }
  },
  mounted(){
  	// var href=window.location.href.split("/");
   //  var l=href.length;
   //  var hrefn=href[l-1]
    // if(hrefn=="usercenter"){
    //   this.light("myifor");
    // }else if(hrefn=="collection"){
    //   this.light("usercenter");
    // }else if(hrefn=="subscripe"){
    //   this.light("wifi");
    // }else if(hrefn=="comment"){
    //   this.light("amail");
    // }else if(hrefn=="download"){
    //   this.light("download");
    // }else if(hrefn=="level"){
    //   this.light("level");
    // }
  },
  methods:{
  		light(id){
  			var id1 = document.getElementById('usercenter');
  			id1.style.color="#333";
  			var id2 = document.getElementById('amail');
  			id2.style.color="#333";
  			var id3 = document.getElementById('download');
  			id3.style.color="#333";
  			var id4 = document.getElementById('wifi');
  			id4.style.color="#333";
  			var id5 = document.getElementById('level');
  			id5.style.color="#333";
        var id7 = document.getElementById('myifor');
        id7.style.color="#333";
  			var id6 = document.getElementById(id);
  			id6.style.color="#ff8a00";

  		},
      removein(){
        var vm=this;
        axios({
              method:'post',
              url:vm.baseurl + '/user/logout',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                
                console.log(response.data)
                vm.$store.state.loginis=false;
                window.location.href="#/"
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
        
      }
  }
}
</script>
<style scoped>
	.usercenter{
		width: 100%;
    padding-bottom: 20px;
	}
	h2{
		font-size:30px;
		margin-top: 40px;
		margin-bottom: 40px;
	}
	.munu{
	  float: left;
	  width: 160px;
	  height: 300px;
	  border-radius: 4px;
    box-shadow:2px 2px 7px #ccc;
	  margin-bottom: 10px;
	  margin-left: 3px;
	  margin-right: 30px;
	}
	.munu div{
		width: 140px;
		margin:0 auto;
		height: 32px;
		line-height: 32px;
		margin-top: 4px;
	}
	.munu div img{
		display: block;
		float: left;
	}
	.munu .one{
		border-bottom:1px solid #f2f2f2; 
	}
	.munu div a{
		text-decoration: none;
		color: #333;
	}
  .content{
    padding: 10px;
  }
  
</style>