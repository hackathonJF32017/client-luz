import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';

// Setores
import AddSetor from '@/views/setores/AddSetor';
import ListSetores from '@/views/setores/ListSetores';
import EditSetor from '@/views/setores/EditSetor';

// Usuarios
import ListUsuarios from '@/views/usuarios/ListUsuarios';
import EditUsuario from '@/views/usuarios/EditUsuario';
import AddUsuario from '@/views/usuarios/AddUsuario';

// Ideas
import AddIdea from '@/views/ideas/AddIdea';
import ListIdeas from '@/views/ideas/ListIdeas';

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

    // Setores
    {
      path: '/addsetor',
      name: 'AddSetor',
      component: AddSetor,
      meta: {
        nivel: 1
      }
    },
    {
      path: '/listsetores',
      name: 'ListSetores',
      component: ListSetores,
      meta: {
        nivel: 1
      }
    },
    {
      path: '/listsetores/:id',
      name: 'EditSetor',
      component: EditSetor,
      props: true,
      meta: {
        nivel: 1
      }
    },
    {
      path: '/addusuario',
      name: 'AddUsuario',
      component: AddUsuario,
      meta: {
        nivel: 1
      }
    },
    {
      path: '/listusuarios',
      name: 'ListUsuarios',
      component: ListUsuarios,
      meta: {
        nivel: 1
      }
    },
    {
      path: '/listusuarios/:id',
      name: 'EditUsuario',
      component: EditUsuario,
      props: true,
      meta: {
        nivel: 1
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(!to.matched[0].meta.skipAuth) {
    if(!window.localStorage.getItem('token')) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    if(to.matched[0].meta.nivel) {
      var nivel = window.localStorage.getItem("nivel");
      if(to.matched[0].meta.nivel == nivel) {
        next();
      } else {
        next({ path: '/dashboard' });
      }
    }
    next();
  }
});

export default router;
