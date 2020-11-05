import firebase from "firebase/app";

const firebaseConfig = {
        apiKey: "AIzaSyCRaqp933TlaS4LDyX-huyffWHA7i9CPEE",
        authDomain: "tenedores-4c1fe.firebaseapp.com",
        databaseURL: "https://tenedores-4c1fe.firebaseio.com",
        projectId: "tenedores-4c1fe",
        storageBucket: "tenedores-4c1fe.appspot.com",
        messagingSenderId: "304714452567",
        appId: "1:304714452567:web:5a9c936d70443abb781d12"
      };

      export const firebaseApp = firebase.initializeApp(firebaseConfig);

      