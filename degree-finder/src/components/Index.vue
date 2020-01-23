<template>
    <div class="container">
        <h1 class="p-3">Search</h1>
        <div class="row">
            <div class="card m-3" style="width: 100%;">
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
        </div>
        <AllDegrees />
    </div>
</template>

<script>
import Spinner from '@/components/UI/Spinner'
import AddDegree from '@/components/containers/AddDegree'
import AllDegrees from '@/components/UI/AllDegrees'
import db from '@/firebase/init'

export default {
    name: 'Index',
    components: {
        Spinner,
        AddDegree,
        AllDegrees
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
