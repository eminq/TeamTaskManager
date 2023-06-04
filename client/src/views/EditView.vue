<template>
<main class="row container-fluid mt-5">
    <div class="col-2"></div>
    <div class="col-8 card p-5">
        <form @submit.prevent="editTask(task)" id="newTaskForm" class="d-block justify-content-center align-items-center mb-4">
            <div class="form-outline w-100">
            <input v-if="store.state.user.isAdmin" type="text" v-model="text" required class="form-control bg-transparent border-2 text-white" maxlength="100" />
            <input v-else type="text" v-model="text" disabled class="form-control bg-transparent border-2 text-white" maxlength="100" />
            </div>
            <div class="d-flex mt-2 me-2">
            <select v-if="store.state.user.isAdmin" class="form-select w-25 border-info me-2" v-model="priority" required>
                <option value="" disabled selected>Select priority</option>  
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
            </select>
            <select v-if="!store.state.user.isAdmin || (store.state.user.isAdmin && task.userId === store.state.user.id)"
                    v-model="status" required class="form-select w-25 border-info me-2">
                <option value="assigned">Assigned</option>
                <option value="in progress">In progress</option>
                <option value="done">Done</option>
            </select>
            <button type="submit" class="btn btn-info ms-2">Edit</button>
            </div>
        </form>
        <router-link to="/tasks" class="text-danger ">Cancel</router-link>
    </div>
    <div class="col-2"></div>
</main>
</template>
  
  <script>

 import router from '@/router';
 import http from '../http-common';
 import store from '@/store/store';
  
  export default {
    name: 'EditView',
    data() {
        return {
            task: {},
            text: '',
            priority: '',
            status: '',
            store: store
        }
    },
    async created() {
        const result = await http.get(`/tasks/${this.$route.params.id}`);
        this.task = result.data;
        this.text = this.task.text;
        this.priority = this.task.priority;
        this.status = this.task.status;
    },
    methods: {
        async editTask(task){
            const result = await http.patch(`/tasks/${task.id}`, {
                text: this.text,
                priority: this.priority,
                status: this.status
            })
            if(result){
                alert('Task changed!');
                router.push('/tasks');
            }else{
                alert('Ups! Something went wrong!');
            }
        }
    }
  }
  </script>
  
  <style scoped>
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

  </style>
  