<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
        <div class="row">
          <label for="name">Nome do usuario</label>
          <input type="text" name="name" id="name" v-model="usuario.no_nome" />
        </div>
        <div class="row">
          <label for="login">Login do usuario</label>
          <input type="text" name="login" id="login" v-model="usuario.no_login" />
        </div>
        <div class="row">
          <label for="senha">Senha do usuario</label>
          <input type="text" name="senha" id="senha" v-model="usuario.co_password" />
        </div>
        <div class="row">
          <input @click="update" type="button" value="Atualizar">
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

var ctx = {};

export default {
  name: "editusuario",
  props: ['id'],
  created() {
    ctx.id = this.id;
    axios
      .get(`http://192.168.2.27/api/usuarios/${this.id}`, {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.usuario = response.data;
        this.usuario.co_password = null;
      })
      .catch(e => {
        window.alert(e.response.data.message);
      });
  },
  methods: {
    update() {
      axios.post(`http://192.168.2.27/api/usuarios/${ctx.id}`, this.usuario, {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$router.push('/listusuarios');
      })
      .catch(e => {
        window.alert(e.response.data.message);
      });
    }
  },
  data() {
    return {
      msg: "Editar usuario",
      usuario: {}
    };
  }
};
</script>

<style scoped>
</style>
