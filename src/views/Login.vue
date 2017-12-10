<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <label for="name">Nome</label>
      <input type="text" name="name" id="name" />
      <label for="name">Senha</label>
      <input type="password" name="password" id="password" />
      <input @click="login" type="button" value="Acessar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    login: () => {
      window.alert('Trying to log in!');
    }
  },
  data () {
    return {
      msg: 'Login'
    }
  }
}
</script>