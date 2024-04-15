const Search = ({onSearch, searchValue}) => {
  return (
    <>
      {/* <h1 className="text-center text-4xl font-bold">News Nerd</h1> */}
      <form onSubmit={(e) => e.preventDefault()}>
        {/* <div className="my-5 w-1/4 bg-red-500 self-center"> */}
        <input
          className="min-w-full border-none rounded-md px-2 py-1 shadow-2xl"
          type="text"
          value={searchValue}
          onChange={onSearch}
          placeholder="search here"
          // value={query}
          // onChange={(e) => searchPost(e.target.value)}
        />
        {/* </div> */}
      </form>
    </>
  );
};

export default Search;
