<template>
  <div class="level">
   <div v-show="status==1">
    	<div class="ltop">根据<a href="http://www.shiguai.gov.cn/information/sgq_zfhcxjsj43/msg18222215157.html">《中国人民共和国安全法》</a>要求，您需要实名认证，完善身份认证有助于我们为您提供更好的服务</div>
      <div class="demo-input-suffix">
        <span>姓名:</span>
        <el-input class="input" v-model="name" @change="check('name')" placeholder="请输入文字"></el-input>
        <p v-show="nameis">名字不可超过20个字，且不能为空</p>
      </div>
      <div class="demo-input-suffix">
        <span>公司:</span>
        <el-input class="input" v-model="company" @change="check('company')" placeholder="请输入文字"></el-input>
        <p v-show="companyis">公司不可超过50个字，且不能为空</p>
      </div>
          <div class="demo-input-suffix">
        <span>部门:</span>
        <el-input class="input" v-model="dapartment" @change="check('dapartment')" placeholder="请输入文字"></el-input>
        <p v-show="dapartmentis">部门不可超过50个字，且不能为空</p>
      </div>
      <div class="demo-input-suffix">
        <span>手机号:</span>
        <el-input class="input" v-model="phone" @change="check('phone')" placeholder="请输入数字"></el-input>
        <p v-show="phoneis">请填写正确的手机号</p>
      </div>
      <div class="demo-input-suffix">
        <span>验证码:</span>
        <el-input class="verify" v-model="verify" placeholder="请填写收到的验证码"></el-input>
         <el-button class="btn" type="success" @click="verifygo">验证码</el-button>
      </div>
      <el-button class="submit" type="success" @click="submitgo">提交</el-button>
    </div>
    <div v-show="status==2" class="subok">
      <h4>认证申请提交成功，请耐心等待审核......</h4>
      <a href="#/recommend">去看推荐文章吧</a>
    </div>
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
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow'
    })
  },
  data () {
    return {
      baseurl:Url.baseurl,
      status:1,
    	name:'',
      company:'',
      phone:'',
      verify:'',
      dapartment:'',
      verifybtis:false,
      phoneis:false,
      nameis:false,
      companyis:false,
      dapartmentis:false,
    }
  },
  mounted(){
    //console.log(this.userstatus)
    if(this.userstatus=="待确认"){
      this.status=2;
    }else{
      this.status=1;
    }
  },
  methods:{
    verifygo(){
      if(this.phone==""){
        this.phoneis=true;
      }
      if(this.phone!="" && this.phoneis==false){
        var vm=this;
        var date={};
        date.phone_number =this.phone
        axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/user/verify_phone',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                   vm.verifybtis=true;
                   vm.$message.success("手机验证码已发送！");
              }else{
                vm.verifybtis=false;
                  vm.$message.warning("此手机号不可用");
              }
          })
       
      }
      
    },
    check(style){
      if(style == 'name'){
        var l=this.name.length;
        if(l>0 && l<=20){
          this.nameis=false;
        }else{
          this.nameis=true;
        }
      };
      if(style == 'company'){
        var l=this.company.length;
        if(l>0 && l<=50){
          this.companyis=false;
        }else{
          this.companyis=true;
        }
      };
      if(style == 'dapartment'){
        var l=this.dapartment.length;
        if(l>0 && l<=50){
          this.dapartmentis=false;
        }else{
          this.dapartmentis=true;
        }
      };
      if(style == 'phone'){
        var l=/^1\d{10}$/.test(this.phone);
        if(l){
          this.phoneis=false;
        }else{
          this.phoneis=true;
        }
      };
    },
    submitgo(){
      var vm=this;
      if(this.phone!="" && this.name!="" && this.company!="" && this.verify!="" && this.dapartment!=""){
        if(this.phoneis==false && this.nameis==false && this.companyis==false && this.verifybtis!=false && this.dapartmentis==false){
          var date={};
          date.real_name=this.name;
          date.company=this.company;
          date.department=this.department;
          date.phone_number=this.phone;
          date.code=this.verify;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/user/update_verification_info',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                vm.status=2;
                vm.$store.state.userstatus="待确认"
              }else{
                vm.$message.warning(response.data.msg);
              }
          });
        }
      }else{
        this.$message.error("请填写信息！");
      }
    }

  }
}
</script>
<style scoped>
  .level{
    width: 790px;
    overflow: hidden;
     border-radius: 4px;
     height: 526px;
    box-shadow:2px 2px 7px #ccc;
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
  .ltop a{
    text-decoration: none;
    color: #169BD5;
  }
  .demo-input-suffix{
    height: 40px;
    line-height: 40px;
    margin-left: 100px;
    margin-top: 26px;
    width: 400px;
    padding-bottom: 12px;
  }
  .demo-input-suffix span{
    width: 140px;
    display: block;
    float: left;
  }
  .demo-input-suffix p{
    color: red;
    padding-left: 150px;
    font-size: 14px;
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
    margin-bottom: 30px;
  }
  .subok{
    text-align: center;
  }
  .subok h4{
    font-size:20px;
    font-weight: normal;
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .subok a{
    text-decoration: none;
    color: #169BD5;
  }
</style>