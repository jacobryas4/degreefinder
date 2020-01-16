
<!-- 
    This is a loading button that will display a spinner and 'Loading..' until a success condition is reached
    It will recieve button text as a prop
-->

<template>
    <button class="btn btn-primary">
        <span v-if="loading"><span class="spinner-border spinner-border-sm"></span>
        <span>Loading...</span></span>
        <span v-if="!loading">{{btnText}}</span>
    </button>
</template>

<script>
export default {
    props: ['btnText'],
    data() {
        return {
            loading: true
        }
    },
    methods: {
        
    }
}
</script>
