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
    },
    optimizedResize: () => {
        (function() {
			var throttle = function(type, name, obj) {
				obj = obj || window;
				var running = false;
				var func = function() {
					if (running) { return; }
					running = true;
					requestAnimationFrame(function() {
						obj.dispatchEvent(new CustomEvent(name));
						running = false;
					});
				};
				obj.addEventListener(type, func);
			};

			throttle("resize", "optimizedResize");
		})();
    },
    getImageDimensions(file) {
        return new Promise (function (resolved, rejected) {
          var i = new Image()
          i.onload = function(){
            resolved({w: i.width, h: i.height})
          };
          i.src = file
        })
    },
    CalculationDate(date){
        const current = new Array();
        const time = new Date(date);
        current.push(time.getFullYear());
        current.push(time.getMonth() + 1);
        current.push(time.getDate());
        current.push(time.getHours());
        current.push(time.getMinutes());
        return current.join('');
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
    encodeBase64ImageFile: (image) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(image);
            
            reader.onload = (event) => { resolve(event.target.result) }
            reader.onerror = (error) => { reject(error) }
        })
    },
    BytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 MB';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) return bytes + ' ' + sizes[i];
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    },
    dataURLtoFile(dataurl, fileName) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], fileName, {type:mime});
    },
    FileListItems(files) {
        var b = new ClipboardEvent("").clipboardData || new DataTransfer()
        for (var i = 0, len = files.length; i<len; i++) b.items.add(files[i])
        return b.files
    }
}

export { SET_TIME, SET_BOARD, SET_SCRIPT }
