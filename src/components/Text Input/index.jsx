import "./styles.css";

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      placeholder="Search"  
      className="text-input"
      onChange={handleChange}
      type="search"
      value={searchValue}
    />
  );
};
