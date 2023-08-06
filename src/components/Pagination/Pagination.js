import React from 'react';
import { useState } from "react";
import { Input, Button } from "antd";
import "./pagination.css";

const PaginationNow = {
    sclassName: "",
    pagesCount:0,
    currentPage:0,
    setNextPage: null,
    maxPage: 0,
    handlePageClick:null,
    pageCount:0,
    setCurrentPageD:null,
    testId:null
    
}
const Pagination = ({handlePageClick, pageCount,setCurrentPageD,testId,}) => {
    const [currentPage, setCurrentPage] = useState(0);
    // const [goto, setGoto] = useState("");
    const [pageCheck, setPageCheck] = useState(0);
  
    console.log("currentPagecurrentPage", currentPage);
  

    return <>
    
    <div
    className="pagination__"
    style={{ display: "flex", alignItems: "center" }}
  >
    <div
      data-testid={testId ?? "pagination-container"}
      className="pagination-wrapper"
    >
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item page-shift" style={{ display: "flex" }}>
            <Icon
              className={"met-showSearch"}
              name={"arrowLeftDouble"}
              onClick={() => {
                setCurrentPage(0);
                setCurrentPageD(0);
                handlePageClick({ selected: 0 });
              }}
            />
          </li>

          <ReactPaginate
            nextLabel={
              <Icon
                className={"met-showSearch"}
                name={
                  currentPage + 1 === pageCount
                    ? "arrowRightDisabled"
                    : "arrowRight"
                }
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  setCurrentPageD(currentPage + 1);
                }}
              />
            }
            onPageChange={(e) => {
              handlePageClick(e);
              setCurrentPage(e.selected);
              setCurrentPageD(e.selected);
            }}
            pageCount={pageCount}
            previousLabel={
              <Icon
                className={"met-showSearch"}
                name={currentPage === 0 ? "arrowLeftDisabled" : "arrowLeft"}
                onClick={() => {
                  setCurrentPageD(currentPage - 1);
                  setCurrentPage(currentPage - 1);
                }}
              />
            }
            forcePage={currentPage ?? 0}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />

          <li
            className="page-item page-shift"
            style={{ display: "flex", marginLeft: "20px" }}
          >
            <Icon
              className={"met-showSearch"}
              name={"arrowRightDouble"}
              onClick={() => {
                setCurrentPageD(pageCount - 1);
                setCurrentPage(pageCount - 1);
                handlePageClick({ selected: pageCount - 1 });
              }}
            />
          </li>
        </ul>
      </nav>
    </div>
    <div className="gotoMain">
      <div className="gotoMain__text">Go to page</div>
      <Input
        value={pageCheck}
        onChange={(e) => {
          const value: number = e.target.value ? parseInt(e.target.value) : 0;
          setPageCheck(value);
        }}
        // RegExpToRestrictInputVal={/^(?!(0))[0-9]*$/}
        // inputclassName="gotoMain__input"
      ></Input>
      <Button
        size="large"
        // upperCase={false}
        onClick={() => {
          if (!pageCheck) {
            alert("please enter a page");
          } else {
            if (pageCount < pageCheck) {
              alert("This Page number is not found");
            } else {
              const value = {
                selected: pageCheck - 1,
              };
              setCurrentPageD(pageCheck - 1);
              setCurrentPage(pageCheck - 1);
              handlePageClick(value);
            }
          }
        }}
      >
        
      </Button>
    </div>
  </div>
    
    </>
    
};

export default Pagination;

Pagination.defaultProps = {
    pagesCount: 1,
    currentPage: 1,
    maxPage: 10,
  };
  