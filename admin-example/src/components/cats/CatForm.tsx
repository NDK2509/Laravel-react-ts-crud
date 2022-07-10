import axios from "axios"
import swal from "sweetalert"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { API_URL, CAT_TABLE_NAME } from "../../utils/constants"
import { Action, Cat } from "../../utils/types"

const CatForm = ({ action }: { action: Action }) => {
  const [cat, setCat] = useState<Cat & { file: File | null, weight: number }>({
    name: '',
    age: 0,
    img: "",
    weight: 0,
    file: null
  })
  const params = useParams()
  const navigate = useNavigate()
  const getCat = async (id: string) => {
    const res = await axios.get(API_URL + CAT_TABLE_NAME + id);
    const data = res.data.data 
    setCat({ ...cat, ...data, weight: data.weightHistories[0] ? data.weightHistories[data.weightHistories.length - 1].weight : 0})
  }
  useEffect(() => {
    if (action === Action.UPDATE) {
      getCat(params.id as string)
    }
    // eslint-disable-next-line
  }, [])
  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCat({ ...cat, [e.target.name]: e.target.value })
  }
  const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setCat({ ...cat, file: files ? files[0] : null })
  }
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    data.append("name", cat.name)
    data.append("age", String(cat.age))
    if (cat.file) data.append("img", cat.file)
    data.append("name", cat.name)
    data.append("weight", String(cat.weight))

    switch (action) {
      case Action.CREATE: {
        const res = await axios.post(API_URL + CAT_TABLE_NAME, data)
        // console.log(res);
        
        if (res.data.status === "created") {
          swal("Created", "Now back to home!", "success")
          navigate("/Cats")
        } else {
          swal("Error!", res.data.message, "warning")
        }
        break
      }
      case Action.UPDATE: {
        data.append("_method", "PUT")
        const res = await axios.post(API_URL + CAT_TABLE_NAME + cat.id, data)
        console.log(res)
        if (res.data.status === "updated") {
          swal("Updated", "Now back to home!", "success")
          navigate("/Cats")
        } else {
          swal("Error!", res.data.status , "warning")
        }
        break
      }
    }
  }
  console.log(cat);

  return (
    <>
      <Link to="/Cats"><i className="fas fa-arrow-left"></i></Link>
      <div className="row justify-content-center align-items-center">
        <div className="w-75">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              Name:
              <input type="text" className="form-control" name="name" value={cat.name} onChange={changeInputHandler} />
            </div>
            <div className="form-group mt-3">
              Age:
              <input type="text" className="form-control" name="age" value={cat.age} onChange={changeInputHandler} />
            </div>
            <div className="form-group mt-3">
              Weight:
              <input type="text" className="form-control" name="weight" value={cat.weight} onChange={changeInputHandler} />
            </div>
            <div className="form-group mt-3">
              Image:
              <input type="file" className="form-control" name="file" onChange={imageChangeHandler} />
            </div>
            <div className="text-center mt-3">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default CatForm