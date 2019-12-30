<template>
    
    <div>
        <h2>Add a Degree</h2>
        <form action="#">
            <div class="form-group">
                <label for="degree-category">Category</label>
                <select class="form-control" id="degree-category">
                    <option value="" v-for="(category, index) in this.categories" v-bind:key="index">{{category}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="degree-name">Degree Name</label>
                <!-- Should we trim the inputs before storing in the db? -->
                <input type="text" class="form-control" id="degree-name"> 
            </div>
            <div class="form-group">
                <label for="degree-desc">Description</label>
                <textarea class="form-control" id="degree-desc" rows="3"></textarea>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input">
                </div>
            </div>
        </form>
    </div>
    

</template>

<script>
import db from '@/firebase/init'

// This is a temporary component, used in dev to conveniently add degrees to firestore

export default {
    name: "AddDegree",
    data() {
        return {
            categories: [],
            schools: []
        }
    },
    methods: {
        postSchoolDegreeHandler() {

            const ref = db.collection('degrees').doc('CAzqLnJe7o3O5TAPCgFH').collection('schoolsOffering').doc("Indiana Tech")

            ref.set(this.schoolDegreeObj)
                .then((docRef) => {
                    console.log(`Document written with ID: ${docRef.id}`)
                })
                .catch(err => {
                    console.log(error)
                })
            
        },
        postDegreeHandler() {

            db.collection('degrees').add(this.degreeObj)

        }
    },
    beforeMount() {

        // get categories from Firestore
        db.collection('categories').doc('wZBcZDeRvazfPgYEMgGE').get()
            .then((snapshot) => {
                this.categories = [...snapshot.data().categories]
            })

        // get schools from Firestore
        db.collection('schools').doc('hSc3O5nMwxDng6qrXmxG').get()
            .then((snapshot) => {
                this.schools = [...snapshot.data().schools]
            })
    }

}
</script>

<style scoped>

</style>
