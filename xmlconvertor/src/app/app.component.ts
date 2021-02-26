import { Component } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { quizSchema } from './interface/quiz-schema';
import {
  IQuestion,
  IQuestionDetails,
  IQuestionOption,
} from './interface/quiz.form';
import { BaseQuestion } from './interface/quiz.interface';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'xmlconvertor';
  xmlToJson: IQuestion;
  questionDetails: IQuestionDetails;
  questions: BaseQuestion[] = [];
  optionData: IQuestionOption[] = [];
  quesOptions;
  xmlDoc;
  text =
    '<address>' +
    '<street>Roble Ave</street>' +
    '<mtfcc>S1400</mtfcc>' +
    '<streetNumber>649</streetNumber>' +
    '<lat>37.45127</lat>' +
    '<lng>-122.18032</lng>' +
    '<distance>0.04</distance>' +
    '<postalcode>94025</postalcode>' +
    '<placename>Menlo Park</placename>' +
    '<adminCode2>081</adminCode2>' +
    '<adminName2>San Mateo</adminName2>' +
    '<adminCode1>CA</adminCode1>' +
    '<adminName1>California</adminName1>' +
    '<countryCode>US</countryCode>' +
    '</address>';

  xml =
    "<Question question_id='teqb-000c23a2-2f5f-4417-b2af-a0244c30f2f2' question_Type='Multiple Choice' template_Type='MCMS'><Question_Stem><Question_Text><Text><![CDATA[Which  of the following reduce acidified manganese dioxide (MnO<sub>2</sub> ) to Mn<sup>2#43;</sup> ?]]></Text></Question_Text> <Instruction_Text></Instruction_Text></Question_Stem><Choice><Choice_Option correct='true'><Text><![CDATA[HI]]></Text></Choice_Option><Choice_Option correct='true'> <Text><![CDATA[HBr]]></Text> </Choice_Option> <Choice_Option correct='false'> <Text><![CDATA[HF]]></Text></Choice_Option> <Choice_Option correct='true'> <Text><![CDATA[HCl]]></Text> </Choice_Option> </Choice> <Solution> <Text><![CDATA[HI, HCl and HBr reduce acidified manganese dioxide (MnO<sub>2</sub> )  to Mn<sup>2#43;</sup> to give coloured gases.]]></Text> </Solution> <Meta> <Meta_Class><![CDATA[12]]></Meta_Class> <Meta_Subject><![CDATA[Chemistry]]></Meta_Subject> <Meta_Chapter><![CDATA[The  p -Block Elements]]></Meta_Chapter> <Meta_Teaching_Point><![CDATA[Hydrogen  Bromide]]></Meta_Teaching_Point> <Meta_Question_Objective><![CDATA[Understanding]]></Meta_Question_Objective> <Meta_Complexity><![CDATA[Average]]></Meta_Complexity><Meta_Suggestive_Marks><![CDATA[1]]></Meta_Suggestive_Marks> <Meta_Time_to_answer><![CDATA[1]]></Meta_Time_to_answer> <Meta_Rubric> <Text><![CDATA[The  p -Block Elements]]></Text></Meta_Rubric> </Meta> </Question>";

  //xml="<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>";
  constructor(
    private ngxXml2jsonService: NgxXml2jsonService,
    private quizService: QuizService
  ) {
    console.log(this.xmtConvertor());
  }

  xmtConvertor() {
  

    if (window.DOMParser) {
      const parser = new DOMParser();
      this.xmlDoc = parser.parseFromString(this.xml, 'text/xml');
      console.log(this.xmlDoc);
    }

    let testChoice = this.xmlDoc
    .getElementsByTagName('Choice_Option')[1]
    .getAttribute('correct')
    console.log("testChoice",testChoice)

    for (let i = 1; i < 5; i++) {
     let opData;
    
     opData = 
        {
          id: i,
          value: this.xmlDoc.getElementsByTagName('Text')[i].childNodes[0]
            .nodeValue,
          isCorrect: this.xmlDoc
            .getElementsByTagName('Choice_Option')[i-1]
            .getAttribute('correct'),
        }
      this.optionData.push(opData);
  }

  console.log("optionData",this.optionData)

    let xmlToJson = {
      questionId: this.xmlDoc
        .getElementsByTagName('Question')[0]
        .getAttribute('question_id'),
      questionDetails: {
        qtext: this.xmlDoc.getElementsByTagName('Text')[0].childNodes[0]
          .nodeValue,
        options: {option:this.optionData}
          // option: [
          //   {
          //     id: 1,
          //     value: this.xmlDoc.getElementsByTagName('Text')[1].childNodes[0]
          //       .nodeValue,
          //     isCorrect: this.xmlDoc
          //       .getElementsByTagName('Choice_Option')[0]
          //       .getAttribute('correct'),
          //   },
          //   {
          //     id: 2,
          //     value: this.xmlDoc.getElementsByTagName('Text')[2].childNodes[0]
          //       .nodeValue,
          //     isCorrect: this.xmlDoc
          //       .getElementsByTagName('Choice_Option')[1]
          //       .getAttribute('correct'),
          //   },
          //   {
          //     id: 3,
          //     value: this.xmlDoc.getElementsByTagName('Text')[3].childNodes[0]
          //       .nodeValue,
          //     isCorrect: this.xmlDoc
          //       .getElementsByTagName('Choice_Option')[2]
          //       .getAttribute('correct'),
          //   },
          //   {
          //     id: 4,
          //     value: this.xmlDoc.getElementsByTagName('Text')[4].childNodes[0]
          //       .nodeValue,
          //     isCorrect: this.xmlDoc
          //       .getElementsByTagName('Choice_Option')[3]
          //       .getAttribute('correct'),
          //   },
          // ],
        ,
        layout: this.xmlDoc
          .getElementsByTagName('Question')[0]
          .getAttribute('layout_Type'),
        type: this.xmlDoc
          .getElementsByTagName('Question')[0]
          .getAttribute('question_Type'),
      },
    };

    return xmlToJson;
  }
}
