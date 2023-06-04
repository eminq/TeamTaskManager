<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Team Tasks</a> -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
          <router-link to="/" id="home-link" class="nav-link" :class="{ 'active' :  $route.path === '/' }"> Home </router-link> 
          <router-link to="/about" id="about-link" class="nav-link" :class="{ 'active' :  $route.path === '/bout' }">About</router-link>
          <router-link v-if="!store.state.isLoggedIn" to="/login" id="login-link" class="nav-link" :class="{ 'active' : $route.path === '/login' }"> Login </router-link> 
          <router-link v-if="!store.state.isLoggedIn" to="/register" id="register-link" class="nav-link" :class="{ 'active' : $route.path === '/register' }"> Register </router-link> 
          <router-link v-if="store.state.isLoggedIn" to="/tasks" id="tasks-link" class="nav-link" :class="{ 'active' : $route.path === '/tasks' }"> Tasks </router-link> 
          <router-link to="#" v-if="store.state.isLoggedIn" @click.prevent="logout()" class="nav-link"> Logout </router-link>  
        </div>
        <span v-if="store.state.isLoggedIn" class="d-flex"><img :src="store.state.user.image" style="width: 40px; height: auto;" alt="avatar"> <button  class="bg-transparent border-0 nav-link text-info"> {{ store.state.user.firstName }}</button></span>
      </div>
      </div>
    </nav>
  </template>
  
  <script>
  import Store from '../store/store'

  export default {
    name: 'NavComponent',
    data(){
      return {
        store: Store
      }
    },
    methods: {
      logout(){
        this.$router.push('/');
        this.store.dispatch('setToken', null);
        this.store.dispatch('setUser', '');      // check if this works
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style >

    .navbar {
        background: linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1));
    }
  
  </style>
  