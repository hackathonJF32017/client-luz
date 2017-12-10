<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
      <div class="row">
        <label for="areas">Setor de destino</label>
        <select name="areas" id="areas" v-model="selectedArea">
          <option v-for="area in areas" v-bind:key="area.co_setor" v-bind:value="area.co_setor">
            {{ area.no_setor }}
          </option>
        </select>
      </div>
      <div class="row">
        <label for="idea">Sugestão</label>
        <textarea id="idea" v-model="idea"></textarea>
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
  name: 'addidea',
  created() {
    axios
      .get(`http://192.168.2.27/api/setores`, {
        headers: {
          "App-Token": window.localStorage.getItem('token')
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
    add () {
      axios
        .post('http://192.168.2.27/api/ideias',
        {
          co_setor: this.selectedArea,
          de_ideia: this.idea
        },
        {
          headers: {
            "App-Token": window.localStorage.getItem('token')
          }
        })
        .then(response => {
          this.selectedArea = null,
          this.idea = null
          this.$router.push('/listideas');
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  },
  data () {
    return {
      msg: 'Adicionar ideia',
      areas: null,
      selectedArea: null,
      idea: null
    }
  }
}
</script>