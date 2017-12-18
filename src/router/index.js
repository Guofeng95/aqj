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
import forget from "@/components/forget"
import resetnewpwd from "@/components/resetnewpwd"
import manenger from "@/components/manenger/manenger"
import manger from "@/components/manenger/manger"
import submit from "@/components/manenger/submit"
import recommend from '@/components/recommend'
import article from '@/components/article'
import insubscripe from '@/components/insubscripe'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    {
      path: '/insubscripe',
      name: 'insubscripe',
      component: insubscripe
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/resetnewpwd',
      name: 'resetnewpwd',
      component: resetnewpwd
    },
    {
      path: '/manenger',
      component: manenger,
      children: [
        {
          path: '',
          component: manger
        },
        {
          path: '/submit',
          component: submit
        },
       ]
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
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
