export interface InstituitionDataTypes {
    id: number;
    instituition_name: string;
    instituition_abbr: string;
    instituition_logo: url;
}

export interface CourseDataTypes {
    id: number;
    instituition: string;
    course: string;
    level: string;
}

export interface PastQuestionDataTypes {
    id?: number;
    instituition: string;
    course: string;
    level: string;
    title: string;
    pdf: File;
}