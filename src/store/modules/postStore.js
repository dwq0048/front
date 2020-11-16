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
                    let count = req.data.count;
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
                        
                    });

                    const post = {
                        list : list,
                        count : count
                    }
                    resolve(post);
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
                    
                    post.state.date_display = SET_TIME(post.state.date_fix);
                    post.board = { original: post.board, name: SET_BOARD.category(post.board) }

                    // 유저 정보
                    if(typeof post.users == 'object'){
                        try { post.users = post.users[0] }
                        catch(e){ post.users = { nickname : '익명', type : undefined } }
                    }

                    // 이미지 인덱스 지정 시작
                    const Element = document.createElement('div');
                    Element.innerHTML = post.post;
                    Element.querySelectorAll(`[data-index]`).forEach(item => {
                        const index = item.getAttribute("data-index");
                        post.ImageMeta.map(list => {
                            if(typeof list.meta == 'object'){
                                if(typeof list.meta.index =='string'){
                                    if(index == list.meta.index){
                                        let query = [];
                                        let resize = { option : false, width : 0 };
                                        if(typeof list.meta.options == 'object'){
                                            if(typeof list.meta.options.resize == 'object'){
                                                resize.option = list.meta.options.resize;
                                                resize.option.forEach(value => {
                                                    (resize.width < value) ? resize.width = value : undefined
                                                });
                                                (resize.width < 960) ? resize.width = 0 : undefined;
                                                (resize.width != 0) ? query.push(`${encodeURIComponent('resize')}=${encodeURIComponent(resize.width)}`) : undefined;
                                            }
                                        }
                                        const result = (query.length != 0) ? '?'+query.join('&') : '';
                                        if(typeof list._id == 'string'){
                                            item.setAttribute("src", `http://127.0.0.1:3000/images/${list._id + result}`);
                                        }

                                        if(typeof list.meta == 'object'){
                                            if(typeof list.meta.width == 'number'){
                                                item.setAttribute("style", `max-width: ${list.meta.width}px`);
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    });
                    // 이미지 인덱스 지정 끝
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
        COMMENT_LIST({commit}, payload){
			return new Promise((resolve, reject) => {
                const SEND = { board: payload.board, index: payload.index, list: payload.list, view: payload.view };
				axios({
					method: 'post',
					url: `/api/1/board/read/comment/`,
					data: SEND,
					withCredentials : true
				}).then((req) => {
                    const payload = req.data.payload;
                    payload.map((item) => {
                        item.state.date_display = SET_TIME(item.state.date_fix)
                    })
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
