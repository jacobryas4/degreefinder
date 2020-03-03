<template>

    <div>
        <DegreeSelector
            v-bind:degreesOffered="degrees"
            v-bind:editMode="signedIn"
            v-on:degreeSelected="updateDegree($event)"
            sectionTitle="All Degrees" />

      
    </div>
    
</template>

<script>
import db from '@/firebase/init'
import DegreeSelector from '@/components/UI/DegreeSelector'
import firebase from 'firebase'
import slugify from 'slugify'

export default {
    name: 'AllDegrees',
    components: {
        DegreeSelector
    },
    data() {
        return {
            degrees: [],
            signedIn: false
        }
    },
    methods: {
        updateDegree(payload) {
            console.log(payload)
        }
    },
    beforeMount() {
        if (firebase.auth().currentUser) { this.signedIn = true }

        db.collection('degrees').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let degreeObj = {
                        ...doc.data(),
                        id: doc.id
                    }
                    this.degrees.push(degreeObj)
                })
            })
    }
}
</script>

<style>

</style>

