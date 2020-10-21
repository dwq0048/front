<template>
    <div class="grid">
        <ul>
            <li v-for="(item, i) in list" :key="i">
                <div>

                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AuthGrid',
    data(){
        return {
            list : [{},{},{},{},{},{},{},{},{},{}]
        }
    }
}
</script>

<style lang="scss" scoped>
    .grid {
        & {
            width: 100%; height: auto;
        }

        & > ul {
            & {
                width: 100%; height: auto;
                list-style: none;
                font-size: 0;
                padding: 5px;
            }

            & > li {
                & {
                    display: inline-block;
                    vertical-align: top;
                    width: 20%; height: auto;
                    padding: 10px;
                }

                & > div {
                    & {
                        width: 100%; height: auto;
                        padding-bottom: 100%;
                        border-radius: 5px;
                        background-color: #ccc;
                    }
                }
            }
        }
    }
</style>
