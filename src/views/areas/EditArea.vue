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

export default {
  name: "editarea",
  props: [id],
  created() {
    axios
      .get(`http://192.168.2.27/api/setores/${this.id}`, {
        headers: {
          "App-Token":
            "SEFoQjNReTc1ZHQzTWp3Vnc4c3RqMXYrL3BxVWphR3pEcUNTWlY1WEZINE01N25YOGVxKzk0YzRLQm5Sb1Ura1dxbzlmOFJXNWdQQzVQYmFRZlQwdG9CbXZRYWwyMnhVLzNUaU5uY0l6Q1dCZjdYLzRJZmVwd2ZEZUZBOFA3UnJxUUdxSHdVeTI3UjFBd0QxL0U4c053PT0="
        }
      })
      .then(response => {
        this.area = response.data;
      })
      .catch(e => {
        window.alert("Deu erro :( \n" + e);
      });
  },
  methods: {
    updateArea: area => {
    axios.post(`http://192.168.2.27/api/setores/${this.id}`,
        {
          no_setor: 'Nome do setor',
          de_setor: 'Desc do setor'
        },
        {
        headers: {
          "App-Token": "SEFoQjNReTc1ZHQzTWp3Vnc4c3RqMXYrL3BxVWphR3pEcUNTWlY1WEZINE01N25YOGVxKzk0YzRLQm5Sb1Ura1dxbzlmOFJXNWdQQzVQYmFRZlQwdG9CbXZRYWwyMnhVLzNUaU5uY0l6Q1dGbEtJVGVUR2F2VHBVK2VhMUxlNGcvZVhLS2dZbjNlV2ZOWHlaeWhGbnRBPT0="
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
      msg: "Editar Setor",
      id: null,
      area: {}
    };
  }
};
</script>

<style scoped>
</style>
