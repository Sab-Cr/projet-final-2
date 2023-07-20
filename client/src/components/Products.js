// import basics
import { useEffect, useState } from "react";
import { styled } from "styled-components";

// import utils to make api request
import fetchRequest from "../utils/fetch-request";
import { getProducts } from "../services/api";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";
import watchCover from "../assets/images/watch-cover.avif";

const Products = () => {
// states
  const [allProducts, setAllProducts] = useState([]);
  const[pageProducts, setPageProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [watchesPerPage] = useState(5);

// get products from server
  useEffect(() => {
    (async () => {
      const res = await fetchRequest(() => getProducts());
      setAllProducts(res.data)
    })();
    }, []);

  //Get current watches indexes
  const IndexOfLastWatch = currentPage * watchesPerPage;
  const indexOfFirstWatch = IndexOfLastWatch - watchesPerPage;

  //Show correct amount of products
  useEffect(() => {
   if (allProducts.length>0){
    const currentWatches = allProducts.slice(indexOfFirstWatch,IndexOfLastWatch);
    setPageProducts(currentWatches)
   }
    }, [allProducts,currentPage, indexOfFirstWatch, IndexOfLastWatch]);

  //Change Page (pass props from child to parent)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <CoverContainer>
        <Cover>Our products</Cover>
      </CoverContainer>

      {!allProducts
        ? <Loading> Loading Page </Loading>

        : <div>
          <Wrapper>
            {pageProducts.map((item)=>{
            return(
              <ProductItem key={item["_id"]} item={item}/>
            )
            })}
          </Wrapper>
          <Pagination watchesPerPage = {watchesPerPage} totalWatches = {allProducts.length} paginate={paginate}/>
        </div>

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