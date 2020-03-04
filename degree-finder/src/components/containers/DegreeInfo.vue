<template>
  <div class="col-md-12">

    <h1 class="display-4">Degree Information</h1>

    <br>

    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
              aria-expanded="true" aria-controls="collapseOne">
              Program Courses
            </button>
          </h2>
        </div>

        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">DLSI GenEd Required Courses</th>
                  <th scope="col">{{this.schoolName}} Equivalent Required Courses</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(course,index) in chosenSchoolDegInfo.genEdCourses" v-bind:key="index">
                  <td>{{course.dlsi}}</td>
                  <td>{{course.school}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo"
              aria-expanded="false" aria-controls="collapseTwo">
              General Electives
            </button>
          </h2>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">DLSI Elective Courses</th>
                  <th scope="col">{{this.schoolName}} Equivalent Courses</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(course,index) in chosenSchoolDegInfo.genElectives" v-bind:key="index">
                  <td>{{course.dlsi}}</td>
                  <td>{{course.school}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree"
              aria-expanded="false" aria-controls="collapseThree">
              Admission Requirements
            </button>
          </h2>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div class="card-body">
            <p>{{chosenSchoolDegInfo.admReq}}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingFour">
          <h2 class="mb-0">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour"
              aria-expanded="false" aria-controls="collapseFour">
              Transfer Requirements
            </button>
          </h2>
        </div>
        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
          <div class="card-body">
            <p>{{chosenSchoolDegInfo.transferReq}}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import db from '@/firebase/init'
  import unslug from 'unslug'

  export default {
    name: "DegreeInfo",
    props: ["degreeName", "schoolName"],
    data() {
      return {
        chosenSchoolDegInfo: {}
      }
    },
    beforeMount() {
        let school = unslug(this.$route.params.school_slug)
        let degreeId = this.$route.params.degree_id
        let type = this.$route.params.degree_type

        console.log(school, degreeId, type)
        
        db.collection('degrees').doc(degreeId)
          .collection('schoolsOffering').doc(school)
          .collection('type').doc(type).get().then( doc => {
            this.chosenSchoolDegInfo = {...doc.data()}
          })
    }
  };

</script>

<style>
</style>
