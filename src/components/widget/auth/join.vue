<template>
    <form v-on:submit.prevent="Login">
        <div class="title">
            <h1>Sign Up</h1>
        </div>
        <div class="form" :class="{ active: LOGIN_ALERT['ERROR'] }" >
            <div class="agree">
                <div>
                    <div class="nav">
                        <button type="button" title="펼치기">
                            <i><font-awesome-icon :icon="faAngleDown" /></i>
                        </button>
                        <div class="title">
                            <h1>이용약관 동의</h1>
                        </div>
                    </div>
                    <div class="post">
                        제1조 (목적)
                        이 약관은 인플웍스 (이하 '회사'라 합니다)가 운영하는 인터넷사이트(http://www.xetemplate.com 이하 ’XE템플릿'이라 합니다)를 통하여 판매되는 템플릿 제품을 이용자가 이용하는 경우, 회사와 이용자간 전자금융거래의 법률관계를 정함에 그 목적이 있습니다.

                        제 2조 (정의)
                        ① 본 약관에서 정하는 용어의 정의는 다음과 같습니다.

                        - 전자금융거래’라 함은 회사가 전자적 장치를 통하여 전자금융업무를 제공하고, 이용자가 회사의 종사자와 직접 대면하거나 의사소통을 하지 아니하고 자동화된 방식으로 이를 이용하는 거래를 말합니다.

                        - 접근매체’라 함은 전자금융거래에 있어서 거래지시를 하거나 이용자 및 거래내용의 진실성과 정확성을 확보하기 위하여 사용되는 수단 또는 정보로서 전자식 카드 및 이에 준하는 전자적 정보(신용카드번호를 포함한다), ’전자서명법’ 상의 인증서, 금융기관 또는 전자금융업자에 등록된 이용자번호, 이용자의 생체정보, 이상의 수단이나 정보를 사용하는데 필요한 비밀번호 등 전자금융거래법 제2조 제10호에서 정하고 있는 것을 말합니다.

                        - 이용자’라 함은 회사와 본 약관에 동의하고 본 약관에 따라 사이트 전자금융거래 서비스를 이용하는 사이트 회원을 말합니다.

                        - 비밀번호’란 이용자의 동일성 식별과 회원정보의 보호를 위하여 이용자가 설정하고 회사가 승인한 숫자와 문자의 조합을 말합니다.

                        - 오류’라 함은 이용자의 고의 또는 과실 없이 전자금융거래가 본 약관 또는 이용자의 거래지시에 따라 이행되지 아니한 경우를 말합니다.

                        ② 본 조 및 본 약관의 다른 조항에서 정의한 것을 제외하고는 전자금융거래법 등 관련법령에 정한 바에 따른다.

                        제3조 (약관의 명시 및 변경)
                        ① 회사는 이용자가 전자금융거래를 하기 전에 본 약관을 사이트에 게시하고 이용자가 본 약관의 중요한 내용을 확인할 수 있도록 합니다.

                        ② 회사는 이용자의 요청이 있는 경우 전자문서의 전송(전자우편을 이용한 전송을 포함합니다)의 방식에 의하여 본 약관의 사본을 이용자에게 교부합니다.

                        ③ 회사가 본 약관을 변경하는 때에는 그 시행일 1개월 전에 변경되는 약관을 금융거래정보 입력화면 및 회사의 홈페이지(‘ xetemplate’를 말합니다. 이하에서 같습니다)에 게시함으로써 이용자에게 공지합니다.

                        제4조 (거래내용의 확인)
                        ① 회사는 ‘ XEtemplate’의 ’구매내역’ 조회 화면을 통하여 이용자의 거래내용을 확인할 수 있도록 하며, 이용자의 요청이 있는 경우에는 요청을 받은 날로부터 2주 이내에 모사전송, 우편 또는 직접 교부의 방법으로 거래내용에 관한 서면을 교부합니다.

                        ② 제1항의 대상이 되는 거래내용 중 대상기간이 5년인 것은 다음 각호와 같습니다.

                        거래의 종류 및 금액
                        거래상대방을 나타내는 정보
                        거래일자
                        전자적 장치의 종류 및 전자적 장치를 식별할 수 있는 정보
                        해당 전자금융거래와 관련한 전자적 장치의 접속기록
                        ③ 제1항의 대상이 되는 거래내용 중 대상기간이 1년인 것은 다음 각호와 같습니다.

                        건당 거래금액이 1만원 이하인 소액 전자금융거래에 관한 기록
                        전자지급수단 이용시 거래승인에 관한 기록 3. 이용자의 오류정정 요구사실 및 처리결과에 관한 사항
                        ④ 이용자가 제1항에서 정한 서면교부를 요청하고자 할 경우 다음의 주소 및 전화번호로 요청할 수 있습니다.

                        주소: 서울시 송파구 문정동 가든파이브 라이프동 테크노관 8층 8125호 인플웍스
                        이메일 주소: inpleworks@gmail.com
                        전화번호: 070-8283-1029
                        제5조 (오류의 정정 등)
                        ① 이용자는 전자금융거래서비스를 이용함에 있어 오류가 있음을 안 때에는 회사에 대하여 그 정정을 요구할 수 있습니다.

                        ② 회사는 제1항의 규정에 따른 오류의 정정요구를 받은 때에는 이를 즉시 조사하여 처리한 후 정정요구를 받은 날부터 2주 이내에 그 결과를 이용자에게 알려 드립니다.

                        제6조 (전자금융거래 기록의 생성 및 보존)
                        ① 회사는 이용자가 이용한 전자금융거래의 내용을 추적, 검색하거나 그 내용에 오류가 발생한 경우에 이를 확인하거나 정정할 수 있는 기록을 생성하여 보존합니다.

                        ② 제1항의 규정에 따라 회사가 보존하여야 하는 기록의 종류 및 보존방법은 제4조 제2항, 제3항에서 정한 바에 따릅니다.

                        제7조 (거래지시의 철회 등)
                        이용자가 전자지급거래를 한 경우, 이용자는 지급의 효력이 발생하기 전까지 본 약관에서 정한 바에 따라 제4조 제4항 기재 담당자에게 전자문서의 전송(전자우편을 이용한 전송을 포함합니다)에 의한 방법으로 거래지시를 철회할 수 있습니다. 각 서비스별 거래지시 철회의 효력 발생시기는 본 약관 제15조에서 정하는 바와 같습니다.

                        제8조 (전자금융거래정보의 제공금지)
                        회사는 전자금융거래서비스를 제공함에 있어서 취득한 이용자의 인적사항, 이용자의 계좌, 접근매체 및 전자금융거래의 내용과 실적에 관한 정보 또는 자료를 법령에 의하거나 이용자의 동의를 얻지 아니하고 제3자에게 제공, 누설하거나 업무상 목적 외에 사용하지 아니합니다.

                        제9조 (회사의 책임)
                        ① 회사는 접근매체의 위조나 변조로 발생한 사고(단, 회사가 접근매체의 발급 주체이거나 사용, 관리 주체인 경우), 계약체결 또는 거래지시의 전자적 전송이나 처리과정에서 발생한 사고로 인하여 이용자에게 손해가 발생한 경우에는 그 손해를 배상할 책임을 집니다.

                        ② 회사는 제1항에도 불구하고 다음 각호의 경우에는 이용자에 대하여 손해배상책임을 지지 않습니다.

                        이용자가 접근매체를 제3자에게 대여하거나 사용을 위임하거나 양도 또는 담보 목적으로 제공하거나, 제3자가 권한없이 이용자의 접근매체를 이용하여 전자금융거래를 할 수 있음을 알았거나 알 수 있었음에도 불구하고 이용자가 자신의 접근매체를 누설 또는 노출하거나 방치한 경우
                        법인(’중소기업기본법’ 제2조 제2항에 의한 소기업을 제외한다)인 이용자에게 손해가 발생한 경우로서 회사가 사고를 방지하기 위하여 보안절차를 수립하고 이를 철저히 준수하는 등 합리적으로 요구되는 충분한 주의의무를 다한 경우
                        ③ 회사는 이용자로부터의 거래지시가 있음에도 불구하고 천재지변, 회사의 귀책사유가 없는 정전, 화재, 통신장애 기타의 불가항력적인 사유로 처리 불가능하거나 지연된 경우로서 이용자에게 처리 불가능 또는 지연 사유를 통지한 경우(금융기관 또는 결제수단 발행업체나 통신판매업자가 통지한 경우를 포함합니다)에는 이용자에 대하여 이로 인한 책임을 지지 아니합니다.

                        ④ 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체의 사유가 발생하여 전자금융서비스의 제공을 일시적으로 중단할 경우에는 회사의 홈페이지를 통하여 이용자에게 중단 일정 및 중단 사유를 사전에 공지합니다.

                        본 약관은 2011년 10월 1일부터 시행합니다.
                    </div>
                </div>
                
                <div>
                    <div class="nav">
                        <button type="button" title="펼치기">
                            <i><font-awesome-icon :icon="faAngleDown" /></i>
                        </button>
                        <div class="title">
                            <h1>개인정보이용 동의</h1>
                        </div>
                    </div>
                    <div class="post">
                        제1조 (목적)
                        이 약관은 인플웍스 (이하 '회사'라 합니다)가 운영하는 인터넷사이트(http://www.xetemplate.com 이하 ’XE템플릿'이라 합니다)를 통하여 판매되는 템플릿 제품을 이용자가 이용하는 경우, 회사와 이용자간 전자금융거래의 법률관계를 정함에 그 목적이 있습니다.

                        제 2조 (정의)
                        ① 본 약관에서 정하는 용어의 정의는 다음과 같습니다.

                        - 전자금융거래’라 함은 회사가 전자적 장치를 통하여 전자금융업무를 제공하고, 이용자가 회사의 종사자와 직접 대면하거나 의사소통을 하지 아니하고 자동화된 방식으로 이를 이용하는 거래를 말합니다.

                        - 접근매체’라 함은 전자금융거래에 있어서 거래지시를 하거나 이용자 및 거래내용의 진실성과 정확성을 확보하기 위하여 사용되는 수단 또는 정보로서 전자식 카드 및 이에 준하는 전자적 정보(신용카드번호를 포함한다), ’전자서명법’ 상의 인증서, 금융기관 또는 전자금융업자에 등록된 이용자번호, 이용자의 생체정보, 이상의 수단이나 정보를 사용하는데 필요한 비밀번호 등 전자금융거래법 제2조 제10호에서 정하고 있는 것을 말합니다.

                        - 이용자’라 함은 회사와 본 약관에 동의하고 본 약관에 따라 사이트 전자금융거래 서비스를 이용하는 사이트 회원을 말합니다.

                        - 비밀번호’란 이용자의 동일성 식별과 회원정보의 보호를 위하여 이용자가 설정하고 회사가 승인한 숫자와 문자의 조합을 말합니다.

                        - 오류’라 함은 이용자의 고의 또는 과실 없이 전자금융거래가 본 약관 또는 이용자의 거래지시에 따라 이행되지 아니한 경우를 말합니다.

                        ② 본 조 및 본 약관의 다른 조항에서 정의한 것을 제외하고는 전자금융거래법 등 관련법령에 정한 바에 따른다.

                        제3조 (약관의 명시 및 변경)
                        ① 회사는 이용자가 전자금융거래를 하기 전에 본 약관을 사이트에 게시하고 이용자가 본 약관의 중요한 내용을 확인할 수 있도록 합니다.

                        ② 회사는 이용자의 요청이 있는 경우 전자문서의 전송(전자우편을 이용한 전송을 포함합니다)의 방식에 의하여 본 약관의 사본을 이용자에게 교부합니다.

                        ③ 회사가 본 약관을 변경하는 때에는 그 시행일 1개월 전에 변경되는 약관을 금융거래정보 입력화면 및 회사의 홈페이지(‘ xetemplate’를 말합니다. 이하에서 같습니다)에 게시함으로써 이용자에게 공지합니다.

                        제4조 (거래내용의 확인)
                        ① 회사는 ‘ XEtemplate’의 ’구매내역’ 조회 화면을 통하여 이용자의 거래내용을 확인할 수 있도록 하며, 이용자의 요청이 있는 경우에는 요청을 받은 날로부터 2주 이내에 모사전송, 우편 또는 직접 교부의 방법으로 거래내용에 관한 서면을 교부합니다.

                        ② 제1항의 대상이 되는 거래내용 중 대상기간이 5년인 것은 다음 각호와 같습니다.

                        거래의 종류 및 금액
                        거래상대방을 나타내는 정보
                        거래일자
                        전자적 장치의 종류 및 전자적 장치를 식별할 수 있는 정보
                        해당 전자금융거래와 관련한 전자적 장치의 접속기록
                        ③ 제1항의 대상이 되는 거래내용 중 대상기간이 1년인 것은 다음 각호와 같습니다.

                        건당 거래금액이 1만원 이하인 소액 전자금융거래에 관한 기록
                        전자지급수단 이용시 거래승인에 관한 기록 3. 이용자의 오류정정 요구사실 및 처리결과에 관한 사항
                        ④ 이용자가 제1항에서 정한 서면교부를 요청하고자 할 경우 다음의 주소 및 전화번호로 요청할 수 있습니다.

                        주소: 서울시 송파구 문정동 가든파이브 라이프동 테크노관 8층 8125호 인플웍스
                        이메일 주소: inpleworks@gmail.com
                        전화번호: 070-8283-1029
                        제5조 (오류의 정정 등)
                        ① 이용자는 전자금융거래서비스를 이용함에 있어 오류가 있음을 안 때에는 회사에 대하여 그 정정을 요구할 수 있습니다.

                        ② 회사는 제1항의 규정에 따른 오류의 정정요구를 받은 때에는 이를 즉시 조사하여 처리한 후 정정요구를 받은 날부터 2주 이내에 그 결과를 이용자에게 알려 드립니다.

                        제6조 (전자금융거래 기록의 생성 및 보존)
                        ① 회사는 이용자가 이용한 전자금융거래의 내용을 추적, 검색하거나 그 내용에 오류가 발생한 경우에 이를 확인하거나 정정할 수 있는 기록을 생성하여 보존합니다.

                        ② 제1항의 규정에 따라 회사가 보존하여야 하는 기록의 종류 및 보존방법은 제4조 제2항, 제3항에서 정한 바에 따릅니다.

                        제7조 (거래지시의 철회 등)
                        이용자가 전자지급거래를 한 경우, 이용자는 지급의 효력이 발생하기 전까지 본 약관에서 정한 바에 따라 제4조 제4항 기재 담당자에게 전자문서의 전송(전자우편을 이용한 전송을 포함합니다)에 의한 방법으로 거래지시를 철회할 수 있습니다. 각 서비스별 거래지시 철회의 효력 발생시기는 본 약관 제15조에서 정하는 바와 같습니다.

                        제8조 (전자금융거래정보의 제공금지)
                        회사는 전자금융거래서비스를 제공함에 있어서 취득한 이용자의 인적사항, 이용자의 계좌, 접근매체 및 전자금융거래의 내용과 실적에 관한 정보 또는 자료를 법령에 의하거나 이용자의 동의를 얻지 아니하고 제3자에게 제공, 누설하거나 업무상 목적 외에 사용하지 아니합니다.

                        제9조 (회사의 책임)
                        ① 회사는 접근매체의 위조나 변조로 발생한 사고(단, 회사가 접근매체의 발급 주체이거나 사용, 관리 주체인 경우), 계약체결 또는 거래지시의 전자적 전송이나 처리과정에서 발생한 사고로 인하여 이용자에게 손해가 발생한 경우에는 그 손해를 배상할 책임을 집니다.

                        ② 회사는 제1항에도 불구하고 다음 각호의 경우에는 이용자에 대하여 손해배상책임을 지지 않습니다.

                        이용자가 접근매체를 제3자에게 대여하거나 사용을 위임하거나 양도 또는 담보 목적으로 제공하거나, 제3자가 권한없이 이용자의 접근매체를 이용하여 전자금융거래를 할 수 있음을 알았거나 알 수 있었음에도 불구하고 이용자가 자신의 접근매체를 누설 또는 노출하거나 방치한 경우
                        법인(’중소기업기본법’ 제2조 제2항에 의한 소기업을 제외한다)인 이용자에게 손해가 발생한 경우로서 회사가 사고를 방지하기 위하여 보안절차를 수립하고 이를 철저히 준수하는 등 합리적으로 요구되는 충분한 주의의무를 다한 경우
                        ③ 회사는 이용자로부터의 거래지시가 있음에도 불구하고 천재지변, 회사의 귀책사유가 없는 정전, 화재, 통신장애 기타의 불가항력적인 사유로 처리 불가능하거나 지연된 경우로서 이용자에게 처리 불가능 또는 지연 사유를 통지한 경우(금융기관 또는 결제수단 발행업체나 통신판매업자가 통지한 경우를 포함합니다)에는 이용자에 대하여 이로 인한 책임을 지지 아니합니다.

                        ④ 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체의 사유가 발생하여 전자금융서비스의 제공을 일시적으로 중단할 경우에는 회사의 홈페이지를 통하여 이용자에게 중단 일정 및 중단 사유를 사전에 공지합니다.

                        본 약관은 2011년 10월 1일부터 시행합니다.
                    </div>
                </div>
            </div>

        </div>
    </form>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { mapActions, mapGetters } from 'vuex'

const userStore = 'userStore'

export default {
    name: 'LoginWidget',
    data() {
        return {
            LOGIN_ALERT: {},
            USER_ID: '',
            USER_PW: '',

            faAngleDown
        }
    },
    computed: {
        ...mapGetters(userStore, [
            'GET_ALERT', 'UPDATE_ALERT'
        ])
    },
    methods: {
        ...mapActions(userStore, [
            'USER_ALERT','USER_LOGIN'
        ]),
        Login : function(){
            const payload = {
                USER_ID: this.USER_ID,
                USER_PW: this.USER_PW
            }

            if(!payload.USER_ID){
                this.LoginFail('There is no user ID');
                return
            }else if(!payload.USER_PW){
                this.LoginFail('There is no user PW');
                return
            }

            this.USER_LOGIN(payload).then((req) => {
                if(req.data.status == 'fail'){
                    this.LoginFail(req.data.message);
                }else if(req.data.status == 'success'){
                    this.$router.push({ path: '/' })
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        LoginFail: function(message){
            this.USER_ALERT(message);
            this.LOGIN_ALERT = this.UPDATE_ALERT;
            console.log('fail');

            window.setTimeout(() => {
                this.LOGIN_ALERT.ERROR = false;
			}, 300);
        },
        created(){
            this.LOGIN_ALERT = this.GET_ALERT;
        }
    }
}
</script>

<style lang="scss" scoped>

    form {
        & {
            padding: 70px 50px;
            text-align: left;
            width: 100%;
            height: auto;
        }

        & > .title {
            & > h1 {
                & {
                    font-size: #{$font-size + 10};
                    font-weight: bold;
                    color: #ccc;
                    letter-spacing: 3px;
                }
            }
        }
        
        & > .form {
            & {
                width: 100%;
                padding-top: 30px;
                display: block;
                position: relative;
                @include transition(.2s all);
            }

            & > .agree {
                & {
                    width: 100%;
                    height: auto;
                }

                & > div {
                    & > .nav {
                        & {
                            width: 100%;
                            height: 40px;
                            background-color: #f1f1f1;
                            border: 1px solid #ccc;
                        }

                        & > .title {
                            & {
                                width: auto;
                                height: 100%;
                            }

                            & > h1 {
                                & {
                                    text-align: left;
                                    line-height: 38px;
                                    color: $font-color;
                                    font-size: #{$font-size};
                                    font-weight: bold;
                                    padding-left: 10px;
                                }
                            }
                        }

                        & > button {
                            & {
                                background: none;
                                outline: none;
                                border: none;
                                margin: 0;
                                padding: 0;
                                width: 38px;
                                height: auto;
                                cursor: pointer;
                                font-size: 0;
                                position: relative;
                                border-left: 1px solid #ccc;
                                background-color: #fff;
                                float: right;
                            }

                            &:after {
                                content: " ";
                                display: block;
                                padding-bottom: 100%;
                            }

                            & > i {
                                & {
                                    position: absolute;
                                    font-size: #{$font-size + 2};
                                    color: #999;
                                    left: 50%; top: 50%;
                                    @include transform(translate(-50%, -50%));
                                }
                            }
                        }
                    }

                    & > .post {
                        & {
                            width: 100%;
                            height: 300px;
                            background-color: #fff;;
                            overflow: hidden;
                            padding: 15px;
                            position: relative;
                            border-left: 1px solid #ccc;
                            border-bottom: 1px solid #ccc;
                            border-right: 1px solid #ccc;
                        }
                    }
                }
            }

            .input {
                & {
                    width: 100%;
                    height: auto;
                    max-width: 1200px;
                    margin: 0 auto 20px auto;
                }

                &:last-child {
                    margin: 0 auto 0 auto;
                }

                & > label {
                    display: block;
                    font-size: #{$font-size};
                    color: $bg-black-light;
                    line-height:1.5;
                    padding-bottom:5px;
                }

                & > div {
                    & {
                        border: 1px solid $bg-gray;
                        border-radius: 5px;
                        overflow: hidden;
                        @include transition(.2s all);
                    }

                    & > ::placeholder {
                        color: $bg-light-bold;
                        font-size: #{$font-size - 2};
                    }
                }

            }

            .checkbox {
                & {
                    width: 100%;
                    height: auto;
                    max-width: 500px;
                    margin: 0 auto 5px auto;
                }

                & > label {
                    & {
                        cursor: pointer;
                        display: block;
                        vertical-align: middle;
                    }

                    & > p {
                        display: inline-block;
                        padding-left: 7px;
                        color: $font-color;
                        font-weight: bold;
                        font-size: #{$font-size};
                        vertical-align: middle;
                    }

                    & > i {
                        font-size: #{$font-size - 2};
                        display: block;
                        font-style: normal;
                    }
                }
            }

            .submit {
                & {
                    margin-top:30px;
                }

                & > a {
                    & {
                        display: block;
                        margin-top: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        color: $bg-blue;
                        text-align: right;
                        @include transition(.2s all);
                    }

                    &:hover {
                        & {
                            color: $bg-blue-bold;
                            text-decoration: underline;
                            @include transition(.2s all);
                        }
                    }
                }
            }

            .alert {
                & {
                    @include transition(.2s all);
                    color: #e84f4f;
                    font-size: #{$font-size - 2};
                    opacity:0;
                }

                & > p {
                    padding: 7px 0px 0px 5px;
                }
            }

            .line {
                & {
                    width: 100%;
                    height: 1px;
                    position: relative;
                    background-color: $bg-gray;
                    margin-top:50px;
                    text-align: center;
                }

                & > p {
                    font-size: $font-size;
                    background-color: #fff;
                    padding: 0 30px;
                    display: inline-block;
                    position: relative;
                    top: -8px;
                }

            }
        }
    }

    .form-input {
        & {
            width: 100%;
            height: 40px;
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

    .form-checkbox {
        & {
            display: inline-block;
            vertical-align: middle;
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
                width: 15px;
                height: 15px;
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

    .form-submit {
        & {
            width: 100%;
            height: 45px;
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
                font-size: #{$font-size - 2};
                cursor: pointer;
                outline: none;
                @include box-sizing(border-box);
            }
        }

    }

    .input.active {
        .form-input {
            @include transition(.2s all);
            border: 1px solid #e84f4f;
        }
    }

    .alert.active {
        @include transition(.2s all);
        opacity: 1;
    }

    .form.active {
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

</style>