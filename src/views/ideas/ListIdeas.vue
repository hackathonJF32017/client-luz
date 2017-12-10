<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="idea in ideas">
      <div class="card idea">      
        <div class="text">
          <p>{{ idea.de_ideia }}</p>
        </div>
        <div class="info">
          <h3>Apoios: {{ idea.totalApoios }}</h3>
          <input @click="vote(idea)" type="button" class="clickable" value="Apoiar" />
        </div>
      </div>
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
