<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
        <div class="row">
          <label for="nivel">Nivel do usuário</label>
          <select name="nivel" id="nivel" v-model="usuario.co_perfil">
            <option v-for="perfil in perfis" v-bind:value="perfil.co_perfil">{{perfil.no_perfil}}</option>
          </select>
        </div>
        <div class="row">
          <label for="setor">Setor do usuário</label>
          <select name="setor" id="setor" v-model="usuario.co_setor">
            <option v-for="setor in setores" v-bind:value="setor.co_setor">{{setor.no_setor}}</option>
          </select>
        </div>
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
          <input type="password" name="senha" id="senha" v-model="usuario.co_password" />
        </div>
        <div class="row">
          <input @click="add" type="button" value="Cadastrar" />
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addusuario",
  created() {
    axios
    .get('http://192.168.2.27/api/perfis', {
        headers: {
            "App-Token": window.localStorage.getItem('token')
        }
    })
    .then(response => {
        this.perfis = response.data;
    })
    .catch(error => {
        alert(error.response.data.message);
    });

    axios
    .get('http://192.168.2.27/api/setores', {
        headers: {
            "App-Token": window.localStorage.getItem('token')
        }
    })
    .then(response => {
        this.setores = response.data;
    })
    .catch(error => {
        alert(error.response.data.message);
    });
  },
  methods: {
    add() {
      axios
      .post('http://192.168.2.27/api/usuarios', this.usuario, {
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
      msg: "Usuario",
      usuario: {},
      perfis: {},
      setores: {}
    };
  }
};
</script>
