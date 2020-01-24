<template>

    <div>
        <DegreeSelector
            v-bind:degreesOffered="degrees"
            v-bind:editMode="true"
            v-on:degreeSelected="updateDegree($event)"
            sectionTitle="All Degrees" />
    </div>
    
</template>

<script>
import db from '@/firebase/init'
import DegreeSelector from '@/components/UI/DegreeSelector'

export default {
    name: 'AllDegrees',
    components: {
        DegreeSelector
    },
    data() {
        return {
            degrees: []
        }
    },
    methods: {
        updateDegree(payload) {
            console.log(payload)
        }
    },
    beforeMount() {
        db.collection('degrees').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.degrees.push(doc.data())
                })
            })
    }
}
</script>

<style>

</style>

