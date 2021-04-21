import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import config from '../../config';

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();

        if (process.env.NODE_ENV === 'development') {
            this.auth.useEmulator(`http://localhost:${config.auth_emu_port}`)
            this.db.useEmulator("localhost", config.db_emu_port);
        }
    }


    doAllowSocialSignin = (type) => {
        var provider;
        switch (type) {
            case 'fb': 
                provider = new app.auth.FacebookAuthProvider()
                break
            default:
                provider = new app.auth.GoogleAuthProvider();
                break
        }
        provider.addScope('profile');
        provider.addScope('email');

        this.auth.signInWithPopup(provider)
        
            // .then(function (result) {
            // // This gives you a Google Access Token.
            // var token = result.credential.accessToken;
            // // The signed-in user info.
            // var user = result.user;

            // console.log(token, user);
        // });
    }


    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

}

export default Firebase;