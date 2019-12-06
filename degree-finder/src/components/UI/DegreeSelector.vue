<template>
    <div>
        <h1>Degree Selector</h1>
        <p v-for="degree in degreesOffered">{{degree.degreeName}}</p>
        <div class="card" style="width: 18rem;" v-for="degree in degreesOffered">
            <div class="card-body">
                <h5 class="card-title">{{degree.degreeName}}</h5>
                <p class="card-text">{{degree.desc}}</p>
                <button type="button" class="btn btn-primary" v-for="school in degree.offeredBy">{{school.schoolName}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'DegreeSelector',
    props: [
        'category',
        'categoryDegrees'
    ],
    data() {
        return {
            selectedCategory: this.category,
            degreesOffered: []
        }
    },
    beforeMount() {
        db.collection('degrees').where('category','==', this.selectedCategory).get()
            .then((snapshot) => {
                snapshot.forEach(doc => {
                    console.log(doc.data())
                    this.degreesOffered.push(doc.data())
                })
                
            })
    }
} 
</script>

<style>

</style>
