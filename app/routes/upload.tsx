import { useState } from "react";
import Dropzone from "~/components/Dropzone";
import { formatSize } from "~/utils/sizeFormatter";

export default function Upload() {
	const [companyName, setCompanyName] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [jobDescription, setJobDescription] = useState("");

	const [file, setFile] = useState<File | null>(null);

	const handleFileSelect = (selectedFile: File | null) => {
		setFile(selectedFile);
	};

	const handleFileDelete = () => {
		setFile(null);
	};

	const handleAnalyze = () => {};

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div>
				<form className='w-125'>
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
										onClick={handleFileDelete}
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
							Analyze
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
