<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
        <div class="row">
            <label for="name">Nome do setor</label>
            <input type="text" name="name" id="name" v-model="area.nome" />
        </div>
        <div class="row">
            <label for="description">Descrição do setor</label>
            <textarea name="description" id="description" v-model="area.descricao"></textarea>
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
    addArea() {
      axios
      .post('http://192.168.2.27/api/setores', {
            no_setor: this.area.nome,
            de_setor: this.area.descricao
        }, {
          headers: {
            "App-Token": window.localStorage.getItem("token")
          }
      })
      .then(response => {
        this.$router.push('/listareas');
      })
      .catch(e => {
        console.log(e);
        window.alert(e.response.data.message);
      });
    }
  },
  data() {
    return {
      msg: "Setor",
      area: {
        nome: null,
        descricao: null
      }
    };
  }
};
</script>

<style scoped>
</style>
