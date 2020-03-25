import db from '../services/connection';



function UpdateUser(favorito, id){
    db.transaction( tx => {
        tx.executeSql(
            `UPDATE users SET favorite=? WHERE _id=?`,
            [favorito, id], (tx, results) =>{
                if(results.rowsAffected>0){
                    console.log(results);
                  }else{
                    console.log('Updation Failed');
                  }
            }); 
    });
}

function SendIt(dispatch){
    dispatch({
        type: 'FavoriteUser'
    }); 
}

export default async (valor, id, dispatch) =>{
    var favorito = 0;
    if(valor){
        favorito = 1;
    }
    var users = await UpdateUser(favorito, id);
    SendIt(dispatch);
    
}