import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'redis',
      component: require('@/components/Redis').default,
      children:[
        {
          path: 'database/:database',
          name: 'redis-database',
          component: require('@/components/Database').default,
          props:true
        },
        {
          path: 'database/:database/:redisKey',
          name: 'redis-key',
          component: require('@/components/Key').default,
          props:true
        },
      ]
    },
    
    {
      path: '*',
      redirect: '/'
    }
  ]
})
