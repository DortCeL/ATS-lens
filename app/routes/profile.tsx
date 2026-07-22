import { puter, type FSItem } from "@heyputer/puter.js";
import { useEffect, useState } from "react";

export default function profile() {
	const [fsFiles, setFsFiles] = useState<FSItem[] | null>(null);

	const loadPuterFsData = async () => {
		const files = await puter.fs.readdir("./");
		if (files.length > 0) setFsFiles(files);
	};

	useEffect(() => {
		loadPuterFsData();
	}, []);

	// Debugging to see how many files are selected in FS
	const deleteAllFsFiles = async () => {
		fsFiles?.map(async (file) => {
			await puter.fs.delete(file.path);
		});
		loadPuterFsData();
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center'>
			<h1>Profile Page</h1>

			<div>
				<h2>Your Files in Puter FS</h2>
			</div>
			{fsFiles ? (
				fsFiles.map((f) => <li key={f.id}>{f.name}</li>)
			) : (
				<p>No files to show</p>
			)}
			<button className='btn bg-red-500' onClick={deleteAllFsFiles}>
				DELETE EVERYTHING FROM FS
			</button>
		</div>
	);
}
