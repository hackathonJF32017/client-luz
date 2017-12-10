<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
        <div class="row">
            <label for="name">Nome do setor</label>
            <input type="text" name="name" id="name" />
        </div>
        <div class="row">
            <label for="description">Descrição do setor</label>
            <textarea name="description" id="description"></textarea>
        </div>
        <div class="row">
            <input @click="addArea" type="button" value="Cadastrar">
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addarea",
  methods: {
    addArea: area => {
    axios
    .post(`http://192.168.2.27/api/setores`,
        {
            no_setor: 'Nome do setor',
            de_setor: 'Desc do setor'
        },
        {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.area = response.data;
      })
      .catch(e => {
        window.alert("Deu erro :(\n" + e);
      });
    }
  },
  data() {
    return {
      msg: "Setor",
      area: null
    };
  }
};
</script>

<style scoped>
</style>
