<template>
    
</template>

<script>
import db from '@/firebase/init'

export default {
    data() {
        return {
            degrees: []
        }
    },
    beforeMount() {
        db.collection('degrees').getDocuments() 
    }
}
</script>

<style>

</style>

