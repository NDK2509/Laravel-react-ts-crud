import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_URL, CAT_TABLE_NAME, IMAGES_URL } from "../../utils/constants"
import { Cat } from "../../utils/types"

const CatDetail = () => {
  const [cat, setCat] = useState<Cat | null>(null)
  const params = useParams()
  const getCat = async () => {
    const res = await axios.get(API_URL + CAT_TABLE_NAME + params.id)
    setCat({ ...res.data.data})
  }
  useEffect(() => {
    getCat();
  }, [])
  return (
    <>
      <Link to="/Cats"><i className="fas fa-arrow-left"></i></Link>
      <div className="row">
        <div className="col-6">
          <img src={IMAGES_URL + cat?.img} alt="" className="img-fluid" />
        </div>
        <div className="col-6">
          <h1 className="text-center"><b>{cat?.name}</b></h1>
          <h3 className="text-center">Age: {cat?.age}</h3>
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">Weight</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              {
                cat?.weightHistories
                  ? cat?.weightHistories.map(history => (
                    <tr>
                      <td>{history.weight}</td>
                      <td>{new Date(history.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                  : (
                    <tr><th colSpan={2} className="text-center">No data has found!</th></tr>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default CatDetail