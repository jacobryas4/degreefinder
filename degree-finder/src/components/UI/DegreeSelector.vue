<template>
    <div>
        <h1>Degree Selector</h1>
        {{this.category}}
        <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action" v-for="degree in degreesOffered">
                {{degree.degreeName}} <span class="badge badge-primary m-1">{{degree.offeredBy.length}}</span>
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
    beforeUpdate() {
        
    }
} 
</script>

<style>

</style>
