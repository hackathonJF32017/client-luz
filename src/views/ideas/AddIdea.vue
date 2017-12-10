<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <label for="name">Nome</label>
      <textarea></textarea>
      <input @click="add" type="button" value="Cadastrar" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'addidea',
  methods: {
    add: () => {
      window.alert('Trying to add idea!');
    }
  },
  data () {
    return {
      msg: 'Adicionar ideia'
    }
  }
}
</script>