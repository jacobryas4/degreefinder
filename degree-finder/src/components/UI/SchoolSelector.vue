<template>
    <div>
        <h1>School Selector</h1>
        <button type="button" class="btn btn-primary m-2" 
            v-for="school in schoolsOffering" 
            v-bind:key="school"
            @click="schoolSelected(school)">{{school}}</button>
        <!-- <button type="button" class="btn btn-secondary">
            <router-link :to="{ name: 'EditDegreeReq', params: {degree_slug: degree.slug} }">
                Edit Requirements
            </router-link>
        </button> -->
    </div>
</template>

<script>
export default {
    name: 'SchoolSelector',
    props: [
        'schoolsOffering'
    ],
    data() {
        return {
            
        }
    },
    methods: {
        schoolSelected(school) {
            this.$emit('schoolSelected', school)
        }
    }
}
</script>

<style scoped>

</style>
