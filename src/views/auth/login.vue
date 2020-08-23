<template>
    <div class="auth">
        <default-side />
		<default-header />

        <div class="contents">
            <div class="background" :style="'background-image:url(' + require(`@/assets/beat.jpeg`)+ ')'">
                <div>

                </div>
            </div>
            <div class="wrap">

            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/layout/header'
import Side from '@/components/layout/navigation'
import Login from '@/components/widget/auth/login.vue'

export default {
    name: 'Login',
    data(){
        return {

        }
    },
	components: {
        'default-header': Header,
        'default-side': Side,
        'login' : Login,
    },
}
</script>

<style lang="scss" scoped>
    .auth {
        & > .contents {
            & {
                width: 1200px;
                height: auto;
                background-color: #fff;
                padding: 1000px 0;
                position: relative;
                margin: 50px auto 0 auto;
                @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
            }

            &:after {
                content: " ";
                display: block;
                clear: both;
            }

            & > .background {
                & {
                    position: absolute;
                    left: 0; right: 50%; top: 0; bottom: 0;
                    background-color: #ccc;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: 50% 50%;
                    background-attachment: fixed;
                }

                & > div {
                    & {
                        position: absolute;
                        left: 0; top: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.5);
                    }
                }
            }
        }
    }
</style>
