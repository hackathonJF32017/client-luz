<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
        <div class="row">
          <label for="name">Nome do setor</label>
          <input type="text" name="name" id="name" v-model="area.no_setor" />
        </div>
        <div class="row">
          <label for="description">Descrição do setor</label>
          <textarea name="description" id="description" v-model="area.de_setor" />
        </div>
        <div class="row">
          <input @click="updateArea" type="button" value="Atualizar">
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

var ctx = {};

export default {
  name: "editarea",
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
        this.area = response.data;
      })
      .catch(e => {
        window.alert(e.response.data.message);
      });
  },
  methods: {
    updateArea() {
      axios.post(`http://192.168.2.27/api/setores/${ctx.id}`, this.area, {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$router.push('/listareas');
      })
      .catch(e => {
        window.alert(e.response.data.message);
      });
    }
  },
  data() {
    return {
      msg: "Editar Setor",
      area: {}
    };
  }
};
</script>

<style scoped>
</style>
