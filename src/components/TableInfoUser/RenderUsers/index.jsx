function RenderUsers({data}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">firstName</th>
                <th scope="col">lastName</th>
                <th scope="col">email</th>
                <th scope="col">gender</th>
                <th scope="col">birthday</th>
                <th scope="col">salary</th>
                <th scope="col">phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.birthday}</td>
                  <td>{item.salary}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RenderUsers;
