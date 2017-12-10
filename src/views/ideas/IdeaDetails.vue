<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="card">
      <div class="row">

      </div>
      <div class="row">
        <h3>Sugestão</h3>
        <div>"{{idea.de_ideia}}"</div>
      </div>
      <div class="row">
        <span v-if="idea.setor">
          Sugerida por <b>{{ idea.setor.no_nome }}</b>
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
          this.$router.push('/listideas');
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
    }
  },
  data () {
    return {
      msg: 'Detalhes',
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
</style>
