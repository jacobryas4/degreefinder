<template>
    <div>
        <h1>Degree Selector</h1>
        <div class="list-group">
            <a href="#" 
               class="list-group-item list-group-item-action" 
               v-for="degree in degreesOffered"
               @click.prevent="degreeSelected(degree.degreeName)">
                <h5>{{degree.degreeName}}</h5> <span class="badge badge-primary m-1">{{degree.schoolTotal}} Schools</span>
            </a>
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
