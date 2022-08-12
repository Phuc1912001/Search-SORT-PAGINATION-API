import React, { useEffect, useState } from "react";
import axios from "axios";
import Sort from "./Sort";
import Search from "./Search";
import RenderUsers from "./RenderUsers";
function TableInfoUser() {
  // chỗ này thường thì sẽ phải tạo ra 1 phai constant riêng nhé
  const sortOption = [
    "id",
    "firstName",
    "lastName",
    "email",
    "gender",
    "birthday",
    "salary",
    "phone",
  ];

  // các State
  const [data, setdata] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(10);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");

  const handleSearch = async (value) => {
    setValue(value);
    // e.preventDefault();
    // setValue(value)
    loadUserData(0, 10, 0, "search", value);

    // return await axios
    //   .get(`http://localhost:3000/infoUsers?q=${value}`)
    //   .then((response) => {
    //     setdata(response.data);
    //     setValue("")
    //   })
    //   .catch((err) => console.log(err));
  };

  const loadUserData = async (
    start,
    end,
    increase,
    opType = null,
    filterOrSortValue
  ) => {
    switch (opType) {
      case "search":
        setOperation(opType);
        console.log(filterOrSortValue);

        return await axios
          .get(
            `http://localhost:3000/infoUsers?q=${filterOrSortValue}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setdata(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "sort":
        setOperation(opType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3000/infoUsers?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setdata(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(`http://localhost:3000/infoUsers?_start=${start}&_end=${end}`)
          .then((response) => {
            setdata(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    loadUserData(0, 10, 0);
  }, []);

  const renderPagination = () => {
    if (data.length < 10 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <div>
          <button type="button" className="btn ">
            1
          </button>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={() =>
              loadUserData(
                (currentPage + 1) * 10,
                (currentPage + 2) * 10,
                1,
                operation,
                sortFilterValue
              )
            }
          >
            Next
          </button>
        </div>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <div>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={() =>
              loadUserData(
                (currentPage - 1) * 10,
                currentPage * 10,
                -1,
                operation,
                sortFilterValue
              )
            }
          >
            prev
          </button>
          <button type="button" className="btn ms-2">
            {currentPage + 1}
          </button>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={() =>
              loadUserData(
                (currentPage + 1) * 10,
                (currentPage + 2) * 10,
                1,
                operation,
                sortFilterValue
              )
            }
          >
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={() =>
              loadUserData(
                (currentPage - 1) * 10,
                currentPage * 10,
                -1,
                operation,
                sortFilterValue
              )
            }
          >
            prev
          </button>
          <button type="button" className="btn ms-2">
            1
          </button>
        </div>
      );
    }
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUserData(0, 10, 0, "sort", value);
    // return await axios
    //   .get(`http://localhost:3000/infoUsers?_sort=${value}&_order=asc`)
    //   .then((response) => {
    //     setdata(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Search
              handleSearch={handleSearch}
              value={value}
              setValue={setValue}
            />
            <Sort
              sortOption={sortOption}
              sortValue={sortValue}
              handleSort={handleSort}
            />
            <RenderUsers data={data} />
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableInfoUser;
