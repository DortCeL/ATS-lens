import puter, { type FSItem } from "@heyputer/puter.js";
import { useEffect, useState } from "react";
import Dropzone from "~/components/Dropzone";
import { prepareInstructions } from "~/constants";
import { formatSize } from "~/utils/sizeFormatter";

const jobDes = `Urgent Hiring: Full Stack Developers (Multiple Positions – Fresher & Experienced)
Location → Remote (WFH), Bangladesh
Job Type → Full-Time
Work Hours → USA (EST) / Europe (CET) Business Hours

Open Positions
→ Full Stack Developer (Fresher)
 Salary → 35,000 – 50,000 BDT/month
→ Senior Full Stack Developer (Experienced)
Salary → 100,000 – 175,000 BDT/month

Role Overview:
We are hiring multiple Full Stack Developers to join our international clients. Whether you're a recent graduate eager to launch your career or an experienced engineer looking for your next challenge, this is an opportunity to work on real-world web applications with global teams.

Key Responsibilities:
→ Develop, test, and maintain modern web applications
 → Build responsive and user-friendly frontend interfaces
 → Develop secure, scalable backend services and APIs
 → Work with databases and integrate third-party services
 → Debug, troubleshoot, and optimize application performance
 → Collaborate with designers, developers, and project managers
 → Write clean, maintainable, and well-documented code

Requirements (Freshers):
→ Bachelor's degree in Computer Science or a related field (or equivalent skills)
 → Understanding of HTML, CSS, JavaScript, and modern web development
 → Knowledge of at least one frontend framework (React, Angular, Vue, etc.)
 → Basic understanding of backend development (Node.js, PHP, Python, Java, .NET, or similar)
 → Familiarity with SQL or NoSQL databases
 → Strong willingness to learn and grow as a developer

Requirements (Experienced Developers):
→ 6+ years of professional Full Stack Development experience
 → Strong expertise in modern frontend and backend technologies
 → Experience designing and developing scalable web applications
 → Strong knowledge of APIs, databases, Git, and software architecture
 → Experience working in Agile development environments
 → Ability to work independently in a remote team

Nice to Have:
→ Experience with AI application development or AI integrations
 → Experience with AWS, Azure, or Google Cloud
 → Experience with Docker, Kubernetes, and CI/CD pipelines
`;

export default function Upload() {
	const [companyName, setCompanyName] = useState("Enzo Tech");
	const [jobTitle, setJobTitle] = useState("Full stack developer");
	const [jobDescription, setJobDescription] = useState(jobDes);

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

		// *** PUTER AI PROMPT KHANKI MAGIR POLA ... OR 14 GUSHTI CHUDI BESSHA MAGIR JAT ... DOCUMENTATION HOGA DIA LEKHSE MADARCHOD ER POYDA KHANKIRPOLA
		const feedback = await puter.ai.chat([
			{
				type: "file",
				puter_path: "~/Desktop/your-document.pdf",
			},
			{
				type: "text",
				text: "Please summarize this document.",
			},
		]);

		if (!feedback) return setStatusText("Analysis Failed :(");

		setStatusText("Analysis Complete.");
		// const feedbackText =
		// 	typeof feedback.message.content === "string"
		// 		? feedback.message.content
		// 		: feedback.message.content[0].text;

		console.log(feedback);

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
