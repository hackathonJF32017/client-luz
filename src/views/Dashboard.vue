<template>
  <div class="hello">
    <div v-if="nivel == 1">
      <h1>{{ msg }}</h1>
      <div class="dashboard-admin">
        <a href="/listideas">Ideias</a>
        <a href="/listsetores">Setores</a>
        <a href="/listusuarios">Usuarios</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  created() {
    if(this.nivel > 1) {
      this.$router.push('/listideas');
    }
  },
  data () {
    return {
      msg: 'Dashboard',
      nivel: window.localStorage.getItem('nivel'),
      ideas: []
    }
  }
}
</script>

<style>
.dashboard-admin {
  width: 70%;
  margin: 0 auto;
}

.dashboard-admin a {
  display: inline-block;
  width: 100%;
  background-color: #35495E;
  text-decoration: none;
  padding: 10px 0;
  color: #fff;
  font-weight: sans-serif;
  margin: 10px 0;
}

.align-sugestoes h2 {
  text-align: left;
  margin-left: 25px;
}

.align-sugestoes .align-ideia {
  float: right;
  margin-right: 25px;
}
</style>