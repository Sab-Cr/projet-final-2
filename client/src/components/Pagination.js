// import basics
import { styled } from "styled-components";

const Pagination = ({watchesPerPage, totalWatches, paginate}) => {
    // Variable to store page numbers
    const pageNumbers=[];
    // Populate page numbers
    for (let i =1 ; i<= Math.ceil(totalWatches/watchesPerPage); i++){
        pageNumbers.push(i);
    }

  return (
    <Wrapper>
        <Container>
            {pageNumbers.map((number)=>{
                return(
                    <Number key = {number} onClick={()=>paginate(number)}>
                        {number}
                    </Number>            
                )
            })
            }
        </Container>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
`;
const Container = styled.ul`
    display: flex;
    justify-content: center;
`;
const Number = styled.button`
    background-color : white;
    font-size:1.5rem;
    padding : 2rem;
    margin : 1rem;
    border: none;
    &:focus {
        background-color : black;
        color : white;
    }
`;

export default Pagination