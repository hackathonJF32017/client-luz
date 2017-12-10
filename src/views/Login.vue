<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
      <div class="row">
        <label for="name">Nome</label>
        <input type="text" name="name" id="name" v-model="login" />
      </div>
      <div class="row">
        <label for="name">Senha</label>
        <input type="password" name="password" id="password" v-model="password" />
      </div>
      <div class="row">
        <input @click="doLogin" type="button" value="Acessar" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'login',
    methods: {
      doLogin() {
        axios
          .post('http://192.168.2.27/api/auth/login', {
            no_login: this.login,
            co_password: this.password
          })
          .then(response => {
            if(response.data.token) {
              window.localStorage.setItem('token', response.data.token);
              window.localStorage.setItem('nivel', response.data.perfil);
              this.$router.push('/dashboard');
            }
          })
          .catch(error => {
            alert(error.response.data.message);
            this.login = this.password = null;
          });
      }
    },
    data() {
      return {
        msg: 'Login',
        login: null,
        password: null
      }
    }
  }
</script>