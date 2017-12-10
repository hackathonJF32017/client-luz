<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
        <div class="row">
          <label for="name">Nome do setor</label>
          <input type="text" name="name" id="name" v-model="setor.no_setor" />
        </div>
        <div class="row">
          <label for="description">Descrição do setor</label>
          <textarea name="description" id="description" v-model="setor.de_setor" />
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
  name: "editsetor",
  props: ['id'],
  created() {
    ctx.id = this.id;
    axios
      .get(`http://192.168.2.27/api/setores/${this.id}`, {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.setor = response.data;
      })
      .catch(e => {
        window.alert(e.response.data.message);
      });
  },
  methods: {
    update() {
      axios.post(`http://192.168.2.27/api/setores/${ctx.id}`, this.setor, {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$router.push('/listsetores');
      })
      .catch(e => {
        window.alert(e.response.data.message);
      });
    }
  },
  data() {
    return {
      msg: "Editar setor",
      setor: {}
    };
  }
};
</script>

<style scoped>
</style>
