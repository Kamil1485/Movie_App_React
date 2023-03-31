import React,{useEffect} from "react";
import "./Pagination.css";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';

const Pagination = ({ page,numOfPages, setPage, setLoading,mediaType }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const indexStart = Math.floor((page - 1) - ((page - 1) % 15) + 1)
  const indexEnd = Math.min(indexStart + 15, numOfPages);
 let pages = [];
 for (let i = 1; i <= numOfPages; i++) {
  pages.push(i);
 }

useEffect(() => {//4
  const searchParams = new URLSearchParams(location.search);
  const pageFromUrl = searchParams.get('page');//5
  if (pageFromUrl) {
    setPage(parseInt(pageFromUrl));
  }
}, [location.search,setPage]);


const handlePageChange = (mediatype,newPage) => {//1
  navigate(`/${mediatype}?page=${newPage}`);
};

  const changePage = (mediatype,pageNumber) => {
    if (page !== pageNumber) {//amaç:double click önlemek
      handlePageChange(mediatype,pageNumber);
      setLoading(true);
      setPage(pageNumber);
      window.scrollTo(0, 0);
  }
  }

  const nextPage = (pageNumber) => {
    setPage(pageNumber);
    setLoading(true);
    window.scrollTo(0, 0);
  };

  const prevPage = (pageNumber) => {
    setPage(pageNumber);
    setLoading(true);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <ul className="listItems">
        <span className="prevBtn" onClick={() => prevPage(page - 1)}>
          {page > 1 && <FcPrevious className="fc" />}
        </span>
      {page>15 &&<span onClick={() => changePage(mediaType,1)} className="listItem">1...</span>}
        {pages
          .slice(indexStart - 1, indexEnd).map((paginate, index) => (
          <li onClick={() => changePage(mediaType,paginate)} className="listItem" key={index}>
            <span className={`pagenumbers ${paginate === page && "activePaginate"}`}>{paginate}</span>
          </li>
        ))}
        <span className="nextBtn" onClick={() => nextPage(page + 1)}>
          {indexEnd!==page && <FcNext />}
        </span>
      </ul>
    </div>
  );
};

export default Pagination;
