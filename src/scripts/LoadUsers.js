
import db from '../services/connection';

var x = false;

function GetUsers(query){
    return new Promise((resolve, reject)=>{
    db.transaction( tx => {
        tx.executeSql(
            `SELECT * FROM users
            WHERE name > `+query+`
            ORDER BY name
            LIMIT 10`,
            [],
            (_, {rows:{_array}})=>{
                resolve(_array);
            }); 
    });} )
}

function SendIt(users, dispatch){
    dispatch({
        type: 'AddUser',
        users: users
    }); 
}

export default async (id, dispatch, flag) =>{
    if(x && flag){
        return;
    }
    x = true;
    var query = `(SELECT name FROM users where _id ='`+id+`')`;
    if(id==='-1'){
       query = `'A'`;
    }
    
    var users = await GetUsers(query);
    SendIt(users, dispatch);
    
}