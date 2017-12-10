<template>
  <div class="hello">
    <h2>
      {{ msg }}
      <div v-if="nivel == 2">
        <input type="button" v-if="idea.ck_aplicacao != 1" @click="marcar" value="Marcar como implementado" />
      </div>
    </h2>
    <div class="card">
      <div class="row">

      </div>
      <div class="row">
        <h3>
          Sugestão
        </h3>
        <div>"{{idea.de_ideia}}"</div>
      </div>
      <div class="row">
        <span v-if="idea.setor">
          Sugerida por <b>{{ idea.usuario.no_nome }}</b>
        </span>
        <span v-if="idea.setor">
          - ({{ idea.setor.no_setor }})
        </span>
      </div>
      <div class="row">
        <textarea v-model="comment" />
        <input @click="addComment" type="button" value="Incluir comentário" />
      </div>
      <div class="row">
        <div v-if="idea.ck_aplicacao === 1">
          Ideia implementada.
        </div>
        <h5 v-else>Esta idea não foi implementada até o momento.</h5>
      </div>
      <div class="row">
        <div v-if="idea.de_resposta">
          Comentários
        </div>
        <h5 v-else>Sem resposta do setor responsável até então.</h5>
      </div>
      <div class="row">
        <div v-if="idea.comentarios.length > 0">
          <b>Comentários</b>
          <div class="card" v-for="comment in idea.comentarios">
            <div class="row">
              <p>{{comment.de_comentario}}</p>
            </div>
            <div class="info">
              <span>Apoios: {{comment.totalApoios}}</span>
              <input type="button" @click="upvoteComment(comment)" value="Apoiar" />
            </div>
          </div>
        </div>
        <h5 v-else>Não há comentários.</h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

var ctx = {};

export default {
  name: 'ideadetails',
  created() {
    ctx.id = this.$route.params['id'];
    axios
      .get(`http://192.168.2.27/api/ideias/${ctx.id}`, {
        headers: {
          "App-Token": window.localStorage.getItem('token')
        }
      })
      .then(response => {
        this.idea = response.data;
      })
      .catch(e => {
        window.alert("Deu erro :( \n" + e);
      });
  },
  methods: {
    addComment () {
      axios
        .post(`http://192.168.2.27/api/ideias/${ctx.id}/comentarios`,
        {
          de_comentario: this.comment
        },
        {
          headers: {
            "App-Token": window.localStorage.getItem('token')
          }
        })
        .then(response => {
          this.comment = null,
          window.location.reload();
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    },
    upvoteComment (comment) {
      comment.totalApoios += 1;
      axios
        .post(`http://192.168.2.27/api/ideias/${ctx.id}/comentarios/${comment.co_comentario}/apoios`,
        {},
        {
          headers: {
            "App-Token": window.localStorage.getItem('token')
          }
        })
    },
    marcar() {
      this.$swal({
        title: 'Confirmar ação?',
        text: "Você deseja mesmo marcas esta idéia como implementada?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, marcar!',
        cancelButtonText: 'Cancelar'        
      }).then((result) => {
        if(result) {
          axios
          .post('http://192.168.2.27/api/ideias/' + ctx.id + '/marcar', {}, {
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
  data () {
    return {
      msg: 'Detalhes',
      nivel: window.localStorage.getItem('nivel'),
      idea: {
        comentarios: []
      }
    }
  }
}
</script>

<style scoped>
  .card .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  h2 {
    float: left;
    margin-left: 25px;
    text-align: left;
    width: calc(100% - 50px);
  }
  h2 div {
    float: right;
  }
  .align-ideia {
    float: right;
    margin-left: 10px;
  }
</style>
