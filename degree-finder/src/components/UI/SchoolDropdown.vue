<template>
    <select class="form-control" @change="schoolSelected"> 
        <option value="" v-for="(school,index) in schools" v-bind:key="index">{{school}}</option>
    </select>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: "SchoolDropdown",
    data(){
        return {
            schools: [],
            selectedSchoo: null
        }
    },
    methods: {
        schoolSelected() {

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
