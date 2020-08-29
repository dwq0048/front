<template>
    <div class="footer">
        <div>
            <div>
                <h1>Copyright(c)2020 오줌달달 All rights reserved.</h1>
                <p>VV isn’t endorsed by Vrchat and doesn’t reflect the views or opinions of Vrchat or anyone officially involved in producing or managing Vrchat.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'default-footer'
}
</script>

<style lang="scss" scoped>
    .footer {
        & {
            width: 100%;
            height: 50px;
            background-color: $bg-black-light;
            padding: 10px 15px;
            position: absolute;
            left: 0; bottom: 0;
        }

        & > div {
            & {
                width: 100%;
                height: 100%;
                max-width: $wrap;
                margin: 0 auto;
                display: table;
            }

            & > div {
                & {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;
                }

                & > h1 {
                    & {
                        font-size: #{$font-size - 2};
                        color: #ccc;
                    }
                }

                & > p {
                    & {
                        font-size: #{$font-size - 2};
                        color: #ccc;
                    }
                }
            }
        }
    }
</style>
