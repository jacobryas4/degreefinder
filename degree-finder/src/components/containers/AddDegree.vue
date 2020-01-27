<template>
    <div class="container add-degree mt-3">
        <div class="row">
            <Spinner v-if="loading" />
        <div class="col-md-10 p-1" v-if="loading === false">
            <SuccessAlert v-if="success"/>
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
                        <label for="" class="form-check-label">{{school}}</label>
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
import LoadingBtn from '@/components/UI/LoadingBtn'
import SuccessAlert from '@/components/UI/SuccessAlert'
import slugify from 'slugify'

export default {
    name: "AddDegree",
    components: {
        Spinner,
        LoadingBtn,
        SuccessAlert
    },
    data() {
        return {
            loading: false,
            success: false,
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
            // set loading btn spinner
            this.loading = true
            
            // create a set to remove duplicates in combined array of all schools offering the degree in some form
            var allSchoolsArr = [...this.offeredBy.associates, ...this.offeredBy.bachelors]
            var allSchoolsSet = new Set(allSchoolsArr)

            // convert this back to an array with all unique values to push to firestore
            var allSchools = [...allSchoolsSet]

            // create batch to run multiple writes simultaneously
            var batch = db.batch()

            // ref variables
            const schoolsOfferingRef = db.collection('degrees').doc(this.degreeName).collection('schoolsOffering')
            const degreeRef = db.collection('degrees').doc(this.degreeName)

            // add new degree to firestore
            let degree = {
                category: this.selectedCategory,
                desc: this.degreeDesc,
                degreeName: this.degreeName,
                slug: slugify(this.degreeName, {
                    replacement: '-',
                    remove: null,
                    lower: true
                }),
                offeredBy: {
                    associates: [...this.offeredBy.associates],
                    bachelors: [...this.offeredBy.bachelors]
                }
            }

            // add degree itself to batch
            batch.set(degreeRef, degree)

            // loop through schools array and add to batch
            // adding empty object just to init docs for each school
            allSchools.forEach((school, index) => {
                batch.set(schoolsOfferingRef.doc(school), {})
            })

            // commit the batch
            batch.commit().then((data) => {
                this.loading = false
                this.success = true
            }).catch((err) => {
                console.log(err)
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
