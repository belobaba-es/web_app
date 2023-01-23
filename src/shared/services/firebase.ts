import { initializeApp } from 'firebase/app'
import { getDatabase, off, onValue, ref } from 'firebase/database'
import { BehaviorSubject, Observable } from 'rxjs'
import { WalletBalancesType } from '../types/walletBalanceType'

export class FirebaseService {
  private static _instance: FirebaseService
  $balances: BehaviorSubject<Array<WalletBalancesType>> = new BehaviorSubject<any>([])
  private accountId: string

  constructor(accountId: string) {
    this.accountId = accountId
  }

  static instance(accountId: string) {
    if (this._instance) {
      return this._instance
    }

    this._instance = new FirebaseService(accountId)

    return this._instance
  }

  private async setBalances(balances: Array<WalletBalancesType>) {
    this.$balances.next(balances)
  }

  async getBalances(): Promise<Observable<Array<WalletBalancesType>>> {
    return this.$balances.asObservable()
  }

  static async initFirebase() {
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    }

    const app = await initializeApp(config)

    return await getDatabase(app)
  }

  async listenFirebaseChanges() {
    const db = await FirebaseService.initFirebase()
    const userbalances = ref(db, this.accountId)

    onValue(userbalances, async snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const balances: Array<WalletBalancesType> = []
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            balances.push(data[key])
          }
        }

        await this.setBalances(balances)
      } else {
        console.log('no existe el snapshot')
        await this.setBalances([])
      }
    })
  }

  async stopListenFirebase() {
    const db = await FirebaseService.initFirebase()
    off(ref(db, this.accountId))
  }
}
