import {
    IQuestion,
    IQuestionOption,
    IQuestionMedia
  } from './quiz.form';
  import DOMPurify from 'dompurify';
  import { QuestionTypeEnum } from '../enums/question-type.enum';
  import { QuestionLayoutTypeEnum } from '../enums/question-type.enum';
  
  // Should we put these (parseQuestionText and the regex)
  // in another file to import helper functions and variables?
  const valueImageRegex = /<img.*?src=['|"]+(.*?)['|"]+/;
  function parseQuestionText(
    qText: string,
    encryptedPath: string,
    fileUrl: string
  ) {
    const regexGroups = valueImageRegex.exec(qText);
    let cleanedString = qText;
    let image = '';
    if (regexGroups && regexGroups.length > 1) {
      cleanedString = qText.replace(regexGroups[1], '');
      // quiz image path
      console.log('--regexGroups--', qText);
      image = fileUrl + '/' + encryptedPath + '/' + regexGroups[1];
    }
    cleanedString = DOMPurify.sanitize(qText, { ALLOWED_TAGS: [] });
    return {
      text: cleanedString.trim() !== '.' ? cleanedString.trim() : '',
      image: image
    };
  }
  
  export class BaseQuestion {
    id: string;
    layout: QuestionLayoutTypeEnum;
    type: QuestionTypeEnum;
    metadata: QuestionMetadata;
    qtext: string | any;
    media: string | any;
    qadd: string | any;
    questionHeaderImage: string | null;
    encryptedPath: string;
  
    constructor(
      id: string,
      layout: QuestionLayoutTypeEnum,
      type: QuestionTypeEnum,
      metadata: QuestionMetadata,
      qtext: string,
      media: IQuestionMedia,
      qadd: string | any,
      encryptedPath: string,
      fileUrl: string
    ) {
      this.encryptedPath = encryptedPath;
      this.id = id;
      this.layout = layout;
      this.type = type;
      this.metadata = metadata;
      this.media = media;
      this.qadd = qadd;
      this.setQuestionTextAndImage(qtext, encryptedPath, fileUrl);
    }
  
    private setQuestionTextAndImage(
      questionText: string,
      encryptedPath: string,
      fileUrl: string
    ) {
      const { text, image } = parseQuestionText(
        questionText,
        encryptedPath,
        fileUrl
      );
      this.qtext = text;
      if (image && image.length) {
        this.questionHeaderImage = image;
      }
    }
  }
  
  export class SingleChoiceQuestion extends BaseQuestion {
    options: QuestionOption[];
  
    constructor(question: IQuestion, fileUrl: string) {
      super(
        question.questionId,
        question.questionDetails.layout,
        question.questionDetails.type,
        question.questionDetails.metadata,
        question.questionDetails.qtext,
        question.questionDetails.media,
        question.questionDetails.qadd,
        question.encryptedPath,
        fileUrl
      );
      // Set options for single choice questions
      this.options = question.questionDetails.options.option.map(
        o =>
          new QuestionOption(
            o.id,
            o.value,
            o.isCorrect,
            this.encryptedPath,
            fileUrl
          )
      );
    }
  }
  
  export class MultipleChoiceQuestion extends SingleChoiceQuestion {
    constructor(question: IQuestion, fileUrl: string) {
      super(question, fileUrl);
    }
  }
  
  export class QuestionOption implements IQuestionOption {
    id: number;
    value: string;
    isCorrect: boolean;
    optionImage: string;
  
    constructor(
      id: number,
      value: string,
      isCorrect: boolean,
      encryptedPath: string,
      fileUrl: string
    ) {
      this.id = id;
      this.isCorrect = isCorrect;
      this.setOptionTextAndImage(value, encryptedPath, fileUrl);
    }
  
    private setOptionTextAndImage(
      questionText: string,
      encryptedPath,
      fileUrl: string
    ) {
      const { text, image } = parseQuestionText(
        questionText,
        encryptedPath,
        fileUrl
      );
      this.value = text;
      if (image && image.length) {
        this.optionImage = image;
      }
    }
  }
  
  export class QuestionMetadata {
    tp?: string;
    objective?: string;
    difficultylevel?: string;
    class?: string;
    marks?: string;
    timeToAnswer?: string;
    rubric?: any;
  }
  