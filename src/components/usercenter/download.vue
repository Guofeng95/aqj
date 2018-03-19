<template>
  <div class="comment">
    <h3>我的头像</h3>
    <div class="download" v-show="fix">
      <img class="now" :src="userurl">
      <el-upload
        name="imagefile"
        class="upload-demo"
        with-credentials
        :before-upload="beforeAvatarUpload"
        :limit="1"
        :file-list="fileList2"
        :action="baseurl+'/user/upload_avatar'"
        :on-success="handleChange">
        <el-button size="small" class="btnright" type="primary">修改头像</el-button>
      </el-upload>
      <p style="color:#666;font-size:14px;margin-left:380px;margin-top:20px;">头像图片应是 JPG/PNG/JPEG 格式</p>
    </div>
    <!-- <div class="download"  v-show="fix==false">
      <el-upload class="now userimg"
        with-credentials
        name="imagefile"
        :action="baseurl+'/user/upload_avatar'"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny" class="userimg" >
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-button plain class="btnleft" :disabled="now"  type="warning" @click="fixchange(true)">取消修改</el-button>
    </div> -->
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
      userstatus:'statusnow',
      userlevel:'userlevelnow'
    })
  },
  data () {
    return {
    	dialogImageUrl: '',
      dialogVisible: false,
      fix:true,
      baseurl:Url.baseurl,
      now:false,
      fileList2: []
    }
  },
  methods: {
      handleChange(file) {
        console.log(file)
        this.now=true;
        var vm=this;
        if(file.status==1){
          this.fileList2=[];
          this.$store.state.userurl=file.filename;
          this.$message.success("修改成功");
        }else{
          this.$message.error(file.msg);
        }
        
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
         const ispng = file.type === 'image/png';

        if (isJPG==false &&  ispng==false) {
          this.$message.error('上传头像图片应是 JPG/PNG/JPEG 格式!');
          return false;
        }
        return true ;
      }

    }

}
</script>
<style scoped>
	.comment{
		width: 790px;

		overflow: hidden;
	}
  .comment h3{
    font-size: 16px;
    margin-bottom: 14px;
  }
  .download{
    width: 788px;
    height: 300px;
    overflow: hidden;
    background: #fdfdfd;
    border:1px solid #f2f2f2;
    border-radius: 6px;
    position: relative;
  }
	.now{
    width: 148px;
    margin-left: 180px;
    margin-top: 80px;
    height: 148px;
    border-radius: 6px;
    display: block;
    float: left;
    border: 1px solid #f5f5f5;
  }
  .btnright{
    margin-top: 140px;
    margin-left: 100px;
  }
  .userimg{
    position: absolute;
    top: 0px;
    left: 0;

  }
  .btnleft{
    margin-top: 140px;
    margin-left: 440px;
  }
</style>