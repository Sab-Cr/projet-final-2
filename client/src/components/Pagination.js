import { styled } from "styled-components";

const Pagination = ({watchesPerPage, totalWatches, paginate}) => {
    const pageNumbers=[];

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
    padding : 2rem;
`;


export default Pagination