import { initializeApp } from 'firebase/app'
import { child, getDatabase, off, onValue, push, ref, set, update } from 'firebase/database'
import { BehaviorSubject, Observable } from 'rxjs'
import { WalletBalancesType } from '../types/walletBalanceType'

export class FirebaseService {
  private static _instance: FirebaseService
  $balances: BehaviorSubject<Array<WalletBalancesType>> = new BehaviorSubject<any>([])
  private accountId: string

  constructor() {
    this.accountId = this.getAccountId()
  }

  private getAccountId() {
    return '243d4551-7b49-4e12-af85-2ae442f4438c'
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new FirebaseService()

    return this._instance
  }

  async setBalances(balances: Array<WalletBalancesType>) {
    this.$balances.next(balances)
  }

  async getBalances(): Promise<Observable<Array<WalletBalancesType>>> {
    return this.$balances.asObservable()
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
        assetCode: 'USD',
        balance: 451110.22,
        blockedBalance: 0,
      },
      usdt: {
        accountId: '243d4551-7b49-4e12-af85-2ae442f4438c',
        assetCode: 'USDT',
        balance: 1110.2,
        blockedBalance: 0,
      },
      eth: {
        accountId: '243d4551-7b49-4e12-af85-2ae442f4438c',
        assetCode: 'ETH',
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

  async listenFirebaseChanges() {
    const db = await FirebaseService.initFirebase()
    const userbalances = ref(db, '243d4551-7b49-4e12-af85-2ae442f4438c')

    onValue(userbalances, async snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const balances: Array<WalletBalancesType> = []
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            console.log('key, data[key]')
            console.log(key, data[key])
            balances.push(data[key])
          }
        }

        this.setBalances(balances)
      } else {
        console.log('no existe el snapshot')
        this.setBalances([])
      }
    })
  }

  static async stopListenFirebase() {
    const db = await FirebaseService.initFirebase()
    off(ref(db, '243d4551-7b49-4e12-af85-2ae442f4438c'))
  }
}
