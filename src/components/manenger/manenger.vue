<template>
  <div class="usercenter">
  	<h2>用户中心</h2>
  	<div class="munu">
  		<div class="one">
  			<img  src=" /static/img/mang.png">
  			<a href="#">运营管理</a>
  		</div>
  		<div>
  			<img  src=" /static/img/mantag.png">
  			<a href="#" style="color:#008000">活动管理</a>
  		</div> 
  	</div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  mounted(){
  	
  },
  methods:{
  		

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
	  height: 80px;
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
    margin-top: 8px;
    margin-right:10px;
	}
	.munu .one{
		border-bottom:1px solid #f2f2f2; 
	}
	.munu div a{
		text-decoration: none;
		color: #333;
	}
  .table{
    width: 1100px;
    overflow: hidden;
    margin-left: 200px;
  }
</style>