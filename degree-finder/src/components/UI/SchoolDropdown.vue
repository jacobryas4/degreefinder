<template>
    <select class="form-control" v-model="selectedSchool" @change="schoolSelected(selectedSchool)"> 
        <option :value="school" v-for="(school,index) in schools" v-bind:key="index">{{school}}</option>
    </select>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: "SchoolDropdown",
    data(){
        return {
            schools: [],
            selectedSchool: ""
        }
    },
    methods: {
        schoolSelected() {
            this.$emit("schoolSelected", this.selectedSchool)
        }
    },
    beforeMount() {
        // get school list from db to populate dropdown
        db.collection('schools').doc("hSc3O5nMwxDng6qrXmxG").get()
            .then((snapshot) => {
                console.log(snapshot.data())
                snapshot.data().schools.forEach(school => this.schools.push(school))
            })
    },
}
</script>

<style>

</style>
