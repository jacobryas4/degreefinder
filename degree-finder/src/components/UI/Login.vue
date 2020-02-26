<template>
    <div class="col-md-6">
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="submit" class="btn btn-primary" @click="checkauth">check</button>
            <p class="text-danger mt-3" v-if="feedback">{{feedback}}</p>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    data() {
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login() {
            if (!this.email || !this.password) {
                this.feedback = 'You must enter all fields'
            }

            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    this.$router.push({ name: 'Index' })
                    console.log(user.user.email)
                })
                .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                })
        },
        checkauth() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    console.log(user)
                } else {
                    console.log('they arent signed in')
                }
            })
        }
    }
}
</script>

<style>

</style>

