<template>
    <div class="container">
        <h1 class="p-3">Choose how to search</h1>
        <div class="row">
            <div class="card m-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">By Category</h5>
                    <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
                    <p class="card-text">Search for degrees and their requirements by category</p>
                    <a href="#" class="card-link">
                        <router-link :to="{ name: 'ByCategory' }">
                             Begin Search
                        </router-link>
                    </a>
                </div>
            </div>
            <div class="card m-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">By Degree</h5>
                    <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
                    <p class="card-text">Get degree requirements by a particular degree field</p>
                    <a href="#" class="card-link">
                        <router-link :to="{ name: 'ByDegree' }">
                             Begin Search
                        </router-link>
                    </a>
                </div>
            </div>
            <div class="card m-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">By School</h5>
                    <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
                    <p class="card-text">Search for degrees and their requirements by School Partner</p>
                    <a href="#" class="card-link">
                        <router-link :to="{ name: 'BySchool' }">
                             Begin Search
                        </router-link>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/UI/Spinner'
import db from '@/firebase/init'

export default {
    name: 'Index',
    components: {
        Spinner
    },
    data () {
        return {
            loading: true
        }
    }
}
</script>

<style>

</style>
