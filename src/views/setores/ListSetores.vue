<template>
  <div class="hello">
    <h2>
      {{ msg }}
      <router-link :to="{path: 'addsetor'}" class="align-setores">
        <input type="button" value="Cadastrar setor" />
      </router-link>
    </h2>
    <div v-for="setor in setores">
      <div class="card area">
        <div class="text">
          <h3>Nome: {{ setor.no_setor }}</h3>
          <h4>Descrição: {{ setor.de_setor }}</h4>
        </div>
        <div class="info">
          <router-link :to="{path: 'listsetores/' + setor.co_setor}">
            <input type="button" value="Editar" />
          </router-link>
          <input type="button" value="Excluir" @click="remove" :data-id="setor.co_setor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "listsetores",
  created() {
    axios
      .get('http://192.168.2.27/api/setores', {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.setores = response.data;
      })
      .catch(e => {
        window.alert(e.response.data.message);
      });
  },
  methods: {
    remove(c) {
      var id = c.toElement.dataset.id;
      this.$swal({
        title: 'Confirmar ação?',
        text: "Você deseja mesmo excluir este setor?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'        
      }).then((result) => {
        if(result) {
          axios
          .delete('http://192.168.2.27/api/setores/' + id, {
            headers: {
              "App-Token": window.localStorage.getItem('token')
            }
          })
          .then(response => {
            if(response.status == 200) {
              window.location.reload();
            }
          });
        }
      }, () => {});
    }
  },
  data() {
    return {
      msg: "Setores",
      setores: []
    };
  }
};
</script>

<style scoped>
h2 {
  text-align: left;
  margin-left: 25px;
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
.align-setores {
  float: right;
  margin-right: 25px;
}
</style>
