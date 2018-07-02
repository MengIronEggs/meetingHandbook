export default {
    state: {
        objectType: '',     //entry  carousel

        entryArray: [],         //入口列表
        entryIndex: 0,          //入口序号

        carouselArray: [],      //轮播图列表

        articleList: [],        //文章列表
    },
    mutations: {
        initArticleList(state, {articleList}){
            state.articleList = articleList;
        },

        initCarouselArray(state, {carouselArray}){
            state.carouselArray = carouselArray;
        },

        initEntry(state, {entryArray}){
            state.entryArray = entryArray;
        },

        chooseCarousel(state, {}) {
            state.objectType = 'carousel';
        },

        chooseEntry(state, {entryIndex}) {
            state.objectType = 'entry';
            state.entryIndex = entryIndex;
        }
    },
    actions: {},
    getters: {}
}
