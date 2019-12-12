<template>
    <div>
        <h1>Degree Selector</h1>
        <div class="list-group">
            <li href="#" 
               class="list-group-item d-flex justify-content-between list-group-item-action align-items-center" 
               v-for="(degree, index) in degreesOffered"
               @click.prevent="degreeSelected(degree.degreeName)"
               v-bind:key="index">
                <h5>{{degree.degreeName}}</h5><span class="badge badge-primary badge-pill">{{degree.schoolTotal}} Schools</span>
            </li>
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

</style>
