import { useNavigate } from "react-router";

export default function Navbar() {
	const navigate = useNavigate();

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

				<div>
					<p>hello YOU</p>
				</div>
			</div>
		</nav>
	);
}
