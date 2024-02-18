import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Card = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [close, setClose] = useState(false);
  const view = (currentElement) => {
    setDetail([{ ...currentElement }]);
    setClose(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {close ? (
        <div className="card_detail">
          {detail.map((item) => (
            <>
              <div>
                <div className="modal" key={item.id}>
                  <button onClick={() => setClose(false)} className="closebtn">
                    <AiOutlineCloseCircle />
                  </button>
                  <img src={item.thumbnail.large} alt="" />
                  <h2 style={{ marginLeft: "30px" }}>{item.title}</h2>
                  <p style={{ marginLeft: "30px", color: "#aaa8a5" }}>
                    {item.content}
                  </p>
                  <span style={{ display: "flex", marginLeft: "30px" }}>
                    <img className="avatar" src={item.author.avatar} alt="" />
                    <p style={{ marginLeft: "30px", color: "#aaa8a5" }}>
                      {item.author.name}-{item.author.role}
                    </p>
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : null}
      <>
        <div className="container">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.thumbnail.large} alt="" />
              <div className="learn-more-overlay" onClick={() => view(item)}>
                <div className="learn-more-text" onClick={() => view(item)}>
                  Learn More
                </div>
              </div>
              <h2 style={{ marginLeft: "30px", cursor: "pointer" }} onClick={() => view(item)} >{item.title}</h2>
              <p style={{ margin: "30px", color: "#aaa8a5" }}>{item.content}</p>
              <span>
                <p>
                  {item.author.name}-{item.author.role}
                </p>
                <p style={{ marginLeft: "20%" }}>{item.date}</p>
              </span>
            </div>
          ))}
        </div>
      </>
    </>
  );
};

export default Card;
