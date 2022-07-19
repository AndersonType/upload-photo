import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload.js'

const firebaseConfig = {
  apiKey: "AIzaSyAKceSwtVUi10X6ZNYLTxbaXdFDdxMtEec",
  authDomain: "fe-upload-db8ba.firebaseapp.com",
  projectId: "fe-upload-db8ba",
  storageBucket: "fe-upload-db8ba.appspot.com",
  messagingSenderId: "836852500373",
  appId: "1:836852500373:web:5c007d711aa395de5f989c"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
 
const storage = firebase.storage()


upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const ref = storage.ref(`images/${file.name}`)
      const task = ref.put(file)

      task.on('state_changed', snapshot => {
        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
        const block = blocks[index].querySelector('.preview-info-progress')
        block.textContend = percentage
        block.style.width = percentage
      }, error => {
        console.log(error)
      }, () => {
        task.snapshot.ref.getDownloadURL().then(url => {
          console.log('Download URL', url)
        })
      })
    })
  }
})