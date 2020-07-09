<template>
    <div class="comment">
        <div class="submit">
            <div class="plus">
                <button type="button">
                    <div>
                        <i><font-awesome-icon :icon="faPlus" /></i>
                    </div>
                </button>
            </div>
            <div class="form-input">
                <textarea></textarea>
            </div>
            <div class="upload">
                <button type="button">
                    <div>
                        <i><font-awesome-icon :icon="faCloudUploadAlt" /></i>
                    </div>
                </button>
            </div>
        </div>
        <div class="contents">
            <div class="no-reply">
                <p>댓글이 없습니다.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'comment_chat',
    data() {
        return {
            faPlus, faCloudUploadAlt
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment {
        & {
            background-color: #fff;
            margin-top: 25px;
            @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
        }

        & > .submit {
            & {
                width: 100%;
                padding: 15px 30px;
                display: table;
            }

            & > .plus {
                & {
                    width: 80px;
                    display: table-cell;
                    vertical-align: bottom;
                }

                & > button {
                    & {
                        border: none;
                        background: none;
                        padding: 0;
                        margin: 0;
                        font-size: #{$font-size - 2};
                        color: #999;
                        line-height: 35px;
                        cursor: pointer;
                    }

                    & > div {
                        & {
                            width: 35px;
                            height: 35px;
                            border: 2px solid #999;
                            border-radius: 5px;
                        }
                    }
                }
            }

            & > .upload {
                & {
                    width: 100px;
                    display: table-cell;
                    vertical-align: bottom;
                }

                &:after {
                    content: " ";
                    display: block;
                    clear: both;
                }

                & > button {
                    & {
                        border: none;
                        background: none;
                        padding: 0;
                        margin: 0;
                        font-size: #{$font-size + 2};
                        line-height: 35px;
                        cursor: pointer;
                        float: right;
                    }

                    & > div {
                        & {
                            display: inline-block;
                            width: 70px;
                            height: 35px;
                            border: 2px solid #999;
                            color: #999;
                            border-radius: 5px;
                        }
                    }
                }
            }

            & > .form-input {
                & {
                    width: 700px;
                    height: auto;
                    display: table-cell;
                    vertical-align: top;
                    border: 1px solid #999;
                    border-radius: 10px;
                    font-size: 0;
                }

                & > textarea {
                    border: none;
                    background: none;
                    width: 100%;
                    height: 35px;
                    line-height: 25px;
                    outline: none;
                    border: none;
                    padding: 0;
                    margin: 0;
                    padding: 5px 10px;
                    font-size: #{$font-size};
                    resize: none;
                    overflow: auto;
                    vertical-align: middle;
                }
            }
        }

        & > .contents {
            & {
                width: 100%;
                min-height: 100px;
                max-height: 500px;
                overflow-y: scroll;
                background-color: #f1f1f1;   
            }

            & > .no-reply {
                text-align: center;
                font-size: #{$font-size};
                font-weight: bold;
                color: #333;
                line-height: 100px;
            }
        }
    }
</style>
