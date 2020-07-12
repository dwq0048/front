const SET_TIME = function(payload) {
    const today = new Date();
    const timeValue = new Date(payload);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

const SET_BOARD = {
    category: (payload) => {
        switch(payload){
            case 'notice':
                return '공지사항';
                break;
            case 'free':
                return '자유게시판';
                break;
            default:
                return 'NULL';
        }
    }
}

export { SET_TIME, SET_BOARD }
