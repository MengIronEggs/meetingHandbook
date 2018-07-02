<style scoped>
    .page{
        display: flex;
        flex-grow: 1;
        padding: 0 10px;
    }

    .device{
        display: flex;
        flex-direction: column;
        justify-content: start;
        border: 1px solid #333;
        width: 375px;
        height: 820px;
        margin: 0 auto;
    }

    .carousel{
        border: 1px solid #ccc;
    }

    .carousel-image{
        width: 100%;
    }

    .entrance-list{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-bottom: 20px;
    }

    .entrance-item{
        width: 30%;
        border: 1px dotted #ccc;
        margin: 15px 1.65% 0 1.65%;
    }

    .entrance-item.active{
        border-color: red;
    }

    .cover-image{
        display: block;
        width: 100%;
        padding-bottom: 100%;
        position: relative;
    }

    .entry-icon{
        position: absolute;
        top: 15%;
        left: 15%;
        height: 70%;
        width: 70%;
        border-radius: 50%;
    }

    .entry-label{
        margin-bottom: 5px;
        color: #333;
        font-size: 14px;
        text-align: center;
    }
</style>

<template>
    <div class="page">
        <div class="device">
            <div class="block" @click="chooseCarousel">
                <el-carousel trigger="click" height="207px" class="carousel">
                    <el-carousel-item v-for="item in carouselArray" :key="item.order">
                        <!--<router-link :to="item.linkUrl">-->
                            <img class="carousel-image" :src="item.imageUrl">
                        <!--</router-link>-->
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="entrance-list">
                <div class="entrance-item" :class="{'active': index ===  entryIndex && objectType === 'entry'}" v-for="(item, index) in entryArray" :key="index" @click="chooseEntry(index)">
                    <div class="cover-image">
                        <img class="entry-icon" v-if="item && item.icon" :src="item.icon">
                    </div>
                    <p class="entry-label"  v-if="item">{{item.label || index}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        created() {

        },

        mounted() {

        },

        methods: {
            chooseEntry(index) {
                this.$store.commit('chooseEntry', {
                    entryIndex: index,
                });
            },

            chooseCarousel() {
                this.$store.commit('chooseCarousel', {});
            }
        },

        components: {},

        computed: {
            carouselArray() {
                return this.$store.state.attribute.carouselArray;
            },

            entryArray() {
                return this.$store.state.attribute.entryArray;
            },

            entryIndex(){
                return this.$store.state.attribute.entryIndex;
            },

            objectType(){
                return this.$store.state.attribute.objectType;
            }
        }
    };
</script>
