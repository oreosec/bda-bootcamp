import { Route, NavLink, HashRouter } from "react-router-dom";
import { Foods, Drinks } from "../App";

export function Main() {
	return (
		<HashRouter>
				<div class="categories inline-display container">
					<NavLink to="/">Foods</NavLink>
					<NavLink to="/Drinks">Drinks</NavLink>
					<div className="content">
						<Route exact path="/" component={Foods}/>
						<Route path="/Drinks" component={Drinks}/>
					</div>
				</div>
			</HashRouter>
	)
}