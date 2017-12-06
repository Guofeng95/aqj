import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import usercenter from "@/components/usercenter/usercenter"
import collection from "@/components/usercenter/collection"
import subscribe from "@/components/usercenter/subscribe"
import comment from "@/components/usercenter/comment"
import download from "@/components/usercenter/download"
import level from "@/components/usercenter/level"
import reset from "@/components/reset/reset"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/reset',
      name: 'reset',
      component: reset
    },
    {
      path: '/usercenter',
      component: usercenter,
      children: [
        {
    			path: '',
    			component: collection
    		},
        {
          path: '/subscripe',
          component: subscribe
        },
        {
          path: '/comment',
          component: comment
        },
        {
          path: '/download',
          component: download
        },
        {
          path: '/level',
          component: level
        },
		  ]
    },

  ]
})
