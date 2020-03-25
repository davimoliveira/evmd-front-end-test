export default function user(state = {id: "-1", users: [], chosen: ''}, action) {
    switch (action.type) {
        case 'AddUser':
            var users = state.users;
            Array.prototype.push.apply(users, action.users);
            return {
                ...state,
                id: action.users[action.users.length-1]._id,
                users: users,
            };
        case 'ChooseUser':
            return {
                ...state,
                chosen: action.index,
            };
        case 'FavoriteUser':
            var users = state.users;
            console.log(users[state.chosen].favorite);
            if(users[state.chosen].favorite == 1){
                users[state.chosen].favorite = 0;
            }else{
                users[state.chosen].favorite = 1;
            }
            return {
                ...state,
                users: users
            };
        default:
            return state;
    }
}