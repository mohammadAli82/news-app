// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import {
// //   addDoc,
// //   collection,
// //   getDocs,
// //   deleteDoc,
// //   where,
// //   query,
// // } from "firebase/firestore";
// // import { db } from "../firebase";
// // import styled from "styled-components";
// // const Button = styled.button`
// //   margin-top: 10px;
// //   background-color: transparent;
// //   border: 1px solid #ccc;
// //   padding: 8px 16px;
// //   border-radius: 20px;
// //   cursor: pointer;
// //   transition: background-color 0.3s ease;

// //   &:hover {
// //     background-color: black;
// //     color: white; /* If you want to change text color on hover */
// //   }
// // `;

// // function FetchData({ cat }) {
// //   const [likedNews, setLikedNews] = useState([]);
// //   const [data, setData] = useState("");

// //   // ---------------------------------
// //   const fetchData = async () => {
// //     await axios
// //       .get(
// //         cat
// //           ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&category=business&apiKey=804b5ac5eb154a81ad4dc4b10ada6b7f`
// //           : "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=804b5ac5eb154a81ad4dc4b10ada6b7f"
// //       )
// //       .then((res) => setData(res.data.articles));
// //   };
// //   useEffect(() => {
// //     fetchData();
// //   }, [cat]);
// //   // -------------------------------------
// //   useEffect(() => {
// //     // Fetch liked news from Firestore
// //     const fetchLikedNews = async () => {
// //       try {
// //         const querySnapshot = await getDocs(collection(db, "likedNews"));
// //         const likedNewsList = querySnapshot.docs.map((doc) => doc.data().title);
// //         setLikedNews(likedNewsList);
// //         localStorage.setItem("likedNews", JSON.stringify(likedNewsList)); // Save liked news to localStorage
// //       } catch (error) {
// //         console.error("Error fetching liked news: ", error);
// //       }
// //     };
// //     fetchLikedNews();
// //   }, []);

// //   // -------------------------------------------------

// //   const handleLike = async (title) => {
// //     try {
// //       const isLiked = likedNews.includes(title);
// //       if (isLiked) {
// //         // If already liked, remove from Firestore
// //         const q = query(
// //           collection(db, "likedNews"),
// //           where("title", "==", title)
// //         );
// //         const querySnapshot = await getDocs(q);
// //         querySnapshot.forEach(async (doc) => {
// //           await deleteDoc(doc.ref);
// //         });
// //         const updatedLikedNews = likedNews.filter((news) => news !== title);
// //         setLikedNews(updatedLikedNews);
// //         localStorage.setItem("likedNews", JSON.stringify(updatedLikedNews)); // Update liked news in localStorage
// //       } else {
// //         // If not liked, add to Firestore
// //         await addDoc(collection(db, "likedNews"), {
// //           title: title,
// //           likedOn: new Date(),
// //         });
// //         const updatedLikedNews = [...likedNews, title];
// //         setLikedNews(updatedLikedNews);
// //         localStorage.setItem("likedNews", JSON.stringify(updatedLikedNews)); // Update liked news in localStorage
// //       }
// //     } catch (error) {
// //       console.error("Error toggling like: ", error);
// //       alert("Error toggling like. Please try again later");
// //     }
// //   };
// //   return (
// //     <div className="container my-4">
// //       <h3 style={{ textAlign: "center" }}>
// //         <u>TOP HEADLINES</u>
// //       </h3>
// //       <div
// //         className="container d-flex justify-content-center align-items-center flex-column my-3 "
// //         style={{ minHeight: "100vh" }}
// //       >
// //         {data
// //           ? data.map((items, index) => (
// //               <div
// //                 className="container my-3 p-3"
// //                 style={{
// //                   width: "600px",
// //                   boxShadow: "2px 2px 10px silver",
// //                   borderRadius: "10px",
// //                 }}
// //               >
// //                 <h5 className="my-1">{items.title}</h5>
// //                 <div className="d-flex justify-content-center align-items-center">
// //                   <img
// //                     src={items.urlToImage}
// //                     alt="not found"
// //                     className="img-fluid"
// //                     style={{
// //                       width: "100%",
// //                       height: "300px",
// //                       objectFit: "cover",
// //                     }}
// //                   />
// //                 </div>
// //                 <p className="my-1">{items.content}</p>
// //                 <Link to={items.url} target={"_blank"}>
// //                   View More
// //                 </Link>
// //                 <Button
// //                   liked={likedNews.includes(items.title)}
// //                   onClick={() => handleLike(items.title)}
// //                 >
// //                   {likedNews.includes(items.title) ? "Dislike" : "Like"}
// //                 </Button>
// //               </div>
// //             ))
// //           : "Load....."}
// //       </div>
// //     </div>
// //   );
// // }

// export default FetchData;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
const API_KEY = '804b5ac5eb154a81ad4dc4b10ada6b7f';

const Button = styled.button`
  margin-top: 10px;
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
  }
`;

function FetchData({ cat }) {
  const [userLikes, setLikedNews] = useState([]);
  const [data, setData] = useState([]);

  // Fetch news data from API
  const fetchData = async () => {
    try {
      const config = {
        headers: {
          'X-Api-Key': API_KEY // Add the API key to the headers
        }
      };
  
      const response = await axios.get(
        cat
          ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}`
          : "https://newsapi.org/v2/top-headlines?country=in&category=business",
        config // Pass the headers config object here
      );
  
      setData(response.data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [cat]);

  useEffect(() => {
    const fetchLikedNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userLikes"));
        const likedNewsList = querySnapshot.docs.map((doc) => doc.data().title);
        setLikedNews(likedNewsList);
        localStorage.setItem("userLikes", JSON.stringify(likedNewsList));
      } catch (error) {
        console.error("Error fetching liked news: ", error);
      }
    };
    fetchLikedNews();
  }, []);

  const handleLike = async (title) => {
    try {
      const isLiked = userLikes.includes(title);
      if (isLiked) {
        const q = query(
          collection(db, "userLikes"),
          where("title", "==", title)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        const updatedLikedNews = userLikes.filter((news) => news !== title);
        setLikedNews(updatedLikedNews);
        localStorage.setItem("userLikes", JSON.stringify(updatedLikedNews));
      } else {
        await addDoc(collection(db, "userLikes"), {
          title: title,
          likedOn: new Date(),
        });
        const updatedLikedNews = [...userLikes, title];
        setLikedNews(updatedLikedNews);
        localStorage.setItem("userLikes", JSON.stringify(updatedLikedNews));
      }
    } catch (error) {
      console.error("Error toggling like: ", error);
      alert("Error toggling like. Please try again later");
    }
  };

  return (
    <div className="container my-4">
      <h3 style={{ textAlign: "center" }}>
        <u>TOP HEADLINES</u>
      </h3>
      <div
        className="container d-flex justify-content-center align-items-center flex-column my-3"
        style={{ minHeight: "100vh" }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="container my-3 p-3"
            style={{
              width: "600px",
              boxShadow: "2px 2px 10px silver",
              borderRadius: "10px",
            }}
          >
            <h5 className="my-1">{item.title}</h5>
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={item.urlToImage}
                alt="not found"
                className="img-fluid"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
            </div>
            <p className="my-1">{item.content}</p>
            <Link to={item.url} target="_blank">
              View More
            </Link>
            <Button
              liked={userLikes.includes(item.title)}
              onClick={() => handleLike(item.title)}
            >
              {userLikes.includes(item.title) ? "Dislike" : "Like"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchData;

// export default FetchData;
