import searchIcon from "../assets/search1.svg";


export default function Search({handleSubmit, handleChange}) {

  return (
    <form className="search-form">
      <input 
        type="search" 
        id="search-bar"
        placeholder="Search for an image by tag"
        name="search"
        onChange={handleChange}
      />
      <button 
        className="search-btn"
        onClick={handleSubmit}
      >
        <img src={searchIcon} alt="search icon" className="search-icon"/>
      </button>
    </form>
  )
}
