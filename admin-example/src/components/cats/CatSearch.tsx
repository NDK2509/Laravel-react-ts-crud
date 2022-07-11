import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { API_URL, CAT_TABLE_NAME, IMAGES_URL } from "../../utils/constants"
import { Cat } from "../../utils/types"

const CatSearch = () => {
  const [searchParams] = useSearchParams()
  const [data, setData] = useState<{count: number, catList: Cat[]|[]}>({
    count: 0,
    catList: []
  })
  const key = searchParams.get("key")
  const getData = async () => {
    const res = await axios.get(API_URL + CAT_TABLE_NAME)
    setData({count: res.data.count, catList: res.data.data})
  }
  useEffect(() => {
    getData()
  }, [])
  const rowsCatTable = 
    data.catList
      .filter(cat => key ? cat.name.toLowerCase().includes(key.toLowerCase()) : true)
      .map((cat, index) => (
        <tr key={index}>
          <td>{cat.id}</td>
          <td><Link to={"/Cats/" + cat.id}>{cat.name}</Link></td>
          <td><img src={IMAGES_URL + cat.img} style={{ width: "5rem", height: "5rem" }} alt="" /></td>
          <td>{cat.age}</td>
        </tr>
      ))
      console.log(rowsCatTable);
      
  return (
    <>
      <h3 className="text-center">Results for {key}</h3>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {
            data.count && rowsCatTable.length
              ? rowsCatTable
              : (
                <tr><td colSpan={5} className="text-center">No data has found!</td></tr>
              )
          }
        </tbody>
      </table>
      
    </>
  )  
}
export default CatSearch