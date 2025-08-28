import type { ICourse } from "./course";
import type { JwtPayload } from "./user";

export interface IAnswer {
  text: string;
  textEn?: string;
  textAr?: string;
  isCorrect: boolean;
}

export interface IQuestion {
  _id:string;
  question: string;
  questionEn?: string;
  questionAr?: string;
  answers: IAnswer[];
}

export interface IScore {
  student: JwtPayload; 
  score:number;
}


export interface IQuiz {
  _id:string;
  course: ICourse; 
  title: string,
  titleEn?: string,
  titleAr?: string,
  description: string,
  descriptionEn?: string,
  descriptionAr?: string,
  questions: IQuestion[];
  teacherId: string;
  numberStudent: number;
  scores: IScore[];
  createdAt: Date;
  updatedAt: Date;
}