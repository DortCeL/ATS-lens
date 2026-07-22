import { useDropzone } from "react-dropzone";

interface DropzoneProps {
	onFileSelect: (file: File | null) => void;
}

export default function Dropzone({ onFileSelect }: DropzoneProps) {
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		onDrop: (acceptedFiles) => {
			const selectedFile = acceptedFiles[0] || null;

			// console.log("selected file", selectedFile);
			onFileSelect(selectedFile);
		},
		maxFiles: 1,
		accept: {
			"application/pdf": [".pdf"],
		},
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
		</div>
	);
}
