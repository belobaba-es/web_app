var functions = require('firebase-functions')

exports.testRTDBCHanges = functions.database.ref().onWrite((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = snapshot.val()
  functions.logger.log('testRTDBCHanges', context.params, original)
  const uppercase = original.toUpperCase()
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return snapshot.ref.parent.child('uppercase').set(uppercase)
})

exports.syncWallets = functions.firestore.document('wallets').onWrite((change, context) => {
  // Get the data from the Firestore document
  const data = change.after.data()
  functions.logger.log('syncWallets', data)
})

exports.syncWalletsByParam = functions.firestore.document('wallets/{documentId}').onWrite((change, context) => {
  // Get the data from the Firestore document
  const data = change.after.data()
  // Get the document ID
  const documentId = context.params.documentId
  functions.logger.log('syncWalletsByParam', documentId, data)

  // Reference the Realtime Database location
  const ref = admin.database().ref(`yourDatabase/${documentId}`)
  // Save the data to the Realtime Database
  return ref.set(data)
})
