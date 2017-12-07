<template>
  <div class="usercenter">
  	<h2>用户中心</h2>
  	<div class="munu">
  		<div class="one">
  			<img style="margin-top:8px;margin-right:4px;margin-left:2px;" src=" /static/img/message.png">
  			<a href="#">我的消息</a>
  		</div>
  		<div>
  			<img style="margin-top:2px" src=" /static/img/star.png">
  			<a @click="light('usercenter')" style="color:#008000;" id="usercenter" href="#/usercenter">我的收藏</a>
  		</div>
  		<div>
  			<img style="margin-top:4px;margin-right:4px" src=" /static/img/wifi.png">
  			<a @click="light('wifi')" id="wifi" href="#/subscripe">我的订阅</a>
  		</div>
  		<div>
  			<img style="margin-top:2px;" src=" /static/img/mail.png">
  			<a @click="light('mail')" id="mail" href="#/comment">我的评论</a>
  		</div>
  		<div>
  			<img style="margin-top:6px;margin-left:2px;margin-right:2px" src=" /static/img/download.png">
  			<a @click="light('download')" id="download" href="#/download">我上传的</a>
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
export default {
  computed:{
    ...mapGetters({
      loginis:'loginnow'
    })
  },
  data () {
    return {
    }
  },
  mounted(){
  	
  },
  methods:{
  		light(id){
  			var id1 = document.getElementById('usercenter');
  			id1.style.color="#333";
  			var id2 = document.getElementById('mail');
  			id2.style.color="#333";
  			var id3 = document.getElementById('download');
  			id3.style.color="#333";
  			var id4 = document.getElementById('wifi');
  			id4.style.color="#333";
  			var id5 = document.getElementById('level');
  			id5.style.color="#333";
  			var id6 = document.getElementById(id);
  			id6.style.color="#008000";

  		},
      removein(){
        this.$store.state.loginis=false;
        window.location.href="#/"
      }
  }
}
</script>
<style scoped>
	.usercenter{
		width: 100%;
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
</style>