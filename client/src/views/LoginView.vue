<template>
    
    <main class="container-fluid">

        <div class="row align-content-center ">
            <div class="col-4"></div>
            <div class="col-4">
                
                <div class="card mt-5" style="width: 30rem;">
                    <div class="card-header btn-group mt-2" role="group" aria-label="Basic example">
                        <button class="btn btn-primary btn-active" id="btn-user" type="button" @click="showUser()">
                          User
                        </button>
                        <button class="btn btn-primary" id="btn-admin" type="button" @click="showAdmin()">
                          Admin
                        </button>
                    </div>
                    <img src="../assets/icon.webp" class="card-img-top" alt="...">
                    <div class="d-block" id="userForm">
                        <div class="card-body">
                            <h5 class="card-title text-center">User Login</h5>
                            <form @submit.prevent="userLogin()" id="userForm" class="col-12">
                                <div class="mb-3">
                                    <label for="emailUser" class="form-label">Email</label>
                                    <input type="email" class="form-control" name="email" id="emailUser" v-model="email">
                                </div>
                                <div class="mb-3">
                                    <label for="passwordUser" class="form-label">Password</label>
                                    <input type="password" class="form-control" name="password" id="passwordUser" v-model="password">
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>
                        </div>
                        <p class="ms-3">Don't have an account? <RouterLink to="/register" class="text-decoration-none text-info">Register</RouterLink> </p>
                    </div>
                    <div class="d-none" id="adminForm">
                        <div class="card-body">
                            <h5 class="card-title text-center">Admin Login</h5>
                            <form @submit.prevent="adminLogin()" id="adminForm" class="col-12">
                                <div class="mb-3">
                                    <label for="emailAdmin" class="form-label">Email</label>
                                    <input type="email" class="form-control" name="email" id="emailAdmin"  v-model="email">
                                </div>
                                <div class="mb-3">
                                    <label for="passwordAdmin" class="form-label">Password</label>
                                    <input type="password" class="form-control" name="password" id="passwordAdmin"  v-model="password">
                                </div>
                                <button  type="submit" class="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4"></div>
        </div>

    </main>

</template>

<script>

// @ - alias to /src 
import router from "@/router";
import http from "../http-common";
import store from '../store/store'

export default {
  name: 'LoginView',
  methods: {
        showUser(){
            const userForm = document.querySelector('#userForm');
            if (userForm.classList.contains('d-none')){
                userForm.classList.remove('d-none');
                userForm.classList.add('d-block');
            }
            const adminForm = document.querySelector('#adminForm');
            if (adminForm.classList.contains('d-block')){
                adminForm.classList.remove('d-block');
                adminForm.classList.add('d-none');
            }
            const btnUser = document.querySelector('#btn-user');
            const btnAdmin = document.querySelector('#btn-admin');
            btnUser.classList.add('btn-active');
            btnAdmin.classList.remove('btn-active');
        },
        showAdmin(){
            const userForm = document.querySelector('#userForm');
            if (userForm.classList.contains('d-block')){
                userForm.classList.remove('d-block');
                userForm.classList.add('d-none');
            }
            const adminForm = document.querySelector('#adminForm');
            if (adminForm.classList.contains('d-none')){
                adminForm.classList.remove('d-none');
                adminForm.classList.add('d-block');
            }
            const btnUser = document.querySelector('#btn-user');
            const btnAdmin = document.querySelector('#btn-admin');
            btnAdmin.classList.add('btn-active');
            btnUser.classList.remove('btn-active');
        },
        async userLogin(){
            const result = await http.post("/login/user", { // response = true or false, token, user
                email: this.email,
                password: this.password
            })
            if(result.data.response === true){
                //alert(result.data.token);
                alert(`You are logged in!`);
                store.dispatch('setToken', result.data.token);
                store.dispatch('setUser', result.data.user);
                return router.push('/tasks');
            }
            alert(`Email or password incorrect! Try again!`);
            return router.push('/login');
            
        },
        async adminLogin(){
            const result = await http.post("/login/admin", { // true or false
                email: this.email,
                password: this.password
            })
            if(result.data.response === true){
                //alert(result.data.token);
                alert(`You are logged in!`);
                store.dispatch('setToken', result.data.token);
                store.dispatch('setUser', result.data.user);
                return router.push('/tasks');
            }
            alert(`Email or password incorrect! Try again!`);
            return router.push('/login');
        }
  }
}


</script>

<style scoped>

.btn-primary {
    background-color: #b592db;
    color: white;
    border: 1px solid white;
}

.btn-primary:hover {
    border: #9b61df 1px solid;
    background-color: #9b61df;
}

.btn-active {
    background-color: #8d2ff8;
}

.card {
    background: linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2));
    border: 2px solid rgba(255, 255, 255, 0.05);
    border-radius: 2em;
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(40, 50, 70, 0.03);
    color: white;
    padding-left: 10px;
    padding-right: 10px;
} 

.card-img-top{
    width: 230px;
    height: 230px;
    margin: 0;
    align-self: center;
    background-color: transparent;
}

label img {
    margin: 5px;
}

</style>