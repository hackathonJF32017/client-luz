<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="idea in ideas">
      <div class="card idea">      
        <div class="text">
          <p>{{ idea.text }}</p>
        </div>
        <div class="info">
          <h3>Apoios: {{ idea.votes }}</h3>
          <input @click="vote(idea.id)" type="button" class="clickable" value="Apoiar" />
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
          "App-Token":
            "SEFoQjNReTc1ZHQzTWp3Vnc4c3RqMXYrL3BxVWphR3pEcUNTWlY1WEZINE01N25YOGVxKzk0YzRLQm5Sb1Ura1dxbzlmOFJXNWdQQzVQYmFRZlQwdG9CbXZRYWwyMnhVLzNUaU5uY0l6Q1dCZjdYLzRJZmVwd2ZEZUZBOFA3UnJxUUdxSHdVeTI3UjFBd0QxL0U4c053PT0="
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
    vote: idea => {
      window.alert(idea);
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
