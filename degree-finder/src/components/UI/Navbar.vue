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
    <div class="custom-control custom-switch ml-3">
      <input type="checkbox" class="custom-control-input" id="customSwitch1">
      <label class="custom-control-label text-white" for="customSwitch1">Edit Mode</label>
  </div>
  </div>
</nav>
    
</template>

<script>
export default {
    name: 'Navbar',
    data () {
        return {

        }
    }
}
</script>

<style scoped>

</style>
