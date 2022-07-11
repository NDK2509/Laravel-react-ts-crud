import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("")
  const navigate = useNavigate()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    navigate({pathname: "/Cats/Search", search : `?key=${searchKey}`})
  }
	return (
		<form className="d-flex" role="search" onSubmit={submitHandler}>
			<input
				className="form-control me-2"
				type="search"
				value={searchKey}
				placeholder="Search"
				aria-label="Search"
        onChange={(e) => setSearchKey(e.target.value)}
			/>
			<button className="btn btn-outline-success" type="submit">
				Search
			</button>
		</form>
	);
};
export default SearchBar;
