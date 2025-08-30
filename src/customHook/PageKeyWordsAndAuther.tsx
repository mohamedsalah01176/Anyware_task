import { useEffect } from "react";

interface MetaOptions {
  keywords?: string;
  author?: string;
}

const UseMetaPageKeyWordsAndAuther = ({ keywords, author }: MetaOptions) => {
  useEffect(() => {
    if (keywords) {
      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    if (author) {
      let metaAuthor = document.querySelector("meta[name='author']");
      if (!metaAuthor) {
        metaAuthor = document.createElement("meta");
        metaAuthor.setAttribute("name", "author");
        document.head.appendChild(metaAuthor);
      }
      metaAuthor.setAttribute("content", author);
    }
  }, [keywords, author]);
};

export default UseMetaPageKeyWordsAndAuther;
