import { initializeApp } from '@firebase/app'
import { fetchConfig, getAll, getBoolean, getRemoteConfig } from '@firebase/remote-config'
import { RemoteConfig } from '@firebase/remote-config'
import { getValue } from '@firebase/remote-config'
import { FirebaseService } from './firebase'
import { onValue, ref } from '@firebase/database'

const initRemoteConfig = async (): Promise<RemoteConfig> => {
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

  const remoteConfig = getRemoteConfig(app)

  // remoteConfig.settings.minimumFetchIntervalMillis = 36000
  remoteConfig.settings.minimumFetchIntervalMillis = 300

  return remoteConfig
}

export const twoFactorAuthenticationIsActiveRemotely = async (): Promise<boolean> => {
  return new Promise(async resolve => {
    const db = await FirebaseService.initFirebase()
    const collection = ref(db, 'twoFactorAuthBELOBABA')

    onValue(collection, async snapshot => {
      if (snapshot.exists()) {

        resolve(snapshot.val() as boolean)
      } else {
        resolve(false)
      }
    })
  })
}
