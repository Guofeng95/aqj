<template>
  <div class="qqqun">
    <div class="qun">
      <h4>一键加QQ群 <span @click="moreqq">更多</span></h4>
      <div>
        <a target="_blank" href="http://jq.qq.com/?_wv=1027&k=40RzIi4"><img src="/static/img/qun.png" ></a>
        <span>网络安全事件</span>
        <span class="add">请加<a target="_blank" href="http://jq.qq.com/?_wv=1027&k=40RzIi4">网络安全事件群</a></span>
      </div>
    </div>
    <div class="qqmore" v-show="qqmoreis">
      <div class="qqcontent"> 
        <h2>一键加QQ群</h2>
        <ul>
          <li>
            <a target="_blank" href="//jq.qq.com/?_wv=1027&k=40RzIi4"><img src="/static/img/qun.png" ></a>
            <p>安全事件群</p>
          </li>
          <li>
            <a target="_blank" href="//jq.qq.com/?_wv=1027&k=40S3D86"><img src="/static/img/qungh.png" ></a>
            <p>网络安全干货群</p>
          </li>
          <li>
            <a target="_blank" href="//jq.qq.com/?_wv=1027&k=40S3EMi"><img src="/static/img/qunpro.png" ></a>
            <p>网络安全产品</p>
          </li>
          <li>
            <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=eaaa2b5070410995713ac19aa389465ff33ac02428fe6f0fe9357d3c0a544d22"><img src="/static/img/qunsm.png" ></a>
            <p>SecMedia群</p>
          </li>
        </ul>
        <div style="clear:both;"></div>
        <p class="qunp">如果合作事项，请加站长QQ：468215215</p>
        <el-button type="success" @click="close">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      qqmoreis:false,
    }
  },
  methods:{
    moreqq(){
      this.qqmoreis=true;
    },
    close(){
      this.qqmoreis=false;
    }
  }
}
</script>
<style scoped>
	.qun{
		width:312px;
    margin-top:30px; 
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    border-radius: 0px;
    
    overflow: hidden;
    padding: 20px 20px;
	}
	.qun h4{
    margin-bottom: 30px;
    margin-left: 10px;
    font-size: 18px;
    position: relative;
  }
  .qun h4 span{
    position: absolute;
    right:0px;
    top: 0px; 
    font-size: 14px;
    font-weight: normal;
    color: #6fba2c;
    cursor: pointer;
  }
   .qun div{
    position: relative;
   }
  .qun div img{
    width: 144px;
    height: 144px;
  }
  .qun div span{
    display: block;
    position: absolute;
    font-size: 14px;
    left: 156px;
    top: 40px;
  }
  .qun div .add{
    top: 60px;
  }
  .qun div .add a{
    color: #6fba2c;
    text-decoration: none;
  }
  .qqmore{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 3;
    background: rgba(0,0,0,0.6);
  }
  .qqcontent{
    position: absolute;
    width: 800px;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -400px;
    background: #fff;
    height: 400px;
    border:1px solid #a1a1a1;
    border-radius: 4px;
    text-align: center;
  }
  .qqcontent h2{
    margin-top: 30px;
  }
  .qqcontent ul{
    margin-top: 40px;
    margin-left: 70px;
  }
  .qqcontent ul li {
    float: left;
    width: 140px;
    text-align: center;
    margin-left: 20px;
    font-size: 14px;
    color: #333;
  }
  .qqcontent ul li img{
    width: 100px;
    height: 100px;
  }
  .qunp{
    margin-top: 20px;
    font-size: 14px;
    color: #333;
    text-align: left;
    margin-left: 120px;
    margin-bottom: 40px;
  }
</style>