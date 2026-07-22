import puter from "@heyputer/puter.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { checkAuth } from "~/utils/auth";

export function meta() {
	return [
		{ title: "ATS lens | Authentication" },
		{ name: "description", content: "Get your resume checked" },
	];
}

export default function Auth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errorText, setErrorText] = useState("");

	const location = useLocation();
	const navigate = useNavigate();
	const next = location.search.split("next=")[1];

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
		checkAuth().then((res) => {
			setIsAuthenticated(res);
			if (res) navigate(next);
		});
	}, [next, isAuthenticated]);

	const handleSignin = async () => {
		const signin = await puter.auth.signIn();
		if (!signin) return setErrorText("Could not sign in");
	};

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<button className='btn' onClick={handleSignin}>
				Sign in
			</button>
		</div>
	);
}
