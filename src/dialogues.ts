export interface Dialogue {
	id: string;
	desc_array: string[];
}

export function loadDialogues(json: unknown): Map<string, Dialogue> {
	return new Map(
		(json as Dialogue[]).map((dialogue) => [dialogue.id, dialogue]),
	);
}
