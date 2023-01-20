import { initializeApp } from 'firebase/app'
import { child, getDatabase, off, onValue, push, ref, set, update } from 'firebase/database'

export class FirebaseService {
  private static _instance: FirebaseService

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new FirebaseService()

    return this._instance
  }

  static async initFirebase() {
    console.log('** initFirebase')
    const config = {
      apiKey: 'AIzaSyCN4sb1POWZMd-z4aAMpIqyyMIsPzLc-q0',
      authDomain: 'noba-dev-360623.firebaseapp.com',
      databaseURL: 'https://noba-dev-360623-default-rtdb.firebaseio.com',
      projectId: 'noba-dev-360623',
      storageBucket: 'noba-dev-360623.appspot.com',
      messagingSenderId: '970990734888',
      appId: '1:970990734888:web:38f2c61e7e9d60c60f2f1d',
      measurementId: 'G-XZGG16P7C2',
    }

    const app = await initializeApp(config)

    return await getDatabase(app)
  }

  static async testWriteIntoFirebase() {
    const db = await FirebaseService.initFirebase()
    // await set(ref(db, `243d4551-7b49-4e12-af85-2ae442f4438c**eth`), {
    //   accountId: 'cbbecf6b-3ede-4459-a283-c64d1276f136',
    //   assetCode: 'ADA',
    //   balance: 0.1,
    //   blockedBalance: 0,
    // })
    //

    await set(ref(db, 'cbbecf6b-3ede-4459-a283-c64d1276f136'), {
      usd: {
        accountId: 'cbbecf6b-3ede-4459-a283-c64d1276f136',
        assetCode: 'USD',
        balance: 234.22,
        blockedBalance: 0,
      },
    })

    await set(ref(db, '243d4551-7b49-4e12-af85-2ae442f4438c'), {
      usd: {
        accountId: '243d4551-7b49-4e12-af85-2ae442f4438c',
        assetCode: 'ADA',
        balance: 451110.22,
        blockedBalance: 0,
      },
      usdt: {
        accountId: '243d4551-7b49-4e12-af85-2ae442f4438c',
        assetCode: 'ADA',
        balance: 1110.2,
        blockedBalance: 0,
      },
      eth: {
        accountId: '243d4551-7b49-4e12-af85-2ae442f4438c',
        assetCode: 'ADA',
        balance: 0.11,
        blockedBalance: 0,
      },
    })

    update(ref(db, '243d4551-7b49-4e12-af85-2ae442f4438c'), {
      eth: {
        accountId: '243d4551-7b49-4e12-af85-2ae442f4438c',
        assetCode: 'ADA',
        balance: 0.777,
        blockedBalance: 0,
      },
    })

    //
    // await set(ref(db, 'balances' + '243d4551-7b49-4e12-af85-2ae442f4438c'), {
    //   eth: {
    //     accountId: 'cbbecf6b-3ede-4459-a283-c64d1276f136',
    //     assetCode: 'ADA',
    //     balance: 0.1,
    //     blockedBalance: 0,
    //   },
    // })
    //
    // await set(ref(db, 'balances'), {
    //   'cbbecf6b-3ede-4459-a283-c64d1276f136': {
    //     eth: {
    //       accountId: 'cbbecf6b-3ede-4459-a283-c64d1276f136',
    //       assetCode: 'ADA',
    //       balance: 0.1,
    //       blockedBalance: 0,
    //     },
    //   },
    // })

    // blogs

    // A post entry.
    const uid = new Date()
    const postData = {
      author: 'username',
      uid,
      body: 'body',
      title: 'title',
      starCount: 0,
      authorPic: 'picture',
    }

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates: any = {}
    updates['/posts/' + newPostKey] = postData
    updates['/user-posts/' + uid + '/' + newPostKey] = postData

    update(ref(db), updates)
  }

  static async listenFirebaseChanges() {
    console.log('listenFirebaseChanges')
    const db = await FirebaseService.initFirebase()

    // const starCountRef = ref(db, 'posts/' + postId + '/starCount')
    // const starCountRef = ref(db, '243d4551-7b49-4e12-af85-2ae442f4438c')
    const starCountRef = ref(db, '243d4551-7b49-4e12-af85-2ae442f4438c')
    onValue(starCountRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        console.log('## data', data)
        console.log('## data usd', data.usd.balance)
      } else {
        console.log(' no existe el snapshot')
      }
    })
  }

  static async stopListenFirebase() {
    const db = await FirebaseService.initFirebase()
    off(ref(db, '243d4551-7b49-4e12-af85-2ae442f4438c'))
  }
}
