// const { GoogleGenAI } = require("@google/genai");
// const { z } = require("zod");
// const { zodToJsonSchema } = require("zod-to-json-schema");

// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_API_KEY,
// });

// const interviewReportSchema = z.object({
//     score: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestion: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intentions: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestion: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intentions: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     // title: z.string().describe("The title of the job for which the interview report is generated"),
// })

//   async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}
// `

//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     })

//     console.log(JSON.parse(response.text))
//     return JSON.parse(response.text)


// }

// module.exports = generateInterviewReport;


const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `You are an expert technical recruiter. Analyze the candidate's profile against the job description and generate a detailed interview report.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    score: {
                        type: "NUMBER",
                        description: "A score between 0 and 100 indicating how well the candidate matches the job"
                    },
                    title: {
                        type: "STRING",
                        description: "Title of the Job"
                    },
                    technicalQuestion: {
                        type: "ARRAY",
                        description: "Technical questions for the interview",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: { type: "STRING" },
                                intentions: { type: "STRING" },
                                answer: { type: "STRING" }
                            },
                            required: ["question", "intentions", "answer"]
                        }
                    },
                    behaviouralQuestion: {
                        type: "ARRAY",
                        description: "Behavioural questions for the interview",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: { type: "STRING" },
                                intentions: { type: "STRING" },
                                answer: { type: "STRING" }
                            },
                            required: ["question", "intentions", "answer"]
                        }
                    },

                    interviewQuestion: {
                        type: "ARRAY",
                        description: "Interview questions for the candidate",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: { type: "STRING" },
                                intentions: { type: "STRING" },
                                answer: { type: "STRING" }
                            },
                            required: ["question", "intentions", "answer"]
                        }
                    },
                    skillGaps: {
                        type: "ARRAY",
                        description: "Skill gaps in the candidate profile",
                        items: {
                            type: "OBJECT",
                            properties: {
                                skill: { type: "STRING" },
                                severity: {
                                    type: "STRING",
                                    enum: ["low", "medium", "high"]
                                }
                            },
                            required: ["skill", "severity"]
                        }
                    },
                    preparationPlan: {
                        type: "ARRAY",
                        description: "Day-wise preparation plan for the candidate",
                        items: {
                            type: "OBJECT",
                            properties: {
                                day: { type: "NUMBER" },
                                focus: { type: "STRING" },
                                tasks: {
                                    type: "ARRAY",
                                    items: { type: "STRING" }
                                }
                            },
                            required: ["day", "focus", "tasks"]
                        }
                    }
                },
                required: ["score", "title", "technicalQuestion", "behaviouralQuestion", "interviewQuestion", "skillGaps", "preparationPlan"]
            }
        }
    });

    const parsed = JSON.parse(response.text);
    console.log(parsed);
    return parsed;
}

module.exports = generateInterviewReport;
