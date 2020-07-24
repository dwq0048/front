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

const SET_SCRIPT = {
    addClass: (payload) => {
        const array = payload.el.className.split(" ");

        if (array.indexOf(payload.class) == -1) {
            payload.el.className += " " + payload.class;
        }else {
            payload.el.className += payload.class;
        }
    },
    removeClass: (payload) => {
        const check = new RegExp("(\\s|^)" + payload.class + "(\\s|$)");
        payload.el.className = payload.el.className.replace(check, " ").trim();
        const array = payload.el.className.split(" ");

        if (array.indexOf(payload.class) == -1) {
            payload.el.className = payload.el.className.replace(check, "").trim();
        }
    }
}

const SET_BOARD = {
    category: (payload) => {
        switch(payload){
            case 'notice':
                return '공지사항';
            case 'free':
                return '자유게시판';
            case 'photo':
                return 'VR 포토';
            default:
                return 'NULL';
        }
    },
    encodeBase64ImageFile: function(image) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = (event) => {
                resolve(event.target.result)
            }
            reader.onerror = (error) => {
                reject(error)
            }
        })
    }
}

export { SET_TIME, SET_BOARD, SET_SCRIPT }
