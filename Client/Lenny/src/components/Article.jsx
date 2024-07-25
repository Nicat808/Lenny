import React from "react";
import article1 from "../assets/article-1.png";
import article2 from "../assets/article-2.png";
import article3 from "../assets/article-3.png";
import "../style/Article.scss"
import Button from "./Button"

const Article = () => {
  return (
    <div className="article-wrapper">
      <div className="article-header">
        <h3>Lenny's Article</h3>
        <Button width={122} 
                height={45} 
                content={"View Detail"}
                ClassName={"bg-White"}
      />
      </div>
      <div className="articles">
        <div className="article">
          <img src={article1} alt="" />
          <span>22 Dec 2022</span>
          <h3>Make your desk more neat and beautiful</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam
            scelerisque pharetra id. Maecenas diam eu amet cras
          </span>
        </div>
        <div className="article">
          <img src={article2} alt="" />
          <span>22 Dec 2022</span>
          <h3>What are the fashion trend in 2023?</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam
            scelerisque pharetra id. Maecenas diam eu amet cras
          </span>
        </div>
        <div className="article">
          <img src={article3} alt="" />
          <span>22 Dec 2022</span>
          <h3>Tips for Work Life Balance </h3>
          <span>
            Lorem ipsum dolor sit amet consectetur. Arcu pellentesque etiam
            scelerisque pharetra id. Maecenas diam eu amet cras
          </span>
        </div>
      </div>
    </div>
  );
};

export default Article;
