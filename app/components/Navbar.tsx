import puter from "@heyputer/puter.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
	const navigate = useNavigate();

	const [name, setName] = useState("You");

	// useEffect(() => {
	// 	const fetchName = async () => {
	// 		const name = await puter.kv.get("profile");
	// 		console.log(name);
	// 		return name;
	// 	};
	// 	fetchName();
	// 	setName(name);
	// }, [name]);

	useEffect(() => {
		const fetchName = async () => {
			const name = (await puter.auth.whoami()).username;
			console.log("name is ", name);
			setName(name);
		};
		fetchName();
	}, [name]);

	return (
		<nav className='sticky top-20 w-1/3  mx-auto'>
			<div className='flex justify-between items-center px-10 py-4 bg-purple-500/20 rounded-full'>
				<div
					onClick={() => navigate("/")}
					className='cursor-pointer text-3xl font-extrabold tracking-wider'
				>
					ATS
					<span className='text-sm font-light italic tracking-tighter'>
						{" "}
						lens
					</span>
				</div>

				<Link to='/profile'>
					<p className='text-sm cursor-pointer'>
						hello <span className='font-bold text-xl'>{name}</span>
					</p>
				</Link>
			</div>
		</nav>
	);
}
