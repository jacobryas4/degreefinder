<template>
    <div class="container">
        <div class="row d-flex">
            <div class="col-md-10 pt-5 m-auto">
                <transition name="fade">
                    <CategorySelector 
                        v-on:categorySelected="updateCategory($event)" 
                        v-if="showCategorySelector"/>
                </transition>
                
                <br>

                <transition name="fade">
                    <DegreeSelector 
                        v-if="showDegreeSelector" 
                        v-bind:category="category" 
                        v-bind:degreesOffered="degreesOffered"
                        v-on:degreeSelected="updateDegree($event)" />
                </transition>
                
                <br>

                <transition name="fade">
                    <SchoolSelector 
                        v-if="showSchoolSelector"
                        v-bind:schoolsOffering="schoolsOffering"
                        v-on:schoolSelected="updateSchool($event)" />
                </transition>
                
                <br>

                <transition name="fade">
                    <DegreeInfo
                        v-if="chosenSchoolDegInfo"
                        v-bind:chosenSchoolDegInfo="chosenSchoolDegInfo"
                        v-bind:degreeName="chosenDegree[0].degreeName"
                        v-bind:schoolName="chosenSchool" />
                </transition>
                
            </div>
        </div>
    </div>
</template>

<script>
import CategorySelector from '@/components/UI/CategorySelector'
import DegreeSelector from '@/components/UI/DegreeSelector'
import SchoolSelector from '@/components/UI/SchoolSelector'
import DegreeInfo from '@/components/UI/DegreeInfo'
import db from '@/firebase/init'

export default {
    name: 'ByCategory',
    components: {
        CategorySelector,
        DegreeSelector,
        SchoolSelector,
        DegreeInfo
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
                    console.log(snapshot)
                    snapshot.forEach(doc => {
                        console.log(doc.data())
                        console.log(doc.id)
                        let degree = { 
                            degreeName: doc.data().degreeName, 
                            schoolTotal: doc.data().offeredBy.length,
                            degreeId: doc.id,
                            associates: doc.data().associates,
                            bachelors: doc.data().bachelors
                        }
                        this.degreesOffered.push(degree)
                        doc.data().offeredBy.forEach(schoolName => {
                            this.schoolsOffering.push(schoolName)
                        })
                    })
                })

            // show DegreeSelector component
            this.showDegreeSelector = true
            // clear schoolsOffering
            this.schoolsOffering = []
            // unmount other components
            this.showSchoolSelector = false
            
        },
        updateDegree(newDegree) {
            // filter through degrees to get data for the chosen one
            this.chosenDegree = this.degreesOffered.filter((item) => {
                return item.degreeName = newDegree
            })

            // show the school selector
            this.showSchoolSelector = true
        },
        updateSchool(school) {
            // set chosenSchool in state
            this.chosenSchool = school
            
            // query db to get schools info for that degree
            db.collection('degrees').doc(this.chosenDegree[0].degreeId)
                .collection('schoolsOffering').doc(this.chosenSchool).get()
                    .then((snapshot) => {
                        console.log(snapshot.data())
                        this.chosenSchoolDegInfo = snapshot.data()
                    })

            
        }
    }
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
