const board = (option) => {
    const array = [];  

    const main = {
        path: option.path,
        name: option.name,
        beforeEnter: option.beforeEnter,
        component: () => import( '@/views/board/default/index' ),
        props: {
            option: option.skin.main
        }
    }

    const view = {
        path: option.path+"/:id",
        name: option.name+"View",
        beforeEnter: option.beforeEnter,
        //component: () => import( '@/views/board/default/view' ),
        props: {
            option: option.skin.main
        }
    }

    const post = {
        path: option.path+"-post",
        name: option.name+"Post",
        beforeEnter: option.beforeEnter,
        component: () => import( '@/views/board/default/post' ),
        props: {
            option: option.skin.main
        }
    }

    array.push(main);
    array.push(view);
    array.push(post);

    return array;
}

export default board
