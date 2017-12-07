<template>
  <div class="usercenter">
  	<div class="table">
      <div class="demo-input-suffix">
        <span>活动标题:</span>
        <el-input class="input" v-model="title" placeholder="请填写活动标签"></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>对应页面的URL:</span>
        <el-input class="input" v-model="url" placeholder="请包含http：//"></el-input>
      </div>
      <div class="demo-input-suffix">
        <span>活动标题:</span>
        <el-radio v-model="radio" label="1">推荐</el-radio>
        <el-radio v-model="radio" label="2">安全头条</el-radio>
      </div>
      <div class="demo-input-suffix" style="height:auto;width:400px;">
        <span>上传活动封面:</span>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，建议尺寸为900×500</div>
        </el-upload>
      </div>
      <div class="demo-input-suffix">
        <span>设置活动类型为:</span>
        <el-select v-model="value" class="input" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div v-show="value==1">
        <div class="demo-input-suffix">
          <span>姓名:</span>
          <el-input class="input" v-model="name1" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>电话:</span>
          <el-input class="input" v-model="phone1" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>公司:</span>
          <el-input class="input" v-model="company1" ></el-input>
        </div>
      </div>
      <div v-show="value==2">
        <div class="demo-input-suffix">
          <span>ID:</span>
          <el-input class="input" v-model="id2"></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>邮件:</span>
          <el-input class="input" v-model="mail2" ></el-input>
        </div>
      </div>
      <div v-show="value==3">
        <div class="demo-input-suffix">
          <span>姓名:</span>
          <el-input class="input" v-model="name3" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>电话:</span>
          <el-input class="input" v-model="phone3" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>公司:</span>
          <el-input class="input" v-model="company3" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>地址:</span>
          <el-input class="input" v-model="adress3" ></el-input>
        </div>
      </div>
      <div v-show="value==4">
        <div class="demo-input-suffix">
          <span>姓名:</span>
          <el-input class="input" v-model="name4" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>电话:</span>
          <el-input class="input" v-model="phone4" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>行业:</span>
          <el-input class="input" v-model="job4" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>公司:</span>
          <el-input class="input" v-model="company4" ></el-input>
        </div>
        
      </div>
      <div v-show="value==5">
        <div class="demo-input-suffix">
          <span>ID:</span>
          <el-input class="input" v-model="id5"></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>行业:</span>
          <el-input class="input" v-model="job5" ></el-input>
        </div>
        <div class="demo-input-suffix">
          <span>邮件:</span>
          <el-input class="input" v-model="mail5" ></el-input>
        </div>
      </div>
  	</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mail5:'',
      job5:'',
      id5:'',
      company4:'',
      job4:'',
      phone4:'',
      name4:'',
      adress3:'',
      company3:'',
      phone3:'',
      name3:'',
      id2:'',
      mail2:'',
      name1:'',
      company1:'',
      phone1:'',
      title:'',
      url:'',
      radio:'',
      value:'1',
      fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      options: [{
          value: '1',
          label: '会议注册'
        }, {
          value: '2',
          label: '文档下载'
        }, {
          value: '3',
          label: '资料邮寄'
        }, {
          value: '4',
          label: '行业模块'
        }, {
          value: '5',
          label: '调查报告'
        }],

    }
  },
  mounted(){
  	
  },
  methods:{
  		 handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
  .table{
    width: 1100px;
    overflow: hidden;
    margin-left: 200px;
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