<template>
    <div id="side" v-bind:class="{ active : $store.state.navigation, close : this.close }">
        <div class="close" title="닫기" v-on:click="onNavigation()"></div>
        <div class="contents">
            <ul>
                <!-- LOGIN -->
                <li>
                    <div class="menu">
                        <div>
                            <span>
                                <div>
                                    
                                </div>
                            </span>
                            LOGIN
                        </div>
                    </div>
                    <div class="view">
                        <div>
                            <div class="login">
                                <form>
                                    <div class="form">
                                        <div class="form-input">
                                            <input type="text" placeholder="USER ID / E-MAIL"/>
                                        </div>
                                        <div class="form-input">
                                            <input type="password" placeholder="PASSWORD"/>
                                        </div>
                                        <div class="checkbox">
                                            <label>
                                                <div class="form-checkbox">
                                                    <input type="checkbox" />
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 10 10">
                                                            <path d="M 1,6 3,8 8,1" style="stroke:#000; stroke-width:2; fill:none;" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p>자동 로그인</p>
                                            </label>
                                        </div>
                                        <div class="checkbox">
                                            <label>
                                                <div class="form-checkbox">
                                                    <input type="checkbox" />
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 10 10">
                                                            <path d="M 1,6 3,8 8,1" style="stroke:#000; stroke-width:2; fill:none;" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p>서비스 이용약관 동의</p>
                                            </label>
                                        </div>

                                        <div class="form-submit">
                                            <button type="button">
                                                LOGIN
                                            </button>
                                        </div>

                                        <div class="line">
                                            <div>
                                                <p>OR</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </li>

                <!-- MY PAGE -->
                <li>
                    <div class="menu">
                        <div>
                            <span>
                                <div>

                                </div>
                            </span>
                            MY PAGE
                        </div>
                    </div>
                    <div class="view">
                        <div>
                            <div class="mypage">
                                <div class="profile">
                                    <div class="image">
                                        <div></div>
                                    </div>
                                    <div class="intro">
                                        <p><b>이름</b> : 하하</p>
                                        <p><b>마지막 로그인</b> : 2018:12:12</p>
                                    </div>
                                </div>

                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'side',
    data(){
        return {
            close: false
        }
    },
    methods: {
        onNavigation : function(){
            this.close = true;
            setTimeout(() => {
                this.$store.commit('onNavigation');
                this.close = false;
            },300)
        }
    }
}
</script>

