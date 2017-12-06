<template>
  <div class="level">
  	<div class="ltop">完善身份认证有助于我们为您提供更好的服务</div>
    <div class="demo-input-suffix">
      <span>姓名</span>
      <el-input class="input" v-model="name" placeholder="请输入文字"></el-input>
    </div>
    <div class="demo-input-suffix">
      <span>公司:</span>
      <el-input class="input" v-model="company" placeholder="请输入文字"></el-input>
    </div>
    <div class="demo-input-suffix">
      <span>手机号:</span>
      <el-input class="input" v-model="phone" placeholder="请输入数字"></el-input>
    </div>
    <div class="demo-input-suffix">
      <span>验证码：</span>
      <el-input class="verify" v-model="verify" placeholder="请填写收到的验证码"></el-input>
       <el-button class="btn" type="success">验证码</el-button>
    </div>
    <el-button class="submit" type="success">提交</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
    	name:'',
      company:'',
      phone:'',
      verify:''
    }
  }
}
</script>
<style scoped>
  .level{
    width: 790px;
    overflow: hidden;
  }
  .ltop{
    width: 768px;
    height: 56px;
    background: #fffbf6;
    border:1px solid #fff7ff;
    border-radius: 6px;
    color: #868686;
    padding-left: 20px;
    line-height: 56px;
    font-size: 14px;

  }
  .demo-input-suffix{
    height: 40px;
    line-height: 40px;
    margin-top: 26px;
    padding-bottom: 2px;
  }
  .demo-input-suffix span{
    width: 140px;
    display: block;
    float: left;
  }
  .input{
    width: 260px;
  }
  .verify{
    width: 190px;
  }
  .btn{
    width: 60px;
    text-align: center;
    padding-left:0;
    padding-right:0;
  }
  .submit{
    width: 104px;
    margin-left: 140px;
    margin-top:20px; 
  }
</style>