<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="nivel == 1">
      <div class="dashboard-admin">
        <a href="/listideias">Ideias</a>
        <a href="/listsetores">Setores</a>
        <a href="/listusuarios">Usuarios</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Dashboard',
      nivel: window.localStorage.getItem('nivel')
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
</style>