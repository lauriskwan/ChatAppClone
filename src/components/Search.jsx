import React, { useState } from "react";
import avatar from "../image/IMG_0285.jpg";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (e) => {
    // check whether the chatroom (chats in firestore) exists, if not create new
    // create user chats
    const combineID =
      currentUser.uid > searchUser.uid
        ? currentUser.uid + searchUser.uid
        : searchUser.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineID));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combineID), { messages: [] });

        // create user chats for initiating user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineID + ".userInfo"]: {
            uid: searchUser.uid,
            displayName: searchUser.displayName,
            photoURL: searchUser.photoURL,
          },
          [combineID + ".date"]: serverTimestamp(),
        });

        // for receiving user
        await updateDoc(doc(db, "userChats", searchUser.uid), {
          [combineID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineID + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setSearchUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span>User not found</span>}
      {searchUser && (
        <div className="userChat" onClick={handleSelect}>
          <img src={searchUser.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{searchUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

// 29:07
