import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import config from '../../config';

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.auth.useEmulator("http://localhost:9099")
        this.db = app.database();
        this.db.useEmulator("localhost", 9000);
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