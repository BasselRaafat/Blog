export function toFormData(
	obj: Record<string, string | File | null | undefined>,
): FormData {
	const formData = new FormData();
	for (const [key, value] of Object.entries(obj)) {
		if (value instanceof File) formData.append(key, value);
		else if (value != null) formData.append(key, value);
	}
	return formData;
}
