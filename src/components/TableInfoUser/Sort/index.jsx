function Sort({sortOption,sortValue,handleSort}) {
  return (
    <div className="container">
      <select onChange={handleSort} value={sortValue}>
        <option>làm ơn chọn</option>
        {sortOption.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sort;
