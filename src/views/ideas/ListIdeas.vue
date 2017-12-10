<template>
  <div class="hello">
    <h2>
      {{ msg }}
      <router-link :to="{path: 'addidea'}" class="align-ideia">
        <input type="button" value="Cadastrar idéia" />
      </router-link>
    </h2>
    <div v-for="idea in ideas">
      <router-link :to="{path: '/listideas/' + idea.co_ideia}">
        <div class="card idea">
          <div class="text">
            <p>{{ idea.de_ideia }}</p>
          </div>
          <div class="info">
            <h3>Apoios: {{ idea.totalApoios }}</h3>
            <input @click="vote(idea)" type="button" class="clickable" value="Apoiar" />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "listideas",
  created() {
    axios
      .get(`http://192.168.2.27/api/ideias`, {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.ideas = response.data;
      })
      .catch(e => {
        window.alert("Deu erro :( \n" + e);
      });
  },
  methods: {
    vote (idea) {
      idea.totalApoios += 1;
      axios
        .post(`http://192.168.2.27/api/ideias/${idea.co_ideia}/apoios`,
        {},
        {
          headers: {
            "App-Token": window.localStorage.getItem('token')
          }
        })
        .then(response => {
          this.$router.push('/listideas');
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  },
  data() {
    return {
      msg: "Sugestões",
      ideas: []
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333;
}
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
h2 {
  text-align: left;
  margin-left: 25px;
}
.align-ideia {
  float: right;
  margin-right: 25px;
}
</style>
