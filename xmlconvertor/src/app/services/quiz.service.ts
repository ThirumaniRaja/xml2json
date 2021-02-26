import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import {
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  BaseQuestion
} from '../interface/quiz.interface';
// import { RequestApiService } from '@tce/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class QuizService {
  private questions = new ReplaySubject<BaseQuestion[]>(1);
  public questions$ = this.questions.asObservable();

  private questionResponse = new Subject();
  public questionResponse$ = this.questionResponse.asObservable();
  
  xml ="<Question question_id='teqb-00f66127-fe86-4ce1-8849-76ea125a40d9' question_Type='Multiple Choice' template_Type='MCTWO' layout_Type='1'><Question_Stem><Question_Text><Text><![CDATA[State whether the following statement is True or False.<br />Narasimhavarman II, the son of the Parameswaran I was the most famous ruler of the Pallavas.]]></Text></Question_Text><Instruction_Text><![CDATA[Choose the correct answer from the below options.]]></Instruction_Text></Question_Stem><Choice><Choice_Option correct='true'><Text><![CDATA[True]]></Text></Choice_Option><Choice_Option correct='false'><Text><![CDATA[False]]></Text></Choice_Option></Choice><Solution/><Meta><Meta_Class><![CDATA[7]]></Meta_Class><Meta_Subject><![CDATA[History]]></Meta_Subject><Meta_Chapter><![CDATA[The  South Indian Kingdoms]]></Meta_Chapter><Meta_Teaching_Point><![CDATA[The Pallavas]]></Meta_Teaching_Point><Meta_Question_Objective><![CDATA[Knowledge]]></Meta_Question_Objective><Meta_Complexity><![CDATA[Easy]]></Meta_Complexity><Meta_Suggestive_Marks><![CDATA[1]]></Meta_Suggestive_Marks><Meta_Time_to_answer><![CDATA[1]]></Meta_Time_to_answer><Meta_Rubric><Text><![CDATA[Ancient  India]]></Text></Meta_Rubric></Meta></Question>";
 
  constructor(
    private http: HttpClient,
  ) {
    this.questionResponse.next(this.xml);

  }

  
  getQuestions(questionIds: string[]) {
  
       
  }

  
  GetInputType(response) {
    console.log('responseXMlData', response);
    let xmlData;
    for (let i = 0; i < response.length; i++) {
      // try {
      //   let a;
      //   a = JSON.parse(response[i]);
      //   return 'json type';
      // } catch(e) {
      let parser = new DOMParser();
      var xmlDoc = parser.parseFromString(response[i], 'application/xml');
      if (xmlDoc.documentElement.nodeName == 'parsererror') {
      } else {
        xmlData = response[i];
        this.covertXmlToJson(xmlData);
      }

      //}
    }
  }

  covertXmlToJson(xmlData) {
    console.log('xmlData', xmlData);
  }
}
