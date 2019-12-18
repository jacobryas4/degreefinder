<template>
    <div>
        <h1>Degree Selector</h1>
        <div class="list-group">
            <transition-group name="fade">
                <li class="list-group-item d-flex justify-content-between list-group-item-action align-items-center" 
                    v-for="(degree, index) in degreesOffered"
                    @click.prevent="degreeSelected(degree.degreeName)"
                    v-bind:key="degree.degreeId">
                    <h5>{{degree.degreeName}}</h5>
                        <div>
                            <!-- <span class="badge badge-secondary badge-pill" v-if="degree.bachelors">Bachelors</span> -->
                            <button type="button" class="btn btn-primary" v-if="degree.bachelors">
                                Bachelors <span class="badge badge-light">{{degree.bachelors.length}} Schools</span>
                            </button>
                            <button type="button" class="btn btn-secondary" v-if="degree.associates">
                                Associates <span class="badge badge-light">{{degree.associates.length}} Schools</span>
                            </button>
                        </div>
                    
                </li>
            </transition-group>
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
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
