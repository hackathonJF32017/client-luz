<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="nivel == 2">
      asasas
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