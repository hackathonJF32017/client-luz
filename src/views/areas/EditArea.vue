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
      .get(`http://192.168.2.27/api/auth/login/${this.id}`, {
        headers: {
          "App-Token":
            "SEFoQjNReTc1ZHQzTWp3Vnc4c3RqMXYrL3BxVWphR3pEcUNTWlY1WEZINE01N25YOGVxKzk0YzRLQm5Sb1Ura1dxbzlmOFJXNWdQQzVQYmFRZlQwdG9CbXZRYWwyMnhVLzNUaU5uY0l6Q1Y0ellJZEZGS2crRUVLVjZ3QmVNblE3U0FINUhYeHRXRzFLZysvU1RKQld3PT0="
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
    axios.post(`http://192.168.2.27/api/setores/${ctx.id}`,
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
      area: {}
    };
  }
};
</script>

<style scoped>
</style>
