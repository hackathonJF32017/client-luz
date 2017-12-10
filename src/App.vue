<template>
  <div id="app">
    <header>
      <a href="/dashboard"><img src="/static/img/home.png" class="home" /></a>
      <span>LUZ</span>
      <span>
        <input @click="logout" type="button" value="SAIR" class="clickable">
      </span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    logout: async () => {
      await window.localStorage.clear();
      window.location.reload();
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

/* Label */
label {
  display: block;
}

/* Inputs */
input[type='button'] {
  background-color: lightgreen;
  border: 0;
  padding: .4em 1em;  
}

input[type='text'],
input[type='password'] {
  width: 100%;
}

textarea {
  width: 100%;
  min-height: 6em;
}

.clickable:hover {
  cursor: pointer;
}

.row {
  display: block;
  width: 100%;
}

.row:not(:last-of-type) {
  margin-bottom: 1em;
}

.card {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 1em auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 0.2em;
  text-align: left;
  padding: 0.4em;
}
.home {
  width: 30px;
  height: 28px;
  margin-top: 12px;
}
</style>
