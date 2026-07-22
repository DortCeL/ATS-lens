import puter, { type FSItem } from "@heyputer/puter.js";
import { useEffect, useState } from "react";
import Dropzone from "~/components/Dropzone";
import { formatSize } from "~/utils/sizeFormatter";

export default function Upload() {
	const [companyName, setCompanyName] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [jobDescription, setJobDescription] = useState("");

	const [statusText, setStatusText] = useState("");

	const [isAnalyzing, setIsAnalyzing] = useState(false);

	const [file, setFile] = useState<File | null>(null);

	const handleFileSelect = (selectedFile: File | null) => {
		setFile(selectedFile);
	};

	//  NOT WORKING
	const handleFileRemove = () => {
		if (!file) return;
		setFile(null);
	};

	const analyze = async () => {
		setIsAnalyzing(true);

		// *** Gotta handle duplicate files. i can save files in the kv and resist duplicate files. new file will replace old one

		setStatusText("Uploading file to FS");
		let uploadedFile = await puter.fs.upload([file]);
		if (Array.isArray(uploadedFile)) uploadedFile = uploadedFile[0]; // eta typescript issue fix kore. because it can return FSitem[] which the doc says it doesnt but idk why typescript yells

		if (!uploadedFile) return setStatusText("File could not be uploaded to FS");
		setStatusText("File uploaded successfully");

		console.log("Uploaded File", uploadedFile);

		const uuid = crypto.randomUUID();

		const data = {
			id: uuid,
			resumePath: uploadedFile.path,
			companyName,
			jobDescription,
			jobTitle,
			feedback: "",
		};

		setStatusText("Saving resume in the KV");
		await puter.kv.set(`resume:${uuid}`, data);
		setStatusText("Successfully saved in KV");

		setStatusText("Getting AI feedback now...");
		await puter.ai.chat();
		setStatusText("Successfully saved in KV");

		setIsAnalyzing(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		analyze();
	};

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div>
				<form onSubmit={handleSubmit} className='w-125'>
					<div className='flex gap-4 flex-col'>
						<div className='flex gap-10 items-center justify-between'>
							<label htmlFor='companyName'>Company Name</label>
							<input
								type='text'
								name='companyName'
								placeholder='Company name'
								onChange={(e) => setCompanyName(e.target.value)}
								value={companyName}
							/>
						</div>
						<div className='flex gap-10 items-center  justify-between'>
							<label htmlFor='jobTitle'>Job Title</label>
							<input
								type='text'
								name='jobTitle'
								placeholder='Job title'
								onChange={(e) => setJobTitle(e.target.value)}
								value={jobTitle}
							/>
						</div>
						<div className='flex gap-10 items-center justify-between'>
							<label htmlFor='jobDescription'>Job Description</label>
							<textarea
								rows={5}
								name='jobDescription'
								placeholder='Job description'
								onChange={(e) => setJobDescription(e.target.value)}
								value={jobDescription}
							/>
						</div>
					</div>

					{/* PDF upload area */}
					<section className='pdf-upload-area mt-10'>
						<Dropzone onFileSelect={handleFileSelect} />
						{file && (
							<div className='mt-4 px-5'>
								<div className='flex justify-between items-center'>
									<p className='text-center wrap-break-word'>{file?.name}</p>
									<button
										onClick={handleFileRemove}
										className='w-10 h-10 rounded-full bg-red-500 inline-flex items-center justify-center font-extrabold text-black cursor-pointer'
									>
										X
									</button>
								</div>

								<p className='text-start text-gray-500 '>
									{formatSize(file.size)}
								</p>
							</div>
						)}
					</section>
					<div className='mt-20'>
						<button type='submit' className='btn w-full'>
							{isAnalyzing ? "Analyzing now..." : "Analyze"}
						</button>
					</div>

					<h2 className='text-xl text-center font-extralight tracking-wider italic mt-5'>
						{statusText}
					</h2>
				</form>
			</div>
		</div>
	);
}
