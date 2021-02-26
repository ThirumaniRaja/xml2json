import { QuestionTypeEnum } from '../enums/question-type.enum';
import { QuestionLayoutTypeEnum } from '../enums/question-type.enum';

export interface IQuestion {
  questionId: string;
  questionDetails?: IQuestionDetails;
  encryptedPath?: string;
}

export interface IQuestionDetails {
  id?: string;
  metadata?: IQuestionMetadata;
  qtext: string;
  media?: IQuestionMedia;
  questmedia?: string | null;
  qadd?: string;
  options?: { option: IQuestionOption[] };
  feedbacks?: string | null;
  layout: QuestionLayoutTypeEnum;
  type: QuestionTypeEnum;
  uid?: string;
}

export interface IQuestionMedia {
  value: string;
  src: string | null;
  type: string | null;
}

export interface IQuestionOption {
  id: number;
  value: string;
  isCorrect: boolean;
}

export interface IQuestionMetadata {
  tp?: string;
  objective?: string;
  difficultylevel?: string;
  class?: string;
  marks?: string;
  timeToAnswer?: string;
  rubric?: any;
}
