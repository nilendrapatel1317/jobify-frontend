import api from "@/utils/axios";

// Get current student resume
export const getCurrStdResume = (stdId) => api.get(`/resume/curr-resume/${stdId}`);