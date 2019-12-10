<template>
    <div class="container">
        <div class="row d-flex">
            <div class="col-md-10 pt-5 m-auto">
                <CategorySelector 
                    v-on:categorySelected="updateCategory($event)" 
                    v-if="showCategorySelector"/>
                <br>
                <DegreeSelector 
                    v-if="showDegreeSelector" 
                    v-bind:category="category" 
                    v-bind:degreesOffered="degreesOffered"
                    v-on:degreeSelected="updateDegree($event)" />
                <br>
                <SchoolSelector 
                    v-if="showSchoolSelector"
                    v-bind:schoolsOffering="schoolsOffering"
                    v-on:schoolSelected="updateSchool($event)" />
            </div>
        </div>
    </div>
</template>

<script>
import CategorySelector from '@/components/UI/CategorySelector'
import DegreeSelector from '@/components/UI/DegreeSelector'
import SchoolSelector from '@/components/UI/SchoolSelector'
import db from '@/firebase/init'

export default {
    name: 'ByCategory',
    components: {
        CategorySelector,
        DegreeSelector,
        SchoolSelector
    },
    data () {
        return {
            category: null,
            degreesOffered: [],
            categoryDegrees: null,
            schools: ['Liberty University', 'Colorado State University', 'Indiana Wesleyan University', 'Trident University', 'Indiana Tech'],
            chosenDegree: null,
            showDegreeSelector: false,
            showCategorySelector: true,
            showSchoolSelector: false,
            schoolsOffering: [],
            chosenSchool: null,
            schoolsDegInfo: [],
            chosenSchoolDegInfo: null
        }
    },
    methods: {
        updateCategory(newCategory) {

            // set the category in state
            this.category = newCategory

            // clear degreesOffered to remove degrees listed from previous queries
            this.degreesOffered = []

            // this updates the category, queries the database and returns degrees to pass to DegreeSelector
            db.collection('degrees').where('category','==', this.category).get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    console.log(doc.data())
                    let degree = { degreeName: doc.data().degreeName, schoolTotal: doc.data().offeredBy.length}
                    this.degreesOffered.push(degree)
                    doc.data().offeredBy.forEach(schoolObj => {
                        this.schoolsOffering.push(schoolObj.schoolName)
                        this.schoolsDegInfo.push(schoolObj)
                    })
                })
            })

            // show DegreeSelector component
            this.showDegreeSelector = true
        },
        updateDegree(newDegree) {
            this.chosenDegree = newDegree
            this.showSchoolSelector = true
        },
        updateSchool(school) {
            // set chosenSchool in state
            this.chosenSchool = school
            
            // filter schoolsDegInfo for only the selected school's info
            this.chosenSchoolDegInfo = this.schoolsDegInfo.filter((item) => item.schoolName === this.chosenSchool )
        }
    }
}
</script>

<style>

</style>
