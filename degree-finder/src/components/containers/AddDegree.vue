<template>
    <div class="container add-degree mt-3">
        <div class="row">
            <Spinner v-if="loading" />
        <div class="col-md-10 p-1" v-if="loading === false">
            
            <h2>Add a Degree</h2>
            <form @submit.prevent="AddDegree">
                <div class="form-group">
                    <label for="degree-category">Category</label>
                    <select class="form-control" id="degree-category" v-model="selectedCategory">
                        <option :value="category" v-for="(category, index) in this.categories" v-bind:key="index">{{category}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="degree-name">Degree Name</label>
                    <!-- Should we trim the inputs before storing in the db? -->
                    <input type="text" class="form-control" id="degree-name" v-model="degreeName"> 
                </div>
                <div class="form-group">
                    <label for="degree-desc">Description</label>
                    <textarea class="form-control" id="degree-desc" rows="3" v-model="degreeDesc"></textarea>
                </div>
                <h4>Offered By:</h4>
                <div class="form-group">
                    <h5>Associates:</h5>
                    <div class="form-check form-check-inline p-1" v-for="(school, index) in schools" v-bind:key="index">
                        <label for="degree-schools1" class="form-check-label">{{school}}</label>
                        <input type="checkbox" class="form-check-input" :value="school" v-model="offeredBy.associates" style="margin-left: 5px;">
                    </div>
                </div>
                <div class="form-group">
                    <h5>Bachelors:</h5>
                    <div class="form-check form-check-inline p-1" v-for="(school, index) in schools" v-bind:key="index">
                        <label for="" class="form-check-label">{{school}} &rarr;</label>
                        <input type="checkbox" class="form-check-input" :value="school" v-model="offeredBy.bachelors">
                    </div>
                </div>
                <button class="btn btn-primary" type="submit">Add Degree 🚀</button>
            </form>
        </div>
    </div>
    </div>
    
    

</template>

<script>
import db from '@/firebase/init'
import Spinner from '@/components/UI/Spinner'

export default {
    name: "AddDegree",
    components: {
        Spinner
    },
    data() {
        return {
            loading: true,
            categories: [],
            selectedCategory: null,
            schools: [],
            offeredBy: {
                associates: [],
                bachelors: []
            },
            degreeName: null,
            degreeDesc: null
        }
    },
    methods: {
        AddDegree() {
            // add new degree to firestore
            db.collection('degrees').add({
                category: this.selectedCategory,
                desc: this.degreeDesc,
                degreeName: this.degreeName,
                offeredBy: {
                    associates: [...this.offeredBy.associates],
                    bachelors: [...this.offeredBy.bachelors]
                }
            }).then((docRef) => {
                console.log(`Document successfully created with ID ${docRef.id}`)
            }).catch((error) => {
                console.log(`Error adding document: ${error}`)
            })

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

        this.loading = false
    }

}
</script>

<style scoped>
.add-degree {
    text-align: left;
}
</style>
