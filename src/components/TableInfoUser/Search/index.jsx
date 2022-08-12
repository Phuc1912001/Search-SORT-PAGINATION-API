

function Search({handleSearch,setValue,value}) {

  

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form className="mt-5">
              <input
                type="text"
                value={value}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-warning ms-4"
                onClick={handleSearch}
              >
                search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
