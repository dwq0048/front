<template>
    <div id="side" v-bind:class="{ active : $store.state.navigation, close : close }">
        <div class="close" title="닫기" v-on:click="onNavigation()"></div>
        <div class="contents" ref="side">
            <ul>
                <!-- LOGIN -->
                <li v-if="!isLogin">

                    <!-- view -->
                    <div class="view">
                        <div>
                            <div class="login">
                                <form v-on:submit.prevent="login">
                                    <div class="form" :class="{ active: isError['form'] }">
                                        <div class="form-input" :class="{ active: isError['userid'] }">
                                            <input type="text" placeholder="USER ID / E-MAIL" v-model="userid"/>
                                        </div>
                                        <div class="form-input" :class="{ active: isError['userpw'] }">
                                            <input type="password" placeholder="PASSWORD" v-model="userpw"/>
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
                                            <button type="submit">LOGIN</button>
                                        </div>

                                        <div class="alert" :class="{ active: isError['alert'] }">
                                            <p>{{ isError['message'] }}</p>
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
                    <!-- view -->
                </li>

                <!-- MY PAGE -->
                <li>

                    <!-- view -->
                    <div class="view">
                        <div>
                            <div class="mypage">
                                <div class="profile">
                                    <div class="image">
                                        <div></div>
                                    </div>
                                    <div class="intro">
                                        <p class="nickname"> 하하</p>
                                        <p class="setting">
                                            <span class="bell" >
                                                <i><font-awesome-icon :icon="faBell" /></i>
                                                <span>알림</span>
                                            </span>
                                            <span class="wish" title="좋아요">
                                                <i><font-awesome-icon :icon="faHeart" /></i>
                                                <span>좋아요</span>
                                            </span>
                                            <span class="cog" title="설정">
                                                <i><font-awesome-icon :icon="faCog" /></i>
                                                <span>설정</span>
                                            </span>
                                        </p>
                                    </div>
                                    <div class="button">
                                        <router-link to="/" title="로그아웃">로그아웃</router-link>
                                    </div>
                                </div>

                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- view -->
                </li>

                <!-- MENU -->
                <li>

                    <!-- view -->
                    <div class="view">
                        <div class="no-padding">
                            <div class="menu">
                                <div>
                                    <div>
                                        <div>
                                            <i><font-awesome-icon :icon="faHome" /></i>
                                        </div>
                                    </div>
                                    <ul>
                                        <li>
                                            <div>
                                                <div>
                                                    <div>홈</div>
                                                </div>
                                                <span>
                                                    <div></div>
                                                </span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <router-link to="/notice">공지사항</router-link>
                                                    <router-link to="/">버그 리포트</router-link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div>
                                        <div>
                                            <i><font-awesome-icon :icon="faInfo" /></i>
                                        </div>
                                    </div>
                                    <ul>
                                        <li>
                                            <div>
                                                <div>
                                                    <div>정보</div>
                                                </div>
                                                <span>
                                                    <div></div>
                                                </span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <router-link to="/">WIKI</router-link>
                                                    <router-link to="/">질문</router-link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div>
                                        <div>
                                            <i><font-awesome-icon :icon="faComments" /></i>
                                        </div>
                                    </div>
                                    <ul>
                                        <li>
                                            <div>
                                                <div>
                                                    <div>커뮤니티</div>
                                                </div>
                                                <span>
                                                    <div></div>
                                                </span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <router-link to="/">자유게시판</router-link>
                                                    <router-link to="/">VR 포토</router-link>
                                                    <router-link to="/">VR 영상</router-link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- view -->
                </li>
                <!-- MENU -->

            </ul>

            <div class="scrollBar" ref="scrollBar" :style="styleObject"></div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell, faHeart, faCog, faHome, faInfo, faComments } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'side',
    data(){
        return {
            close: false,
            isLogin: this.$store.state.userInfo.status,
            userid: '',
            userpw: '',
            isError: {
                alert: false,
                userid: false,
                userpw: false,
                form: false,
                message: ''
            },
            faBell,
            faHeart,
            faCog,
            faHome,
            faInfo,
            faComments,
            styleObject: {}
        }
    },
    methods: {
        onNavigation : function(){
            this.close = true;
            setTimeout(() => {
                this.$store.commit('onNavigation',false);
                this.close = false;
            },300)
        },
        login : function(){
            const data = {
                userid: this.userid,
                userpw: this.userpw
            }

            if(!data.userid){
                this.loginFail('userid no field');
                return
            }else if(!data.userpw){
                this.loginFail('userpw no field');
                return
            }

            this.$store.dispatch('Login', data).then((req) => {
                if(req.data.status == 'fail'){
                    //로그인 실패
                    this.loginFail(req.data.message);
                }else if(req.data.status == 'success'){
                    // 로그인 성공
					this.$store.commit('TokenInfo', req.data.info);
					this.$router.push({ path: '/' });
                }
            }).catch((err) => {
                console.log(err);
            })

        },
        loginFail: function(message){
            this.reset();
            this.isError.form = true;

            switch(message){
                case 'userid no field':
                    this.isError.alert = true;
                    this.isError.userid = true;
                    this.isError.message = '아이디를 입력해주세요.';
                    break;
                case 'userpw no field':
                    this.isError.userpw = true;
                    this.isError.alert = true;
                    this.isError.message = '비밀번호를 입력해주세요.'
                    break;
                case 'userid error':
                    this.isError.alert = true;
                    this.isError.userid = true;
                    this.isError.userpw = true;
                    this.isError.message = '아이디 또는 비밀번호가 틀렸습니다.';
                    break;
                case 'password error':
                    this.isError.alert = true;
                    this.isError.userid = true;
                    this.isError.userpw = true;
                    this.isError.message = '아이디 또는 비밀번호가 틀렸습니다.';
                    break;
                default:
                    this.isError.alert = true;
                    this.isError.message = '알 수 없는 오류입니다.';
                    break;
            }

            window.setTimeout(() => {
                this.isError.form = false;
			}, 300);
        },
        reset: function(){
            this.isError.userid = false;
            this.isError.userpw = false;
            this.isError.alert = false;
            this.isError.message = '';
        }
    },
    mounted() {
        const Content = this.$refs.side;
        const ContentHeight = Content.scrollHeight;
        const ContentOffset = Content.offsetHeight;

        const Bar = this.$refs.scrollBar; 
        const BarHeight = (ContentOffset / ContentHeight * 100);//Bar.offsetHeight;
        Bar.style.height = `${BarHeight}%`;

        const ScrollPosition = 100 - BarHeight;

		Content.addEventListener('scroll', (data) => {
            const scroll = (Content.scrollTop) / (ContentHeight - ContentOffset) * ScrollPosition;
            Bar.style.top = `${scroll}%`;
		});
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
                position: fixed;
                right: -350px;
                top: 0;
                background-color: $bg-black-light;
                cursor: default;
                border-left: 2px solid $bg-blue;
                overflow-y: scroll;
                -ms-overflow-style: none;
            }

            &::-webkit-scrollbar {
                display:none;
            }

            & > div.scrollBar {
                & {
                    position:fixed;
                    right: 0px;
                    top: 0%;
                    width: 3px;
                    height: 100%;
                    background-color: #ee8243;
                    @include transition(.2s all);
                    z-index: 10;
                }
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
                            position: relative;
                            @include transition(.2s all);
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

                        & > .alert {
                            margin-top: 10px;
                            font-size: #{$font-size - 2};
                            color: #f1f1f1;
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

                    & .form-input.active {
                        & {
                            @include transition(.2s all);
                            border: 2px solid #e84f4f;
                        }

                        & input::placeholder {
                            color: #e84f4f;
                        }
                    }

                    & .alert.active {
                        @include transition(.2s all);
                        opacity: 1;
                    }

                    & .form.active {
                        animation-duration: .3s;
                        animation-direction: reverse;
                        animation-name: slidein;
                        @keyframes slidein {
                            0% {
                                left: -2px;
                            }

                            20% {
                                left: 0px;
                            }

                            40% {
                                left: 2px;
                            }

                            60% {
                                left: 0px;
                            }

                            80% {
                                left: -2px;
                            }

                            100% {
                                left: 0px;
                            }
                        }
                    }
                }

                .mypage {

                    & > .profile {
                        & {
                            width: 100%;
                            display: block;
                        }

                        & > .image {
                            & {
                                width: 20%;
                                height: auto;
                                display: inline-block;
                            }

                            & > div {
                                position: relative;
                                background-color: #c4c4c4;
                                border: 2px solid $bg-orange;
                                padding-top: 100%;
                                overflow: hidden;
                            }
                        }

                        & > .intro {
                            & {
                                width: 80%;
                                height: auto;
                                display: inline-block;
                                vertical-align: bottom;
                                padding-left: 20px;
                            }

                            & > p {
                                font-size: #{$font-size};
                                color: #fff;
                                margin-bottom: 5px;
                            }

                            & > p.nickname {
                                font-size: #{$font-size + 4};
                                font-weight: bold;
                            }

                            & > p.setting {
                                & > span {
                                    & {
                                        margin-right: 15px;
                                        cursor: pointer;
                                        position: relative;
                                        @include transform(scale(1));
                                        @include transition(.2s all);
                                        display: inline-block;
                                    }

                                    & > span {
                                        font-size: #{$font-size - 2};
                                        padding-left: 5px;
                                        vertical-align: middle;
                                        display: inline-block;
                                    }

                                    & > i {
                                        display: inline-block;
                                        vertical-align: middle;
                                    }
                                }

                                & > span:hover {
                                    & {
                                        @include transform(scale(1.1));
                                        @include transition(.2s all);
                                    }
                                }
                            }
                        }

                        & > .button {
                            & {
                                margin-top: 20px;
                            }

                            & > a {
                                width: 100%;
                                font-size: #{$font-size - 2};
                                text-align: center;
                                padding: 10px;
                                display: block;
                                background-color: #555;
                                color: #f1f1f1;
                                text-decoration: none;
                                outline: none;
                                letter-spacing: 3px;
                                font-weight: bold;
                                @include transition(.2s all);
                            }

                            & > a:hover {
                                background-color: #515151;
                                @include transition(.2s all);
                            }
                        }
                    }
                }

                
                .menu {
                    
                    & > div {
                        & > div {
                            & {
                                width: 15%;
                                display: inline-block;
                                vertical-align: top;
                                font-size: 0;
                            }

                            & > div {
                                & {
                                    width: 100%;
                                    height: auto;
                                    padding-top: 100%;
                                    position: relative;
                                }

                                & > i {
                                    color: #c4c4c4;
                                    font-size: #{$font-size - 2};
                                    position: absolute;
                                    left: 50%; top: 50%;
                                    @include transform(translate(-50%, -50%));
                                }
                            }
                        }

                        & > ul {
                            & {
                                width: 85%;
                                display: inline-block;
                                vertical-align: top;
                                font-size: 0;
                                background-color: #555;
                            }

                            & > li {
                                & {
                                    display: block;
                                }

                                & > div {
                                    & {
                                        font-size: #{$font-size};
                                        font-weight: bold;
                                        color: #c4c4c4;
                                        background-color: #353535;
                                        width: 100%;
                                        height: 52.19px;
                                        padding-left: 20px;
                                        display: block;
                                        position: relative;
                                        cursor: pointer;
                                    }

                                    & > div {
                                        & {
                                            display: table;
                                            height: 100%;
                                        }

                                        & > div {
                                            display: table-cell;
                                            vertical-align: middle;
                                        }
                                    }

                                    & > span {
                                        & {
                                            display: block;
                                            position: absolute;
                                            right: 25px; top: 50%;
                                            @include transform(translateY(-50%));
                                        }

                                        & > div {
                                            & {
                                                width: 10px;
                                                height: 10px;
                                                position:relative;
                                                @include transform(rotate(-45deg));
                                            }

                                            &::after {
                                                content: " ";
                                                display: block;
                                                width: 100%;
                                                height: 2px;
                                                position: absolute;
                                                left:0; bottom: 0;
                                                background-color: #c4c4c4;
                                            }

                                            &::before {
                                                content: " ";
                                                display: block;
                                                height: 100%;
                                                width: 2px;
                                                position: absolute;
                                                left:0; bottom: 0;
                                                background-color: #c4c4c4;
                                            }
                                        }
                                        
                                    }
                                }

                                & > ul {
                                    & {
                                        font-size: 0;
                                        text-decoration: none;
                                    }

                                    & > li {
                                        & {
                                            padding-bottom: 50px;
                                        }

                                        & > a {
                                            display: block;
                                            padding: 15px 20px;
                                            font-size: #{$font-size};
                                            text-decoration: none;
                                            color: #f1f1f1;
                                            @include transition(all .2s)
                                        }

                                        & > a:hover {
                                            background-color: #515151;
                                            color: #fff;
                                            @include transition(all .2s);
                                        }
                                    }
                                }
                            }

                        }
                    }
                    
                }


            }

            & > div.no-padding {
                padding: 0;
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
