// import { useState } from "react";
// import { auth, googleProvider } from "../config/firfebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth"; // because we select authentication with email abd password we should import this in order to be eble to work with it

// // we also have to import googleProvider in order to get access
// // there are a couple of metheds to sign in to google like a popup notification, or aopening up a new tab

// // for logging out your google acount you should use the signOut method

// export const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   console.log(auth?.currentUser?.photoURL);

//   // now we get access to the users email, so we can basically see who logged in
//   // photoUrl allows us to get access to the profilephoto of the email owner, but it's only available when you're using the googleAuth system
//   const signIn = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
//       <input
//         placeholder="password"
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={signIn}>Sign In</button>
//       <button onClick={signInWithGoogle}>Sign In with google</button>
//       <button onClick={logout}>logged out</button>
//     </div>
//   );
// };







import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, browserPopupRedirectResolver } from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
      console.log("USER LOGGED IN:", result.user);
    } catch (err) {
      console.error("AUTH ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-lightBg dark:bg-darkBg transition-colors duration-300">

      <h1 className="text-xl font-semibold mb-6 text-lightText dark:text-darkText text-center">
        Please Sign In to continue browsing
      </h1>

      <div className="w-full max-w-md bg-white dark:bg-[#1b1b1b] shadow-[0_4px_15px_#9972da] p-8 rounded-2xl space-y-4 transition-all duration-300">

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-lightBg dark:bg-[#2c2c2c] text-lightText dark:text-darkText border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-lightBg dark:bg-[#2c2c2c] text-lightText dark:text-darkText border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        {/* Sign In Email */}
        <button
          onClick={signIn}
          className="w-full py-2 rounded-xl bg-primary text-white hover:bg-primaryLight shadow-md transition"
        >
          Sign In
        </button>

        {/* Google Sign In */}
        <button
          onClick={signInWithGoogle}
          className="w-full py-2 rounded-xl bg-google text-white hover:bg-googleHover shadow-md transition"
        >
          Sign In with Google
        </button>

      </div>
    </div>
  );
}













// import { useState } from "react";
// import { auth, googleProvider } from "../config/firebase";
// import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// export default function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const signInEmail = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, var(--tw-color-background), var(--tw-color-surface))" }}>
//       <div className="w-full max-w-md p-6 rounded-2xl shadow-card" style={{ background: "var(--tw-color-card)" }}>
//         <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--tw-color-heading)" }}>Please sign in to continue</h2>

//         <input className="w-full p-3 rounded-xl border mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//         <input className="w-full p-3 rounded-xl border mb-4" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

//         <button
//           onClick={signInEmail}
//           className="w-full py-3 rounded-xl font-medium mb-3"
//           style={{ background: "var(--tw-color-btn-login)", color: "#fff" }}
//         >
//           Create Account
//         </button>

//         <button
//           onClick={signInWithGoogle}
//           className="w-full py-3 rounded-xl font-medium mb-3 flex items-center justify-center gap-2"
//           style={{ background: "#fff", color: "var(--tw-color-heading)", border: "1px solid rgba(0,0,0,0.06)" }}
//         >
//           Sign in with Google
//         </button>
//         <p className="text-center text-sm text-muted">You must sign in to access the site</p>
//       </div>
//     </div>
//   );
// }







// import { useState, useEffect } from "react";
// import { auth, googleProvider } from "../config/firfebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithRedirect,
//   getRedirectResult,
//   signOut,
// } from "firebase/auth";

// export const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null);

//   // Handle the redirect result after coming back from Google
//   useEffect(() => {
//     getRedirectResult(auth)
//       .then((result) => {
//         if (result) {
//           setUser(result.user);
//           console.log("USER LOGGED IN:", result.user);
//         }
//       })
//       .catch((err) => console.error("Redirect login error:", err));
//   }, []);

//   const signIn = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await signInWithRedirect(auth, googleProvider);
//       // No need for further code — the redirect will handle login
//     } catch (err) {
//       console.error("Redirect error:", err);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>Logged in as: {user.email}</p>
//           <button onClick={logout}>Log Out</button>
//         </div>
//       ) : (
//         <>
//           <input
//             placeholder="email"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             placeholder="password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={signIn}>Sign In</button>
//           <button onClick={signInWithGoogle}>Sign In with Google</button>
//         </>
//       )}
//     </div>
//   );
// };
