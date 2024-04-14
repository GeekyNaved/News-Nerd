const Search = () => {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">News Nerd</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="my-5">
          <input
            className="border-none rounded-md px-2 py-1"
            type="text"
            placeholder="search here"
            // value={query}
            // onChange={(e) => searchPost(e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default Search;
