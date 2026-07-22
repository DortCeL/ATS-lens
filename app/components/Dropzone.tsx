import { useDropzone } from "react-dropzone";

export default function Dropzone() {
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		onDrop: (acceptedFiles) => {
			// Do something with the files, e.g. upload to a server

			console.log(acceptedFiles);
		},
		maxFiles: 1,
	});

	return (
		<div {...getRootProps()} className=''>
			<div className='h-20 py-10 cursor-pointer flex flex-col items-center justify-center rounded-md bg-linear-to-r from-purple-800 to-red-800'>
				<input {...getInputProps()} />
				<div className='flex flex-col text-center'>
					<p className='text-xl font-bold'>Upload pdf</p>
					<p className='font-md'>Click or Drag n drop your resume here</p>
				</div>
			</div>
			<div className='my-5 text-center'>
				{acceptedFiles.map((file) => (
					<>
						<p>{file.name}</p>
					</>
				))}
			</div>
		</div>
	);
}
