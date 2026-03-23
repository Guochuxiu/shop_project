<template>
    <div>
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for="(floor, index) in floorList" :key="index" :list="floor" />
        <Brand />
    </div>

</template>

<script>
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import ListContainer from '@/pages/Home/ListContainer'
import Like from '@/pages/Home/Like'
import Rank from '@/pages/Home/Rank'
import Recommend from '@/pages/Home/Recommend'
import { mapState } from 'vuex'
export default {
    name: 'Home',
    components: {
        Brand,
        Floor,
        ListContainer,
        Like,
        Rank,
        Recommend,
    },
    mounted() {
        this.$store.dispatch('home/getFloorList');
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    }
}
</script>

<style></style>