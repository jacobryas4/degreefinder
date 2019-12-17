<template>
    <div>
        <h1>Degree Selector</h1>
        <div class="list-group">
            <transition-group name="fade">
                <li href="#" 
                    class="list-group-item d-flex justify-content-between list-group-item-action align-items-center" 
                    v-for="(degree, index) in degreesOffered"
                    @click.prevent="degreeSelected(degree.degreeName)"
                    v-bind:key="degree.degreeId">
                    <h5>{{degree.degreeName}}</h5>
                        <div>
                            <span class="badge badge-secondary badge-pill" v-if="degree.bachelors">Bachelors</span>
                            <span class="badge badge-secondary badge-pill" v-if="degree.associates">Associates</span>
                            <span class="badge badge-primary">{{degree.schoolTotal}} Schools</span>
                        </div>
                    
                </li>
            </transition-group>
        </div>
        <div v-if="showDegreeTypeSelector">
            <h2>Select Degree Type</h2>

        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'DegreeSelector',
    props: [
        'category',
        'degreesOffered'
    ],
    data() {
        return {
            showDegreeTypeSelector: false,
            degrees: null,
            chosenDegree: null
        }
    },
    methods: {
        degreeSelected(degreeName) {
            this.$emit('degreeSelected', degreeName)
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
