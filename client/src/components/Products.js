// Import basics
import { useEffect, useState } from "react";
import { styled } from "styled-components";

// Import utils to make api request and necessary components
import fetchRequest from "../utils/fetch-request";
import { getProducts, getCategories } from "../services/api";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";
import watchCover from "../assets/images/watch-cover.avif";
import { useLocation } from "react-router-dom";

const Products = () => {
// States and variables
  const[pageProducts, setPageProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [watchesPerPage, setWatchesPerPage] = useState(25);
  const [totalWatches, setTotalWatches] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const perPage = [25,50,100];
  const location = useLocation();

  // Get the products of the page from the server
  useEffect(() => {
    (async () => {
      const res = await fetchRequest(() => getProducts(currentPage-1, watchesPerPage, !location.state? selectedCategory : (location.state.title !== "Others" ? location.state.title : selectedCategory)));
      setPageProducts(res.data)
      setTotalWatches(res.subTotal)
      // Categories fetch
      const res2 = await fetchRequest(() => getCategories());
      const categoriesFetched = res2.data.map((item)=>{
        return item.category
      })
      setCategories(categoriesFetched);
    })();
  // setSelectedCategory(location.state.title);

    }, [watchesPerPage,currentPage,selectedCategory]);

  //Change Page (pass props pageNumber from child to parent)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <CoverContainer>
        <Cover>Our products</Cover>
      </CoverContainer>
      <DropDownNav>
        <CategoryContainer defaultValue = {"Categories"} onChange={(e)=>{
          location.state = null;
          setSelectedCategory(e.target.value)
          setCurrentPage(1)
        }}>
          <option hidden disabled>Categories</option>
          {categories.map((category)=>{
            return(
              <option key = {category}>{category}</option>
            )
          })}
        </CategoryContainer>
        <LimitContainer defaultValue = {25} onChange={(e)=>{
          setWatchesPerPage(e.target.value)
          setCurrentPage(1)
        }}>
          {perPage.map((number)=>{
            return(
              <option key = {number}>{number}</option>
            )
          })}
        </LimitContainer>
      </DropDownNav>
      {!pageProducts
        ? <Loading> Loading Page </Loading>

        : <>
          <Wrapper>
            {pageProducts.map((item)=>{
              return(
                <ProductItem key={item["_id"]} item={item}/>
              )
              })}
          </Wrapper>
          <Pagination watchesPerPage = {watchesPerPage} totalWatches = {totalWatches} paginate={paginate}/>
        </>
        }
    </>
  );
};

export default Products;

const Wrapper = styled.div`
  display: flex;
  flex-wrap : wrap;
`;
const CoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${watchCover});
  background-size: 100% 150%;
  height : 26rem;
`
const Cover = styled.div`
  font-size : 9rem;
  color:white;

`;
const Loading = styled.div`
  text-align : center;
  font-size : 5rem;
`
const DropDownNav = styled.nav`
  margin : 5rem;
`
const CategoryContainer = styled.select`
  text-align : center;
  padding : 1rem;
  font-size : 3rem;
`
const LimitContainer = styled.select`
  text-align : center;
  padding : 1rem;
  font-size : 3rem;
`