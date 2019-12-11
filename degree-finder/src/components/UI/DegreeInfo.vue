<template>
    <div class="col-md-12">
        <h1 class="display-4">{{this.degreeName}}</h1>
        <h5>{{this.chosenSchoolDegInfo.admReq}}</h5>

        <br>

        <h6>Courses</h6>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">DLSI GenEd Required Courses</th>
                    <th scope="col">{{this.schoolName}} Equivalent Required Courses</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(course,index) in chosenSchoolDegInfo.dlsiCourses.genEd" v-bind:key="index">
                    <td>{{course}}</td>
                    <td>{{chosenSchoolDegInfo.schoolEquivCourses[index]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DegreeInfo',
    props: [
        'chosenSchoolDegInfo',
        'degreeName',
        'schoolName'
    ],
    data() {
        return {

        }
    }
}
</script>

<style>

</style>