<style scoped lang="scss">
    .form-input {
        & {
            width: 100%;
            height: 45px;
            border: 2px solid $bg-black-light;
            background-color: #fff;
        }

        & > input {
            width: 100%;
            height: 100%;
            padding:0 0 0 15px;
            font-size: $font-size;
            color: $font-color;
            border: none;
            background: none;
            outline: none;
        }

    }

    .form-submit {
        & {
            width: 100%;
            height: 50px;
            background-color: $bg-orange;
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
            @include transition(all .2s);
        }

        &:hover {
            background-color: $bg-orange-bold;
            @include transition(all .2s);
        }

        & > button {
            & {
                width: 100%;
                height: 100%;
                background:none;
                border:none;
                color:#fff;
                letter-spacing: 2px;
                font-size: #{$font-size - 1};
                cursor: pointer;
                outline: none;
                @include box-sizing(border-box);
            }
        }

    }

    .form-checkbox {
        & {
            display: inline-block;
        }

        & > input {
            display: none;
        }

        & > input:checked + div {
            & > svg {
                display: block;
            }
        }

        & > div {
            & {
                width: 10px;
                height: 10px;
                background-color: #f1f1f1;
                border: 1px solid $bg-gray;
                border-radius: 2px;
                position: relative;
                cursor: pointer;
                @include transition(all .2s);
            }

            &:hover {
                background-color: $bg-light-bold;
                @include transition(all .2s);
            }

            &:active {
                background-color: $bg-gray;
                @include transition(all .2s);
            }

            & > svg {
                & {
                    display: none;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    @include transform(translate(-50%, -50%));
                    width:8px;
                    height:8px;
                }
            }
        }
    }

    #side {
        & {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            z-index: 10000;
            cursor: pointer;
            display:none;
        }

        & > .close {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        & > .contents {
            & {
                width: 350px;
                height: 100%;
                position: absolute;
                right: -350px;
                top: 0;
                background-color: $bg-black-light;
                cursor: default;
                border-left: 2px solid $bg-blue;
            }

            & > ul {
                & {
                    font-size: 0;
                    text-decoration: none;
                }

                & > li {
                    & {
                        width: 100%;
                        height: auto;
                    }

                    & > .menu {
                        & {
                            display: table;
                            width: 100%;
                            height: 55px;
                            border-bottom: 2px solid $bg-blue-bold;
                            background-color: $bg-blue;
                            display: table;
                        }

                        & > div {
                            & {
                                width: 100%;
                                color: #fff;
                                display: table-cell;
                                font-size: #{$font-size + 2};
                                padding-left: 15px;
                                vertical-align: middle;
                                letter-spacing: 5px;
                                cursor: pointer;
                            }

                            & > span {
                                & > div {
                                    & {
                                        position: relative;
                                        content: " ";
                                        display: inline-block;
                                        width:15px;
                                        height:15px;
                                        margin-right: 10px;
                                        @include transform(rotate(90deg));
                                    }

                                    &:after{
                                        content: " ";
                                        display: block;
                                        width: 15px;
                                        height: 2px;
                                        background-color: #fff;
                                        @include transform(rotate(45deg));
                                        position: absolute;
                                    }

                                    &:before{
                                        content: " ";
                                        display: block;
                                        width: 15px;
                                        height: 2px;
                                        background-color: #fff;
                                        @include transform(rotate(-45deg));
                                        position: absolute;
                                        top: 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .view {
            & {
                display: block;
            }

            & > div {
                & {
                    padding: 30px 15px;
                }

                .login {
                    & {
                        padding: 15px 0;
                    }

                    & .form {
                        & {
                            width: 100%;
                            height: auto;
                            max-width: 300px;
                            margin: 0 auto;
                        }

                        & > .form-input {
                            & {
                                height: 37px;
                                border:2px solid $bg-orange;
                                margin-bottom: 15px;
                            }

                            & > input {
                                font-size: #{$font-size - 3};
                            }
                        }

                        & > .form-submit {
                            & {
                                height: 40px;
                                margin-top: 20px;
                            }
                        }

                        & > .checkbox {
                            & {
                                margin-bottom: 5px;
                            }

                            & > label {
                                & {
                                    font-size: #{$font-size - 2};
                                    color: $bg-light;
                                    cursor: pointer;
                                }

                                & > p {
                                    & {
                                        display: inline-block;
                                        padding-left: 5px;
                                    }
                                }

                                & > i {
                                    & {
                                        display: block;
                                        font-style: normal;
                                    }
                                }
                            }
                        }

                        & > .line {
                            & {
                                padding-top: 30px;
                            }

                            & > div {
                                & {
                                    width: 100%;
                                    height: 2px;
                                    background-color: #fff;
                                    position: relative;
                                    text-align: center;
                                }

                                & > p {
                                    color: #fff;
                                    background-color: $bg-black-light;
                                    padding: 0px 20px;
                                    font-size: #{$font-size - 2};
                                    display: inline-block;
                                    margin-top: -8px;
                                }
                            }

                        }
                    }
                }

                .mypage {

                    & > .profile {
                        & {
                            width: 100%;
                            height: 300px;
                            display: block;
                        }

                        & > .image {
                            & {
                                width: 30%;
                                height: auto;
                                display: inline-block;
                            }

                            & > div {
                                position: relative;
                                background-color: #fff;
                                border: 2px solid $bg-orange;
                                padding-top: 100%;
                                border-radius: 50%;
                                overflow: hidden;
                            }
                        }

                        & > .intro {
                            & {
                                width: 70%;
                                height: auto;
                                display: inline-block;
                                vertical-align: top;
                                padding-left: 20px;
                            }

                            & > p {
                                font-size: #{$font-size - 2};
                                color: #fff;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }


            }
        }

        &.active {
            & {
                display: block;
                animation-duration: .3s;
                animation-direction: normal;
                animation-name: slide-background;
                @keyframes slide-background {
                    from {
                        background-color: rgba(0, 0, 0, 0);
                    }

                    to {
                        background-color: rgba(0, 0, 0, 0.7);
                    }
                }
                background-color: rgba(0, 0, 0, 0.7);
            }

            & > .contents {
                & {
                    animation-duration: .3s;
                    animation-direction: normal;
                    animation-name: slide-contents;
                    @keyframes slide-contents {
                        from {
                            right: -350px;
                        }

                        to {
                            right: 0px;
                        }
                    }
                    right: 0px;
                }
            }
        }

        &.active.close {
            & {
                animation-duration: .3s;
                animation-direction: normal;
                animation-name: slide-background-close;
                @keyframes slide-background-close {
                    from {
                        background-color: rgba(0, 0, 0, 0.7);
                    }

                    to {
                        background-color: rgba(0, 0, 0, 0);
                    }
                }
                background-color: rgba(0, 0, 0, 0);
            }

            & > .contents {
                & {
                    animation-duration: .3s;
                    animation-direction: normal;
                    animation-name: slide-contents-close;
                    @keyframes slide-contents-close {
                        from {
                            right: 0px;
                        }

                        to {
                            right: -350px;
                        }
                    }
                    right: -350px;
                }
            }
        }
    }
</style>
