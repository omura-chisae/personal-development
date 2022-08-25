import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Header } from "./props/organisms/Heder";
import db from "./firebase";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

import "./style.css";

import { Home } from "./props/pages/Home";
import { Log } from "./props/pages/Log";
import { Page404 } from "./props/pages/Page404";
import { LogDetailModal } from "./props/pages/LogDetailModal";

function App() {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    // データベースからデータを取得する
    const postData = collection(db, "posts");
    console.log(postData);
    getDocs(postData).then((snapShot) => {
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });

    // リアルタイムで取得
    onSnapshot(postData, (post) => {
      console.log("リアルタイム");
      setPosts(post.docs.map((doc: any) => ({ ...doc.data() })));
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {posts.map((post: any) => (
          <div key={post.timestamp}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </div>
        ))}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          {/* <Route path="/modal" element={<LogDetailModal />} /> */}

          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
