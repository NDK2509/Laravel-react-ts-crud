import { Outlet } from "react-router-dom"

const CatPage = () => {
	return (
		<div className="container">
			<h1 className="text-center">This is Cat Page</h1>
			<Outlet />
		</div>
	)
}
export default CatPage