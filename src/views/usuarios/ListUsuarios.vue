<template>
  <div class="hello">
    <h2>
      {{ msg }}
      <router-link :to="{path: 'addusuario'}" class="align-setores">
        <input type="button" value="Cadastrar usuario" />
      </router-link>
    </h2>
    <div v-for="usuario in usuarios">
      <div class="card">
        <div class="text">
          <h3>Nome: {{ usuario.no_nome }}</h3>
        </div>
        <div class="info">
          <input type="button" value="Excluir" :data-id="usuario.co_usuario" @click="remove" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "listusuarios",
  created() {
    axios
      .get('http://192.168.2.27/api/usuarios', {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.usuarios = response.data;
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
        text: "Você deseja mesmo excluir este usuario?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'        
      }).then((result) => {
        if(result) {
          axios
          .delete('http://192.168.2.27/api/usuarios/' + id, {
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
      msg: "Usuarios",
      usuarios: []
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
