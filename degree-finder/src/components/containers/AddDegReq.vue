<template>

    <div class="col-md-10 mt-5">
        <h3>Add Degree Requirents</h3>
        <form action="#">
            <div class="form-row">
                <div class="col">
                    <label for="inputDegree">Degree</label>
                    <select id="inputDegree">
                        <option value=""></option>
                    </select>
                </div>
                <div class="col">
                    <label for="inputSchool">School</label>
                    <SchoolDropdown v-bind:model="selectedSchool"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-check form-check-inline col">
                    <input type="radio" class="form-check-input" id="associatesRadio" value="associates">
                    <label for="associatesRadio" class="form-check-label">Associates</label>
                </div>
                <div class="form-check form-check-inline col">
                    <input type="radio" class="form-check-input" id="bachelorsRadio" value="bachelors">
                    <label for="bachelorsRadio" class="form-check-label">Bachelors</label>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="admReq">Admission Requirements</label>
                    <textarea id="admReq" cols="20" rows="3" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="transferReq">Transfer Requirements</label>
                    <textarea id="transferReq" cols="20" rows="3" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <label for="coreCourses">School Core Courses (enter courses separated by comma ex: BIOL 101, MATH 120, etc.</label>
                    <textarea id="coreCourses" cols="30" rows="3" class="form-control"></textarea>
                </div>
            </div>
            <div class="form-row m-2" v-for="(row, index) in requiredCourses" v-bind:key="index">
                <div class="col">
                    <input type="text" class="form-control" placeholder="DLSI Course" v-model="requiredCourses[index].dlsi">
                </div>
                <h2>=</h2>
                <div class="col">
                    <input type="text" class="form-control" placeholder="School Course" v-model="requiredCourses[index].school">
                </div>
            </div>
            <button @click="AddReqCourseRow">Add Row</button>
        </form>
    </div>
    
</template>

<script>
import db from '@/firebase/init'
import SchoolDropdown from '@/components/UI/SchoolDropdown'

export default {
    name: "AddDegReq",
    components: {
        SchoolDropdown
    },
    data() {
        return {
            requiredCourses: [{ dlsi: null, school: null }],
            selectedSchool: null
        }
    },
    methods: {
        AddReqCourseRow() {
            this.requiredCourses.push({ dlsi: null, school: null})
        }
    },
    beforeMount() {
        
    },
}
</script>

<style>

</style>

