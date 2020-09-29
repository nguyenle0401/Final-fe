const ini = {
  time: 10,
  qty: 5,
  questions: [],
};

function rand(items) {
  return items[~~(items.length * Math.random())];
}
export default (state = ini, { type, payload }) => {
  switch (type) {
    case "FETCH_GAME_DONE":
      const newQuestion = payload.questions.map((question) => {
        question.answers = [null, null, null, null];
        let choices = [0, 1, 2, 3];
        for (let i in question) {
          if (i.startsWith("answer")) {
            let foo = rand(choices);
            choices = choices.filter((e) => e !== foo);
            question.answers[foo] = question[i];
          }
        }
        return question;
      });

      return {
        ...state,
        ...payload,
        questions: newQuestion,
      };
    default:
      return { ...state };
  }
};
