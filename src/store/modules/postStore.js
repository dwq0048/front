import axios from 'axios'
import { SET_TIME, SET_BOARD } from '../helper'

const Post = {
    namespaced: true,
    state: {
        NAVIGATION: false
    },
    getters: {
        GET_NAVIGATION: state => state.NAVIGATION
    },
    mutations: {
        SET_NAVIGATION(state, payload){
            state.NAVIGATION = payload
        }
    },
    actions: {
        // Write
        POST({commit}, payload){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `/api/1/board/write/post`,
                    data: payload,
                    headers: {'Content-Type': 'multipart/form-data'},
                    withCredentials: true,
                }).then((req) => {
                    resolve(req);
                }).catch((err) => {
                    reject(err);
                })
            })
        },
        POST_LIKE({commit}, payload){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `/api/1/board/write/post/like`,
                    data: payload,
                    withCredentials: true
                }).then((req) => {
                    resolve(req);
                }).catch((err) => {
                    reject(err);
                })
            })
        },
        COMMENT_POST({commit}, payload){
            return new Promise((resolve, reject) => {
                const SEND = {
                    board: payload.board,
                    index: payload.index,
                    comment: payload.comment
                }

                axios({
                    method: 'post',
                    url: `/api/1/board/write/comment`,
                    data: SEND,
                    withCredentials: true
                }).then((req) => {
                    resolve(req);
                }).catch((err) => {
                    reject(err);
                })
            })
        },
        
        // Read
        POST_LIST({commit}, payload){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `/api/1/board/read/list/${payload.board}`,
                    data: payload,
                    withCredentials: true,
                }).then((req) => {
                    const index = [];
                    let list = req.data.payload;
                    list.map(item => {
                        // 시간 설정
                        item.state.displayDate = SET_TIME(item.state.date_fix);

                        // 유저 설정
                        if(typeof item.users[0] == 'object'){
                            item.users = item.users[0];
                        }else{
                            item.users = {
                                nickname : '익명'
                            }
                        }

                        // 썸네일 설정
                        if(typeof item.meta == 'object'){
                            if(typeof item.meta.thumbnail != 'object'){
                                if(typeof item.ImageMeta[0] == 'object'){
                                    item.meta.thumbnail = 0;
                                }else{
                                    item.meta.thumbnail = undefined;
                                }
                            }
                        }else{
                            item.meta = {
                                thumbnail : undefined
                            }
                        }
                        
                        // 댓글 카운트
                        if(typeof item.comment == 'object'){
                            if(item.comment.length > 0){
                                if(typeof item.comment[0] == 'object'){
                                    if(typeof item.comment[0].count == 'number'){
                                        item.comment = item.comment[0].count;
                                    }else {
                                        item.comment = 0;
                                    }
                                }else{
                                    item.comment = 0;
                                }
                            }else {
                                item.comment = 0;
                            }
                        }else{
                            item.comment = 0;
                        }

                        item.like = { count : 0 };

                        // 좋아요 카운트
                        if(typeof item.like_count == 'object'){
                            if(item.like_count.length > 0){
                                try{
                                    if(typeof item.like_count[0].count == 'number'){
                                        item.like.count = item.like_count[0].count;
                                    }else{
                                        item.like.count = 0;
                                    }
                                }catch(err){
                                    item.like.count = 0;
                                }
                            }else{
                                item.like.count = 0;
                            }
                        }else{
                            item.like.count = 0
                        }
                    });
                    resolve(list);
                }).catch((err) => {
                    reject(err);
                })
            });
        },
        POST_VIEW({commit}, payload){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `/api/1/board/read/view/${payload.board}`,
                    data: payload,
                    withCredentials: true,
                }).then((req) => {
                    let post = req.data.payload;
                    
                    post.state.displayDate = SET_TIME(post.state.date_fix);
                    post.board = { original: post.board, name: SET_BOARD.category(post.board) }

                    // 유저 정보
                    if(typeof post.users == 'object'){
                        try { post.users = post.users[0] }
                        catch(e){ post.users = { nickname : '익명', type : undefined } }
                    }

                    // 댓글수 추출
                    if(typeof req.data.payload.comment == 'object'){
                        if(typeof req.data.payload.comment[0] == 'object'){
                            if(typeof req.data.payload.comment[0].count == 'number'){
                                post.comment = req.data.payload.comment[0].count;
                            }else{
                                post.comment = 0;
                            }
                        }else{
                            post.comment = 0;
                        }
                    }else{
                        post.comment = 0;
                    }
                    
                    // 좋아요
                    post.like = { love : false, count : 0 };
                    if(typeof post.like_check == 'object'){
                        try {
                            if(post.like_check.length > 0){
                                if(typeof post.like_check[0].count == 'number'){
                                    if(post.like_check[0].count == 1){
                                        post.like.love = true;
                                    }else{
                                        post.like.love = false;
                                    }
                                }else {
                                    post.like.love = false;
                                }
                            }else{
                                post.like.love = false;
                            }
                        }catch(err){
                            post.like.love = false;
                        }
                    }

                    if(typeof post.like_count == 'object'){
                        try {
                            if(post.like_count.length > 0){
                                if(typeof post.like_count[0].count == 'number'){
                                    post.like.count = post.like_count[0].count;
                                }else {
                                    post.like.count = 0;
                                }
                            }else{
                                post.like.count = 0;
                            }
                        }catch(err){
                            post.like.count = 0;
                        }
                    }

                    // 조회수 추출
                    post.count = req.data.count;
                    
                    // 이미지 골라내기 시작
                    const Element = document.createElement('div');
                    Element.innerHTML = post.post;
                    const DataElement = Element.querySelectorAll(`[data-index]`);
                    DataElement.forEach(item => {
                        const index = item.getAttribute("data-index");
                        let query = [];

                        try {
                            let resize = { option : false, width: 0 };
                            resize.option = post.ImageMeta[index].meta.options.resize;
                            resize.option.forEach(value => {
                                if(resize.width < value){
                                    resize.width = value
                                }
                            });
                            // if pc
                                if(resize.width < 960){
                                    resize.width = 0;
                                }
                            // if pc end
                            (resize.width != 0) ? query.push(`${encodeURIComponent('resize')}=${encodeURIComponent(resize.width)}`) : undefined;
                        } catch(error) { undefined }

                        const result = (query.length != 0) ? '?'+query.join('&') : '';
                        item.setAttribute("src", `http://127.0.0.1:3000/images/${post.ImageMeta[index]._id + result}`);
                        item.setAttribute("style", `max-width: ${post.ImageMeta[index].meta.width}px`);
                    });
                    post.post = Element.outerHTML;
                    

                    resolve(post)
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        POST_LIKE_READ({commit}, payload){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `/api/1/board/read/post/like`,
                    data: payload,
                    withCredentials: true
                }).then((req) => {
                    resolve(req);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        COMMENT_LIST({commit, dispatch}, payload){
			return new Promise((resolve, reject) => {
                const SEND = {
                    board: payload.board,
                    index: payload.index,
                    page: payload.page,
                    view: payload.view
                }

				axios({
					method: 'post',
					url: `/api/1/board/read/comment/`,
					data: SEND,
					withCredentials : true
				}).then((req) => {
                    const payload = req.data.result;
                    payload.map(item => {
                        item.state.date_fix = SET_TIME(item.state.date_fix);
                    });

					resolve(payload);
				}).catch((err) => {
					reject(err)
				})
			});
        },
        COMMENT_COUNT({commit}, payload){

        }
    }
}

export default Post
