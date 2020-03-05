<template>

    <div>
        <DegreeSelector
            v-if="!degreeSelected"
            v-bind:degreesOffered="degrees"
            v-bind:editMode="signedIn"
            v-on:degreeSelected="updateDegree($event)"
            sectionTitle="All Degrees" />

        <DegreeInfo 
            v-if="degreeSelected"
            v-bind:chosenSchoolDegInfo="selectedDegreeInfo"
            v-bind:schoolName="chosenSchool" />
    </div>
    
</template>

<script>
import db from '@/firebase/init'
import DegreeSelector from '@/components/UI/DegreeSelector'
import DegreeInfo from '@/components/containers/DegreeInfo'
import firebase from 'firebase'
import slugify from 'slugify'

export default {
    name: 'AllDegrees',
    components: {
        DegreeSelector,
        DegreeInfo
    },
    data() {
        return {
            degrees: [],
            signedIn: false,
            degreeSelected: false,
            selectedDegree: {},
            selectedDegreeInfo: {}
        }
    },
    methods: {
        async updateDegree(payload) {
            this.selectedDegree = {...payload}

            // set school name to pass down to DegreeInfo
            this.chosenSchool = payload.school

            await db.collection('degrees').doc(payload.id)
                    .collection('schoolsOffering').doc(payload.school)
                    .collection('type').doc(payload.degreeType)
                    .get().then(doc => {
                        this.selectedDegreeInfo = {...doc.data()}
                        this.degreeSelected = true
                    }).catch(err => {
                        console.log(err)
                    })
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

