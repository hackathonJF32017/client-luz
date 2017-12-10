<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="area in areas">
      <div class="card area">      
        <div class="text">
          <h2>Nome: {{ area.no_setor }}</h2>
          <h2>Descrição: {{ area.de_setor }}</h2>
        </div>
        <div class="info">
          <router-link :to="{path: 'listareas/' + area.co_setor}">
            <input type="button" value="Editar" />
          </router-link>
          <input type="button" value="Excluir" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "listareas",
  created() {
    axios
      .get(`http://192.168.2.27/api/setores`, {
        headers: {
          "App-Token":
            "SEFoQjNReTc1ZHQzTWp3Vnc4c3RqMXYrL3BxVWphR3pEcUNTWlY1WEZINE01N25YOGVxKzk0YzRLQm5Sb1Ura1dxbzlmOFJXNWdQQzVQYmFRZlQwdG9CbXZRYWwyMnhVLzNUaU5uY0l6Q1dCZjdYLzRJZmVwd2ZEZUZBOFA3UnJxUUdxSHdVeTI3UjFBd0QxL0U4c053PT0="
        }
      })
      .then(response => {
        this.areas = response.data;
      })
      .catch(e => {
        window.alert("Deu erro :( \n" + e);
      });
  },
  methods: {
    vote: idea => {
      window.alert(idea);
    }
  },
  data() {
    return {
      msg: "Setores",
      areas: []
    };
  }
};
</script>

<style scoped>
.card .text {
  flex: 1;
}
.card .info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.card .info h3 {
  font-size: 1.1em;
  font-weight: 400;
}
</style>
