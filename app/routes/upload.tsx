import { useState } from "react";
import Dropzone from "~/components/Dropzone";

export default function Upload() {
	const [companyName, setCompanyName] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [jobDescription, setJobDescription] = useState("");

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
						<Dropzone />
					</section>
				</form>
			</div>
		</div>
	);
}
