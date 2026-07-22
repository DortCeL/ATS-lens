interface Resume {
	id: string;
	companyName?: string;
	jobTitle?: string;
	// imagePath: string;
	resumePath: string;
	feedback: Feedback;
}

interface Feedback {
	overallScore: number;
	ATS: {
		score: number;
		tips: {
			type: "good" | "improve";
			tip: string;
		}[];
	};
	toneAndStyle: {
		score: number;
		tips: {
			type: "good" | "improve";
			tip: string;
			explanation: string;
		}[];
	};
	content: {
		score: number;
		tips: {
			type: "good" | "improve";
			tip: string;
			explanation: string;
		}[];
	};
	structure: {
		score: number;
		tips: {
			type: "good" | "improve";
			tip: string;
			explanation: string;
		}[];
	};
	skills: {
		score: number;
		tips: {
			type: "good" | "improve";
			tip: string;
			explanation: string;
		}[];
	};
}

interface AIResponse {
	index: number;
	message: {
		role: string;
		content: string | any[];
		refusal: null | string;
		annotations: any[];
	};
	logprobs: null | any;
	finish_reason: string;
	usage: {
		type: string;
		model: string;
		amount: number;
		cost: number;
	}[];
	via_ai_chat_service: boolean;
}
