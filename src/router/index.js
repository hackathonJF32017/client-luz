import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Profile from '@/views/Profile';
import Dashboard from '@/views/Dashboard';

// Area
import AddArea from '@/views/areas/AddArea';
import ListAreas from '@/views/areas/ListAreas';
import EditArea from '@/views/areas/EditArea';

// Ideas
import AddIdea from '@/views/ideas/AddIdea';
import ListIdeas from '@/views/ideas/ListIdeas';
import IdeaDetails from '@/views/ideas/IdeaDetails';

import NotFound from '@/views/NotFound';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        skipAuth: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },

    // Idea
    {
      path: '/addidea',
      name: 'AddIdea',
      component: AddIdea,
    },
    {
      path: '/listideas',
      name: 'ListIdeas',
      component: ListIdeas,
    },
    {
      path: '/listideas/:id',
      name: 'IdeaDetails',
      component: IdeaDetails,
    },

    // Area
    {
      path: '/addarea',
      name: 'AddArea',
      component: AddArea,
    },
    {
      path: '/listareas',
      name: 'ListAreas',
      component: ListAreas,
    },
    {
      path: '/listareas/:id',
      name: 'EditArea',
      component: EditArea,
      props: true
    },

    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(!to.matched.some(record => record.meta.skipAuth)) {
    if(!window.localStorage.getItem('token')) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
