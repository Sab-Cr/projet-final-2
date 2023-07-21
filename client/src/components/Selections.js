import { useRef } from "react";


const Selections = ({ quantity, setQuantity, numInStock }) => {
  // create the selections for the dropdown for selecting qty
  const selectionsRef = useRef([]);
  selectionsRef.current = (
    Array
      .from(Array(numInStock + 1).keys())
      .slice(1)
  );


  // utils
  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <select value={quantity} onChange={handleChange}>
      {selectionsRef.current.map(
        selection => (
          <option key={`qty${selection}`} value={selection}>{selection}</option>
        )
      )}
    </select>
  );
};

export default Selections;