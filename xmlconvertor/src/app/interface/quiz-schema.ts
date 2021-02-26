export interface quizSchema{
    questionId: string,
    questionDetails: {
      metadata: {
        tp: string,
        objective: string,
        difficultylevel: string,
        keywords: null,
        copyright: null
      },
      qtext: string,
      media: {
        value: string,
        src: null,
        type: null
      },
      questmedia: null,
      qadd: string,
      options: {
        option: [
          {
            value: string,
            id: string,
            isCorrect: boolean
          },
          {
            value: string,
            id: string,
            isCorrect: boolean
          },
          {
            value: string,
            id: string,
            isCorrect: boolean
          },
          {
            value: string,
            id: string,
            isCorrect: boolean
          }
        ]
      },
      feedbacks: null,
      id: string,
      layout: string,
      type: string,
      uid: string
    },
    encryptedPath: string
}