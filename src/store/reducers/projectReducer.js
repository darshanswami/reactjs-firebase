const initState = {
    projects: [
        {id:1, title:'1',content:'content 1'},
        {id:2, title:'2',content:'content 2'}
    ]
}

const projectReducer = (state = initState, action) => {
    switch (action.type){
        case 'ADD_PROJECT':
            console.log('Project created')
            // console.log(action.project)
            break;
        case 'ADD_PROJECT_ERROR':
            console.log('Create project error:', action.error)
            break;
        default:
            break;
    }
    return state;
}

export default projectReducer