import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig1 = {
//   apiKey: "AIzaSyBbwiKfZJKP_9zSK6o0cSlp6MdboYGnMYo",
//   authDomain: "shyama-dc9e9.firebaseapp.com",
//   projectId: "shyama-dc9e9",
//   storageBucket: "shyama-dc9e9.appspot.com",
//   messagingSenderId: "650601064410",
//   appId: "1:650601064410:web:57a249ac13e83ca50d82e3",
//   measurementId: "G-5FLTGBHQ3F"
// };
// const app1 = initializeApp(firebaseConfig1);
// export const auth1 = getAuth(app1);


// auth 2
const firebaseConfig2 = {
  apiKey: "AIzaSyBx4V02oWlzwBNTLfPGPKGT5a-keDrgLAQ",
  authDomain: "shyama-ceramics-1.firebaseapp.com",
  projectId: "shyama-ceramics-1",
  storageBucket: "shyama-ceramics-1.appspot.com",
  messagingSenderId: "289655404167",
  appId: "1:289655404167:web:02d7a3c76099cf8786aa22"
};
const app2 = initializeApp(firebaseConfig2);
export const auth2 = getAuth(app2);





// auth 3
const firebaseConfig3 = {
  apiKey: "AIzaSyDNKiGXyWP7q4UFgcTKrdJq41PSRrgloT8",
  authDomain: "shyama-ceramics-2.firebaseapp.com",
  projectId: "shyama-ceramics-2",
  storageBucket: "shyama-ceramics-2.appspot.com",
  messagingSenderId: "243595385769",
  appId: "1:243595385769:web:33e57f06e95fe8062902b8"
};

const app3 = initializeApp(firebaseConfig3);
export const auth3 = getAuth(app3);

