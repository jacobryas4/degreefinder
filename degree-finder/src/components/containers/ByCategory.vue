<template>
    <div class="container">
        <div class="row d-flex">
            <div class="col-md-10 pt-5 m-auto">
                <transition name="fade">
                    <CategorySelector 
                        v-on:categorySelected="updateCategory($event)" 
                        v-if="showCategorySelector && !chosenSchoolDegInfo"/>
                </transition>
                
                <br>

                <transition name="fade">
                    <DegreeSelector 
                        v-if="showDegreeSelector && !chosenSchoolDegInfo" 
                        v-bind:category="category" 
                        v-bind:degreesOffered="degreesOffered"
                        v-bind:editMode="false"
                        v-on:degreeSelected="updateDegree($event)"
                        sectionTitle="Degree Selector" />
                </transition>
                
                <br>

                <transition name="fade">
                    <DegreeInfo
                        v-if="chosenSchoolDegInfo"
                        v-bind:chosenSchoolDegInfo="chosenSchoolDegInfo"
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
import DegreeInfo from '@/components/containers/DegreeInfo'
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
            schoolsOffering: {
                associates: [],
                bachelors: []
            },
            chosenSchool: null,
            schoolsDegInfo: [],
            chosenSchoolDegInfo: null,
            chosenDegType: null
        }
    },
    methods: {
        async updateCategory(newCategory) {

            // set the category in state
            this.category = newCategory

            // clear degreesOffered to remove degrees listed from previous queries
            this.degreesOffered = []

            // this updates the category, queries the database and returns degrees to pass to DegreeSelector
            await db.collection('degrees').where('category','==', this.category).get()
                .then((snapshot) => {
                    console.log(snapshot)
                    snapshot.forEach(doc => {
                        // console.log(doc.data())
                        // console.log(doc.id)
                        let degree = {  
                            id: doc.id,
                            ...doc.data()
                        }
                        this.degreesOffered.push(degree)
                        
                    })
                })

            // show DegreeSelector component
            this.showDegreeSelector = true
            // clear schoolsOffering
            this.schoolsOffering = {
                associates: [],
                bachelors: []
            }
            // unmount other components
            this.showSchoolSelector = false
            
        },
        async updateDegree(payload) {
            this.chosenSchool = payload.school
            
            // query db for updated degree information
            await db.collection('degrees').doc(payload.id)
                    .collection('schoolsOffering').doc(payload.school)
                    .collection('type').doc(payload.degreeType)
                    .get().then(doc => {
                        this.chosenSchoolDegInfo = {...doc.data()}
                        this.degreeSelected = true
                    }).catch(err => {
                        console.log(err)
                    })
        },
        async updateSchool(school) {
            // set chosenSchool in state
            this.chosenSchool = school
             
            // query db to get schools info for that degree
            // update this to match new degree schema
            await db.collection('degrees').doc(this.chosenDegree[0].degreeId)
                    .collection('schoolsOffering').doc(this.chosenSchool)
                    .collection('type').doc(this.chosenDegType).get()
                        .then((snapshot) => {
                            // console.log(snapshot.data())
                            this.chosenSchoolDegInfo = snapshot.data()
                            if (snapshot.exists) {
                                console.log(snapshot.data())
                            } else {
                                console.log('no')
                            }
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
