import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { checkAuth } from "~/utils/auth";
import { useEffect } from "react";
import puter from "@heyputer/puter.js";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "ATS lens | AI resume feedback" },
		{ name: "description", content: "Get your resume analyzed by AI" },
	];
}

export default function Home() {
	const navigate = useNavigate();

	// useEffect(() => {
	// 	puter.auth.signOut();
	// }, []);

	const handleUploadResumeClick = async () => {
		const isAuth = await checkAuth();
		if (!isAuth) {
			navigate("/auth?next=/upload");
		}
		navigate("/upload");
	};

	return (
		<>
			<div className='min-h-screen flex items-center justify-center'>
				<div>
					<button className='btn' onClick={handleUploadResumeClick}>
						Upload Resume
					</button>
				</div>
			</div>
		</>
	);
}
