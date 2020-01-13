<template>

    <div class="col-md-10 mt-5 text-left">
        <h3>Add Degree Requirents</h3>
        <form action="#">
            <div class="form-row">
                <div class="col">
                    <label for="inputDegree">Degree</label>
                    <DegreeDropdown v-on:degreeSelected="updateDegree($event)" />
                </div>
                <div class="col">
                    <label for="inputSchool">School</label>
                    <SchoolDropdown v-on:schoolSelected="updateSchool($event)"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-check form-check-inline col">
                    <input type="radio" 
                            class="form-check-input" 
                            id="associatesRadio" 
                            value="associates" 
                            name="degreeType" 
                            v-model="degreeType">
                    <label for="associatesRadio" class="form-check-label">Associates</label>
                </div>
                <div class="form-check form-check-inline col">
                    <input type="radio" 
                            class="form-check-input" 
                            id="bachelorsRadio" 
                            value="bachelors" 
                            name="degreeType"
                            v-model="degreeType">
                    <label for="bachelorsRadio" class="form-check-label">Bachelors</label>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="admReq">Admission Requirements</label>
                    <textarea id="admReq" cols="20" rows="3" class="form-control" v-model="admReqs"></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="transferReq">Transfer Requirements</label>
                    <textarea id="transferReq" cols="20" rows="3" class="form-control" v-model="transferReqs"></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="coreCourses">School Core Courses (enter courses separated by comma ex: BIOL 101, MATH 120, etc.</label>
                    <textarea id="coreCourses" cols="30" rows="3" class="form-control" v-model="coreCourses"></textarea>
                </div>
            </div>
            <EquivCourseInput v-on:modifiedCourses="updateGenEdCourses($event)" title="Gen Ed Courses"/>
            <EquivCourseInput v-on:modifiedCourses="updateGenElectives($event)" title="General Electives" />
        </form>
        <button class="btn btn-primary m-3" @click="SubmitDegreeReqs">Submit</button>
    </div>
    
</template>

<script>
import db from '@/firebase/init'
import SchoolDropdown from '@/components/UI/SchoolDropdown'
import DegreeDropdown from '@/components/UI/DegreeDropdown'
import EquivCourseInput from '@/components/UI/EquivCourseInput'

export default {
    name: "AddDegReq",
    components: {
        SchoolDropdown,
        DegreeDropdown,
        EquivCourseInput
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
            coreCourses: ""
        }
    },
    methods: {
        // event handlers for child components
        updateSchool(school) { this.selectedSchool = school },
        updateDegree(degree) { this.selectedDegree = degree },
        updateGenEdCourses(courses) { this.genEdCourses = [...courses] },
        updateGenElectives(courses) { this.genElectives = [...courses] },
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
                transferReq: this.transferReqs
            }
            console.log(degReqObj)
            
            // push it to firebase
            await db.collection('degrees').where("degreeName", "==", this.selectedDegree).get()
                    .then(schools => {
                        let newId = null
                        schools.forEach(doc => {
                            console.log(doc.id)
                            newId = doc.id
                        })
                        db.collection('degrees').doc(newId)
                            // THIS LINE MUST BE FIXED THE doc() entry is incorrect
                          .collection('schoolsOffering').doc(this.selectedSchool).doc(this.degreeType).set(degReqObj)   
                            .then(() => { console.log('success')})
                            .catch((err) => { console.log(err) })

                    })


        }
    }
}
</script>

<style>

</style>

