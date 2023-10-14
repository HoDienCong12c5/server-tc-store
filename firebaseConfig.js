const admin = require('firebase-admin')
 const serviceAccounts = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccounts),
});
const fireStore = admin.firestore();
module.exports={
    fireStore
}