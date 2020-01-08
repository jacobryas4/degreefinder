<template>
    <select class="form-control" v-model="selectedDegree" @change="degreeSelected(selectedDegree)">  
        <option :value="degree.degreeName" v-for="(degree,index) in degrees" v-bind:key="index">{{degree.degreeName}}</option>
    </select>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: "DegreeDropdown",
    data(){
        return {
            degrees: [],
            selectedDegree: null
        }
    },
    methods: {
        degreeSelected() {
            this.$emit("degreeSelected", this.selectedDegree)
        }
    },
    beforeMount() {
        // get degree list from db to populate dropdown
        db.collection('degrees').get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    let degree = {
                        degreeName: doc.data().degreeName,
                        degreeId: doc.id
                    }
                    this.degrees.push(degree)
                })
            })
    },
}
</script>

<style>

</style>
