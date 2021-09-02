function addUser(uid, user, usersRef) {
    return new Promise( (resolve, reject) => {
        const fullUser = {...user}
        fullUser.qaPairs = []
        fullUser.skills = {}
        usersRef
            .doc(uid)
            .set(user)
            .then(() => {
                resolve()
            })
            .catch((error) => {
                reject(error)
            });
    })
}

function addUserIfNew(uid, user, usersRef) {
    return new Promise( (resolve, reject) => {
        usersRef
            .doc(uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    resolve(false)
                }
                else {
                    addUser(uid, user, usersRef)
                        .then(() => {
                            resolve(true)
                        })
                        .catch((error) => {
                            reject(error)
                        })
                }
            })
    })
    
}

export default {addUser, addUserIfNew}