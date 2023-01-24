import { initializeApp } from 'firebase/app'
import { getDatabase, off, onValue, ref } from 'firebase/database'
import { BehaviorSubject, Observable } from 'rxjs'
import { BalanceWallet } from "../../views/deposit/types/asset.interface";
import {AssetsService} from "../../views/deposit/services/assets";

export class FirebaseService {
  private static _instance: FirebaseService
  $balances: BehaviorSubject<BalanceWallet[]> = new BehaviorSubject<any>([])
  private readonly accountId: string

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

  private async setBalances(balances: BalanceWallet[]) {
    this.$balances.next(balances)
  }

  async getBalances(): Promise<Observable<BalanceWallet[]>> {
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

    return getDatabase(app);
  }

  async listenFirebaseChanges() {
    const db = await FirebaseService.initFirebase()
    const userBalances = ref(db, this.accountId)

    onValue(userBalances, async snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val() as BalanceWallet[]
        await this.setBalances(data)
        return
      }

      const data = await AssetsService.instance().getBalanceWallets()

      await this.setBalances(data)

    })
  }

  async stopListenFirebase() {
    const db = await FirebaseService.initFirebase()
    off(ref(db, this.accountId))
  }
}
