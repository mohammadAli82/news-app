import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { addDoc, deleteDoc } from "firebase/firestore";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Popup from "../Pages/Popup";

function FetchData({ cat }) {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const [likedNews, setLikedNews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let apiUrl = "https://news-express-api.onrender.com/";
        if (cat) {
          apiUrl += cat;
        }
        const response = await axios.get(apiUrl);
        setArticle(response.data[0].articles || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cat]);

  useEffect(() => {
    const fetchLikedNews = async () => {
      try {
        const q = query(
          collection(db, "likes"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const likedNewsList = querySnapshot.docs.map((doc) => doc.data().title);
        setLikedNews(likedNewsList);
      } catch (error) {
        console.error("Error fetching liked news: ", error);
      }
    };

    if (currentUser) {
      fetchLikedNews();
    }
  }, [currentUser]);

  const handleLike = async (title) => {
    try {
      if (!currentUser) {
        setPopupMessage("Please first sign up account");
        setShowPopup(true);
        return;
      }

      const q = query(
        collection(db, "likes"),
        where("userId", "==", currentUser.uid),
        where("title", "==", title)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(collection(db, "likes"), {
          title: title,
          likedOn: new Date(),
          userId: currentUser.uid,
        });
        setLikedNews([...likedNews, title]);
      } else {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        const updatedLikedNews = likedNews.filter((news) => news !== title);
        setLikedNews(updatedLikedNews);
      }
    } catch (error) {
      console.error("Error toggling like: ", error);
    }
  };

  return (
    <div
      className="container
my-4"
    >
      <h3 style={{ textAlign: "center" }}>
        <u>TOP HEADLINES</u>
      </h3>
      <div className="row justify-content-center">
        {loading ? (
          <>
            <div style={{ textAlign: "center", marginTop: "25px" }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">
                  <b>Loading...</b>
                </span>
              </Spinner>
              <p style={{ fontSize: "15px", marginTop: "10px" }}>Loading....</p>
            </div>
          </>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : article.length > 0 ? (
          article.map((item, index) => (
            <div key={index} className="col-md-6">
              <div
                className="card my-3 p-3 position-relative"
                style={{
                  boxShadow: "2px 2px 10px silver",
                  borderRadius: "10px",
                }}
              >
                <h5 className="my-1">{item.title}</h5>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={item.urlToImage}
                    alt="not found"
                    className="card-img-top img-fluid"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p className="my-1">{item.content}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  View More
                </a>
                <HeartButton
                  liked={likedNews.includes(item.title)}
                  onClick={() => handleLike(item.title)}
                >
                  {likedNews.includes(item.title) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </HeartButton>
              </div>
            </div>
          ))
        ) : (
          <p>No article available</p>
        )}
      </div>
      {showPopup && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default FetchData;

const HeartButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: red;
  }
`;
