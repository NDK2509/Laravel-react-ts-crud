import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { API_URL, CAT_TABLE_NAME, IMAGES_URL } from "../../utils/constants"
import { Cat } from "../../utils/types"

const CatList = () => {
  const [data, setData] = useState<{ isLoaded: boolean, catList: Cat[] | [], count: number }>({
    isLoaded: false,
    catList: [],
    count: 0
  })
  const navigate = useNavigate()
  const getData = async () => {
    const res = await axios.get(API_URL + CAT_TABLE_NAME)
    setData({
      isLoaded: true,
      catList: res.data.data,
      count: res.data.count
    })
  }
  const deleteCat = async (id: number) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "You will delete this cat!",
      icon: "warning",
      buttons: ["Cancel", true],
      dangerMode: true,
    })
    if (willDelete) {
      const res = await axios.delete(API_URL + CAT_TABLE_NAME + id)
      console.log(res);
      
      swal("Deleted!", "Back to home now!", "success");
      navigate("/Cats")
      setData({...data, isLoaded: false})
    }
  }
  useEffect(() => {
    if (!data.isLoaded) getData()
  }, [data.isLoaded])
  console.log(data);

  return (
    <>
      <div className="text-start">
        <Link to="/Cats/Create" className="btn btn-primary">Add new cat</Link>
      </div>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.count
              ? data.catList.map((cat, index) => (
                <tr key={index}>
                  <td>{cat.id}</td>
                  <td><Link to={"/Cats/" + cat.id}>{cat.name}</Link></td>
                  <td><img src={IMAGES_URL + cat.img} style={{ width: "5rem", height: "5rem" }} alt="" /></td>
                  <td>{cat.age}</td>
                  <td>
                    <Link to={"/Cats/Update/" + cat.id} className="btn btn-warning me-2"><i className="fas fa-pencil" aria-hidden="true"></i></Link>
                    <button className="btn btn-danger" onClick={() => deleteCat(cat.id as number)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                  </td>
                </tr>
              ))
              : (
                <tr><td colSpan={5} className="text-center">No data has found!</td></tr>
              )
          }
        </tbody>
      </table>
    </>
  )
}
export default CatList