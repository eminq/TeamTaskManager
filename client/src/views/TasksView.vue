<template>

  <section class="gradient-custom-2">
    <div class="container py-5 ">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-12 col-xl-10">
      
              <div class="card mask-custom">
                <div class="card-body p-4 text-white">
      
                  <div class="text-center pt-3 pb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check" width="60">
                    <h2 class="my-4">Task List</h2>
                  </div>
                  <!-- ADD TASK FORM - ONLY IF USER IS AMDIN -->
                  <template  v-if="store.state.user.isAdmin">
                  <div class="d-block mb-3" id="addBtn">
                    <button type="button" class="btn btn-outline-light" @click="addForm()">
                      <i class="fas fa-plus fa-lg text-light"></i>  Add new task
                    </button>
                  </div>
                  <div class="mb-3 d-none bg-form p-3 rounded" id="addForm">
                    
                    <!-- add task form -->
                    <form id="newTaskForm" class="d-block justify-content-center align-items-center mb-4 mt-2">
                      <div class="form-outline w-100">
                        <label for="text">Task</label>
                        <input type="text" v-model="text" id="text" required class="form-control bg-transparent border-2 text-white" placeholder="New task.." maxlength="100" />
                      </div>
                      <div class="d-flex mt-2 me-2">
                        <div class="d-block me-2">
                          <label for="priority">Priority</label>
                          <select class="form-select w-100 border-info me-4" v-model="priority" id="priority" required>
                            <option value="" disabled selected>Select priority</option>  
                            <option value="high">High Priority</option>
                              <option value="medium">Medium Priority</option>
                              <option value="low">Low Priority</option>
                          </select>
                        </div>
                        <div class="d-block me-2">
                          <label for="user">User</label>
                          <select class="form-select w-100 border-info me-4" v-model="userId" id="user" required>
                            <option value="" disabled selected>Select user</option>    
                            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-info px-5 h-75 mt-4" @click.prevent="addTask">Add</button>
                      </div>
                    </form>
                    <button type="button" class="btn-cancel mb-2" id="cancelBtn" @click="cancel()">Cancel</button>
                  </div>
                  </template>
                  <!-- ALL TASKS -->
                  <table class="table text-white mb-0">

                    <thead v-if="tasks.length > 0">
                      <tr>
                        <th scope="col">Team Member</th>
                        <th scope="col">Task</th>
                        <th scope="col">Status</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                        <tr v-for="task in tasks" v-bind:key="task.id" :id="task.id" class="fw-normal" >
                          <th style="width: 15vw;">
                            <template v-for="user in users" v-bind:key="user.id">
                                <template v-if="user.id === task.userId">
                                    <img v-bind:src="user.image" alt="avatar" style="width: 45px; height: auto;"> 
                                    <span class="ms-2" style="font-size: small;">{{user.firstName}} {{user.lastName}}</span>
                                </template>
                            </template>
                          </th>
                          <td class="align-middle" style="width: 30vw;">
                            <span>{{task.text}}</span>
                          </td>
                          <td class="align-middle" style="width: 8vw;">
                              <h6 class="mb-0"><span class="badge" :class="{ 'bg-info' : task.status==='in progress', 'bg-secondary' : task.status==='done', 'bg-dark' : task.status==='assigned'}" >{{task.status}}</span></h6>
                          </td>
                          <td class="align-middle" style="width: 8vw;">
                            <h6 class="mb-0"><span class="badge" :class="{ 'bg-danger' : task.priority==='high', 'bg-success' : task.priority==='low', 'bg-warning' : task.priority==='medium'}">{{task.priority}}</span></h6>
                          </td>
                          <td class="align-middle" style="width: 8vw;">
                            <router-link :to="{name: 'edit', params: {id: task.id}}" v-if="store.state.user.id === task.userId || store.state.user.isAdmin" title="Edit">
                                <i class="fas fa-pen fa-lg text-light me-3"></i></router-link>
                            <!-- only if user is admin -->
                            <a v-if="store.state.user.isAdmin" @click.prevent="deleteTask(task)" href="#" title="Remove">
                                <i class="fas fa-trash-alt fa-lg text-warning"></i></a> 
                          </td>
                        </tr>
                    </tbody>
                  </table>

                  

                </div>
              </div>
            </div>
          </div>
        </div>
    </section>

</template>

<script>
import http from "../http-common";
import store from "@/store/store";

export default {
    name: 'TasksView',
    data(){
        return {
            tasks: [],
            users: [],
            store: store
        }
    },
    async created(){
      try{
        const getTasks = await http.get('/tasks');
        const tasks = getTasks.data;
        this.tasks = tasks;
      }catch(err){
        console.dir(err);
      }

      try{
        const getUsers = await http.get('/users');
        const users = getUsers.data;
        this.users = users;
      }catch(err){
        console.dir(err);
      }
      
    },
    methods: {
      addForm(){
        const addForm = document.querySelector('#addForm');
        const addBtn = document.querySelector('#addBtn');
        addForm.classList.remove('d-none');
        addForm.classList.add('d-block');
        addBtn.classList.remove('d-block');
        addBtn.classList.add('d-none');
      },
      cancel(){
        const addForm = document.querySelector('#addForm');
        const addBtn = document.querySelector('#addBtn');
        addForm.classList.remove('d-block');
        addForm.classList.add('d-none');
        addBtn.classList.remove('d-none');
        addBtn.classList.add('d-block');
      },
      clearForm(){
        this.text = '',
        this.priority = '',
        this.userId = ''
      },
      async addTask(){
        if(!this.text || !this.priority || !this.userId){
          return alert('Missing input!');
        }
        const result = await http.post('/tasks', {
          text: this.text || '',
          priority: this.priority || 'high',
          status: 'assigned',
          userId: this.userId || 31
        })
        this.tasks.push(result.data);
        this.clearForm();
        this.cancel();
      },
      async deleteTask(task){
        const taskId = task.id;
        const result = await http.delete(`/tasks/${taskId}`)
        console.log(result.data);
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        alert('Task deleted!');
      }
    }
}

</script>

<style>

.gradient-custom-2 {
  /* fallback for old browsers */
  background: #7e40f6;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(126, 64, 246, 1),
    rgba(80, 139, 252, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(126, 64, 246, 1),
    rgba(80, 139, 252, 1)
  );
}
  
.mask-custom {
background: rgba(24, 24, 16, 0.2);
border-radius: 2em;
backdrop-filter: blur(25px);
border: 2px solid rgba(255, 255, 255, 0.05);
background-clip: padding-box;
box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
}

.btn-outline-light{
  transition: 0.3s ease-in-out;
}
.btn-outline-light:hover{
  background-color: rgba(0,0,0,0.1);
  color: white;
}

.bg-form{
  background-color: rgba(56, 24, 128, 0.3);
  border: 1px solid white;
}

.btn-cancel{
  border: none;
  background-color: transparent;
  font-weight: bold;
  color: rgb(227, 70, 70);
}

</style>