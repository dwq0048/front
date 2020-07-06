<template>
    <div class="default">
        <div class="contents">
            <div class="info">
                <div class="title">
                    <h1>{{ post.title }}</h1>
                </div>
                <div class="display">
                    <div>
                        <span>{{ post.board }}</span>
                        <span>{{ post.state.date_fix }}</span>
                        <span>{{ post.user.nickname }}</span>
                    </div>
                    <div>
                        <span>좋아요</span>
                    </div>
                </div>
            </div>
            <div class="post">
                <div v-html="post.post"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DefaultMain',
    data() {
        return {
            id: this.$route.params.id,
            post: {}
        }
    },
    methods : {
        
    },
    created: function(){
        const data = {
            id: this.id,
            board: 'notice'
        }

        this.$axios({
            method: 'post',
            url: `/api/1/board/view/${this.id}`,
            data: data,
            withCredentials: true,
        }).then((req) => {
            this.post = req.data.req;

            console.log(this.post);
        }).catch((err) => {
            console.log(err);
        })
    },
}
</script>

<style lang="scss" scoped>
    .default {
        & {
            width: 100%;
            height: auto;
        }

        & > .contents {
            & {
                background-color: #fff;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }
            
            & > .info {
                & {
                    border-bottom: 1px solid #ddd;
                }
                
                & > .title {
                    & {
                        padding: 20px 30px;
                    }

                    & > h1 {
                        font-size: #{$font-size + 10};
                    }
                }

                & > .display {
                    & {
                        padding: 0px 30px 15px 30px;
                    }

                    &:after {
                        content: " ";
                        display: block;
                        clear: both;
                    }

                    & > div {
                        & {
                            float: left;
                        }

                        & > span {
                            font-size: #{$font-size -2};
                            color: #858585;
                            display: inline-block;
                            padding-right: 15px;
                        }
                        
                    }

                    & > div:nth-child(2){
                        & {
                            float: right;
                        }

                        & > span {
                            padding-right: 0;
                            padding-left: 15px;
                        }
                    }
                }
            }

            & > .post {
                & {
                    padding: 15px 30px;
                }
            }
        }
    }
</style>
