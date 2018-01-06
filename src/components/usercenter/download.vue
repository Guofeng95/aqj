<template>
  <div class="comment">
    <h3>我的头像</h3>
    <div class="download" v-show="fix">
      <img class="now" :src="baseurl+userurl">
    </div>
    <div class="download"  >
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
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
    }
  },
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
  }
	.now{
    width: 148px;
    margin-left: 100px;
    margin-top: 80px;
    height: 148px;
    border-radius: 6px;
    border: 1px solid #f5f5f5;
  }
</style>