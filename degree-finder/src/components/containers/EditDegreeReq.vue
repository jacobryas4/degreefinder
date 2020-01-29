<template>

    <div class="col-md-10 mt-5 text-left" v-if="!loading">
        <h3>Edit Degree Requirents</h3>
        <p>Please select school and degree type (Associates or Bachelors) to continue</p>
        <form action="#">
            <div class="form-row m-3">
                <div class="col">
                    <label for="inputDegree">Degree</label>
                    <select class="form-control" id="inputDegree" disabled>
                        <option :value="selectedDegree" selected>{{selectedDegree}}</option>
                    </select>
                </div>
                <div class="col">
                    <label for="inputSchool">School</label>
                    <select class="form-control" id="inputSchool" :disabled="!schoolsOffering">
                        <option v-for="(school,index) in schoolsOffering" :value="school" :key="index">{{school}}</option>
                    </select>
                </div>
            </div>
            <div class="form-row m-3">
                <div class="form-check form-check-inline col">
                    <input type="radio" 
                            class="form-check-input" 
                            id="associatesRadio" 
                            value="associates" 
                            name="degreeType" 
                            @click="degreeTypeSelected('associates')"
                            v-model="degreeType">
                    <label for="associatesRadio" class="form-check-label">Associates</label>
                </div>
                <div class="form-check form-check-inline col">
                    <input type="radio" 
                            class="form-check-input" 
                            id="bachelorsRadio" 
                            value="bachelors" 
                            name="degreeType"
                            @click="degreeTypeSelected('bachelors')"
                            v-model="degreeType">
                    <label for="bachelorsRadio" class="form-check-label">Bachelors</label>
                </div>
            </div>
            <div v-if="degreeType">
                <div class="form-row m-3">
                    <div class="form-group col-md-12">
                        <label for="admReq">Admission Requirements</label>
                        <textarea id="admReq" cols="20" rows="3" class="form-control" v-model="admReqs"></textarea>
                    </div>
                </div>
                <div class="form-row m-3">
                    <div class="form-group col-md-12">
                        <label for="transferReq">Transfer Requirements</label>
                        <textarea id="transferReq" cols="20" rows="3" class="form-control" v-model="transferReqs"></textarea>
                    </div>
                </div>
                <div class="form-row m-3">
                    <div class="form-group col-md-12">
                        <label for="coreCourses">School Core Courses (enter courses separated by comma ex: BIOL 101, MATH 120, etc.</label>
                        <textarea id="coreCourses" cols="30" rows="3" class="form-control" v-model="coreCourses"></textarea>
                    </div>
                </div>
                <EquivCourseInput v-on:modifiedCourses="updateGenEdCourses($event)" title="Gen Ed Courses" />
                <EquivCourseInput v-on:modifiedCourses="updateGenElectives($event)" title="General Electives" />
            </div>
        </form>
        <button class="btn btn-primary m-3" @click="SubmitDegreeReqs" v-if="selected">Submit</button>
    </div>
    
</template>

<script>
import db from '@/firebase/init'
import DegreeDropdown from '@/components/UI/DegreeDropdown'
import EquivCourseInput from '@/components/UI/EquivCourseInput'
import Spinner from '@/components/UI/Spinner'

export default {
    name: "EditDegReq",
    components: {
        DegreeDropdown,
        EquivCourseInput,
        Spinner
    },
    data() {
        return {
            genEdCourses: null,
            genElectives: null,
            selectedSchool: null,
            selectedDegree: null,
            degreeType: null,
            admReqs: "",
            transferReqs: "",
            coreCourses: "",
            selected: false,
            schoolsOffering: null,
            loading: true,
            degreeObj: null
        }
    },
    methods: {
        // event handlers for child components
        updateSchool(school) { this.selectedSchool = school },
        updateDegree(degree) { this.selectedDegree = degree },
        updateGenEdCourses(courses) { this.genEdCourses = [...courses] },
        updateGenElectives(courses) { this.genElectives = [...courses] },
        degreeTypeSelected(type) { 
            this.schoolsOffering = this.degreeObj.offeredBy[type]
        },
        // push to db
        async SubmitDegreeReqs() {

            let schoolCoreCoursesArr = this.coreCourses.split(',')
            let trimmedCoursesArr = []
            schoolCoreCoursesArr.forEach(course => {
                trimmedCoursesArr.push(course.trim())
            })

            // build degree req obj
            let degReqObj = {
                admReq: this.admReqs,
                genEdCourses: [...this.genEdCourses],
                genElectives: [...this.genElectives],
                transferReq: this.transferReqs,
                coreCourses: [...trimmedCoursesArr]
            } 
            // push it to firebase
            await db.collection('degrees').doc(this.selectedDegree.degreeId)
                    .collection('schoolsOffering').doc(this.selectedSchool)
                    .collection('type').doc(this.degreeType).set(degReqObj)
                        .then(() => {
                            this.$router.push({ name: 'Index' })
                        }).catch(err => {
                            console.log(err)
                        })


        }
    },
    beforeMount() {
        // get degree data from route params
        db.collection('degrees').where('slug', '==', this.$route.params.degree_slug).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.data())
                    this.selectedDegree = doc.data().degreeName
                    this.degreeObj = doc.data()
                    console.log(`Doc ID is => ${doc.id}`)
                    this.loading = !this.loading
                })
            })
    }
}
</script>

<style>

</style>

