export const formatSize = (size: number) => {
	if (size === 0) return "0 Bytes";

	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

	const index = Math.floor(Math.log(size) / Math.log(1024));

	return (
		parseFloat((size / Math.pow(1024, index)).toFixed(2)) + " " + sizes[index]
	);
};
