import { styled } from "styled-components";

const Confirmation = () => {
  return (
    <Wrapper>
        <Text>Thank you for your purchase!</Text>
        <Text>See you soon :) !</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items: center;
`
const Text = styled.div`
    padding : 2rem;
    font-size : 2rem;
`



export default Confirmation