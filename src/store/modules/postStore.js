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
        POST_LIST({commit}, payload){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `/api/1/board/list/${payload.board}`,
                    data: payload,
                    withCredentials: true,
                }).then((req) => {
                    req.data.data.map(item => {
                        item.state.displayDate = SET_TIME(item.state.date_fix)
                    });

                    resolve(req.data.data);
                }).catch((err) => {
                    reject(err);
                })
            });
        },
        POST_VIEW({commit}, payload){
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: `/api/1/board/view/${payload.id}`,
                    data: payload,
                    withCredentials: true,
                }).then((req) => {
                    let post = req.data.req;
                    post.state.displayDate = SET_TIME(post.state.date_fix);
                    post.board = {
                        original: post.board,
                        name: SET_BOARD.category(post.board)
                    }
        
                    const element = document.createElement('div');
                    element.innerHTML = post.post;
                    for(let i=0; i<post.images.length; i++){
                        const src = element.querySelectorAll(`[data-index]`);
                        for(let j=0; j<src.length; j++){
                            const index = src[j].getAttribute("data-index");
                            src[j].setAttribute("src", `http://127.0.0.1:3000/images/${post.images[index]}`);
                        }
                    }
                    post.post = element.outerHTML;

                    resolve(post)
                }).catch((err) => {
                    reject(err)
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
                    url: `/api/1/board/comment/reply`,
                    data: SEND,
                    withCredentials: true
                }).then((req) => {
                    resolve(req);
                }).catch((err) => {
                    reject(err);
                })
            })
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
					url: `/api/1/board/comment/`,
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
        }
    }
}

export default Post
