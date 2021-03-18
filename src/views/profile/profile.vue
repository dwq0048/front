<template>
    <div class="profile">
        <div v-if="list" class="list">
            <profile-list :list="list" />
        </div>
        <div class="guest">
            <div>
                <div class="title">
                    <div class="left">
                        <h1>방명록</h1>
                    </div>
                    <div class="right">
                        <router-link to="#">
                            <div>
                                <span>##의 모든 방명록 보기</span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="message">
                    <div>
                        <div class="image">
                            <div></div>
                        </div>
                        <div class="form">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileList from '@/components/board/list_skin/profilePack01/list'
import { mapActions, mapGetters } from 'vuex'

const postStore = 'postStore'

export default {
    name: 'Profile',
    components: { 'profile-list': ProfileList },
    data(){
        return {
            list : false,
        }
    },
    methods : {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
    },
    created(){
        let data = {
            page : 0,
            view : 12,
            board : undefined,
            user : this.$route.params.id
        };

        this.POST_LIST(data).then((req) => {
            this.list = req.list;
            this.count = req.count;

            this.list.map(item => {
                console.log(typeof item.meta.thumbnail);
            })

            console.log(this.list);
        }).catch((err) => {
            console.log(err);
        })
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        & {
            position: relative;
            width: 100%; height: auto;
        }

        & > .list {
            & {
                position: relative;
                width: 100%; height: auto;
                padding: 10px;
                border-radius: 5px;
                background-color: #fff;
                @include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
            }
        }

        & > .guest {
            & {
                position: relative;
                width: 100%; height: auto;
                padding: 15px;
                border-radius: 5px;
                margin-top: 15px;
                background-color: #fff;
                @include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
            }

            & > div {
                & {
                    width: 100%; height: auto;
                }

                & > .title {
                    & {
                        display: table;
                        width: 100%; height: auto;
                    }

                    & > .left {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            width: 100%; height: auto;
                            font-size: 0;
                        }

                        & > h1 {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size + 4};
                                font-weight: bold;
                                color: #555;
                                line-height: 1;
                            }
                        }
                    }

                    & > .right {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            width: auto; height: auto;
                            white-space: nowrap;
                            font-size: 0;
                        }

                        & > a {
                            & {
                                display: inline-block;
                                text-decoration: none;
                                font-size: 0;
                            }

                            & > div {
                                & {
                                    display: block;
                                    font-size: 0;
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size};
                                        font-weight: bold;
                                        color: $bg-blue;
                                        line-height: 1;
                                    }
                                }
                            }
                        }
                    }
                }

                & > .message {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        padding-top: 15px;
                    }

                    & > div {
                        & {
                            display: table;
                            width: 100%; height: auto;
                        }

                        & > .image {
                            & {
                                display: table-cell;
                                vertical-align: top;
                                width: 60px; height: auto;
                                padding-right: 10px;
                                white-space: nowrap;
                            }

                            & > div {
                                & {
                                    position: relative;
                                    display: block;
                                    width: 50px; height: auto;
                                    background-color: #ccc;
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 100%;
                                }
                            }
                        }

                        & > .form {
                            & {
                                display: table-cell;
                                vertical-align: top;
                                width: 100%; height: auto;
                            }

                            & > div {
                                & {
                                    display: table;
                                    width: 100%; height: auto;
                                    min-height: 50px;
                                    background-color: #aaa;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
