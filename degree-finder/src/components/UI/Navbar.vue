<template>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
            <router-link :to="{ name: 'Index' }">
                DLSI | Degree Finder
            </router-link>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link class="nav-item nav-link" :to="{ name: 'AddDegree' }">Add Degree</router-link>
                <router-link class="nav-item nav-link" :to="{ name: 'AddDegReq' }">Add Degree Requirements</router-link>
            </div>
        </div>
        <div v-if="user">
            <a href="" @click.prevent="logout">Logout</a>
        </div>
        <div v-if="!user">
            <router-link class="nav-item nav-link" :to="{ name: 'Login' }">Login</router-link>
        </div>
    </nav>
    
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Navbar',
    data () {
        return {
            user: null,

        }
    },
    methods: {
        logout() {
            firebase.auth().signOut()
                .then(() => {
                    this.$router.push({ name: 'Login' })
                })
        }
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.user = user
            } else {
                this.user = null
            }
        })
    }
}
</script>

<style scoped>

</style>
