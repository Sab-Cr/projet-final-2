import { useRef } from "react";
import { styled } from "styled-components";

const Selections = ({ quantity, handleChange, numInStock }) => {
  // create the selections for the dropdown for selecting qty
  const selectionsRef = useRef([]);
  selectionsRef.current = (
    Array
      .from(Array(numInStock + 1).keys())
      .slice(1)
  );

  return (
    <Select value={quantity} onChange={handleChange}>
      {selectionsRef.current.map(
        selection => (
          <option key={`qty${selection}`} value={selection}>{selection}</option>
        )
      )}
    </Select>
  );
};

export default Selections;

const Select = styled.select`
  width: 100px;
  height: 30px;
  border: none;
  border-bottom: 1px black solid;
  margin-bottom: 20px;
  display: block;
`;