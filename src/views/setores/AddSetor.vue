<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
        <div class="row">
            <label for="name">Nome do setor</label>
            <input type="text" name="name" id="name" v-model="setor.nome" />
        </div>
        <div class="row">
            <label for="description">Descrição do setor</label>
            <textarea name="description" id="description" v-model="setor.descricao"></textarea>
        </div>
        <div class="row">
            <input @click="add" type="button" value="Cadastrar">
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addsetor",
  methods: {
    add() {
      axios
      .post('http://192.168.2.27/api/setores', {
            no_setor: this.setor.nome,
            de_setor: this.setor.descricao
        }, {
          headers: {
            "App-Token": window.localStorage.getItem('token')
          }
      })
      .then(response => {
        this.$router.push('/listsetores');
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
      setor: {
        nome: null,
        descricao: null
      }
    };
  }
};
</script>
