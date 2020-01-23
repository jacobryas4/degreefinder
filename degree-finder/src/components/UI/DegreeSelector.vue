<template>
    <div>
        <h1>{{sectionTitle}}</h1>
        <div class="list-group">
            <transition-group name="fade">
                <li class="list-group-item d-flex justify-content-between list-group-item-action align-items-center" 
                    v-for="degree in degreesOffered"
                    v-bind:key="degree.degreeName">
                    <h5>{{degree.degreeName}}</h5>
                        <div>
                            <button type="button" class="btn btn-primary" v-if="degree.offeredBy.bachelors" @click.prevent="degreeSelected(degree.offeredBy.bachelors, degree.degreeName)">
                                Bachelors <span class="badge badge-light">{{degree.offeredBy.bachelors.length}}</span>
                            </button>
                            <button type="button" class="btn btn-secondary" v-if="degree.offeredBy.associates" @click.prevent="degreeSelected(degree.offeredBy.associates, degree.degreeName)">
                                Associates <span class="badge badge-light">{{degree.offeredBy.associates.length}}</span>
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
        'sectionTitle'
    ],
    data() {
        return {
            showDegreeTypeSelector: false,
            degrees: null,
            chosenDegree: null
        }
    },
    methods: {
        degreeSelected(schools, degree) {
            this.$emit('degreeSelected', {schls: schools, deg: degree})
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
