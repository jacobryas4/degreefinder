
<!--
    This component will need to be controlled by the parent (App)
    it will be used to show success when writing to the db
    custom events will have to be built so the children components can send status updates to the parent
-->

<template>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        Successfully added to database <router-link :to="{ name: 'Index' }">Return Home</router-link>
        <button class="close" type="button" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>  
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>
