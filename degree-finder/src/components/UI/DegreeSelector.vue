<template>
    <div>
        <h1>{{sectionTitle}}</h1>
        <div class="list-group">
            <transition-group name="fade">
                <li class="list-group-item d-flex justify-content-between list-group-item-action align-items-center" 
                    v-for="degree in degreesOffered"
                    v-bind:key="degree.degreeName">
                    <h5>{{degree.degreeName}}</h5>
                        <div v-if="!editMode">
                            <button type="button" class="btn btn-primary" v-if="degree.offeredBy.bachelors" @click.prevent="degreeSelected(degree)">
                                Bachelors <span class="badge badge-light">{{degree.offeredBy.bachelors.length}}</span>
                            </button>
                            <button type="button" class="btn btn-secondary" v-if="degree.offeredBy.associates" @click.prevent="degreeSelected(degree)">
                                Associates <span class="badge badge-light">{{degree.offeredBy.associates.length}}</span>
                            </button>
                        </div>
                        <div v-if="editMode">
                            <button type="button" class="btn btn-light" v-if="degree.offeredBy.bachelors" @click.prevent="degreeSelected(degree)">
                                <router-link :to="{ name: 'EditDegree', params: {degree_slug: degree.slug}}">
                                    Edit Degree
                                </router-link>
                            </button>
                            <button type="button" class="btn btn-secondary" v-if="degree.offeredBy.associates" @click.prevent="degreeSelected(degree)">
                                <router-link :to="{ name: 'EditDegreeReq', params: {degree_slug: degree.slug}}">
                                    Edit Requirements
                                </router-link>
                            </button>
                        </div>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DegreeSelector',
    props: [
        'category',
        'degreesOffered',
        'sectionTitle',
        'editMode'
    ],
    data() {
        return {
            showDegreeTypeSelector: false,
            degrees: null,
            chosenDegree: null
        }
    },
    methods: {
        degreeSelected(degree) {
            this.$emit('degreeSelected', degree)
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
