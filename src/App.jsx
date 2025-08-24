import { useEffect, useState } from 'react'

const quizQuestions = {
  "questions": [
    {
      "id": 1,
      "question": "Which planet is known as the Red Planet?",
      "options": [
        "Earth",
        "Mars",
        "Jupiter",
        "Venus"
      ],
      "correctAnswer": 1
    },
    {
      "id": 2,
      "question": "Who wrote the play 'Romeo and Juliet'?",
      "options": [
        "Charles Dickens",
        "William Shakespeare",
        "Leo Tolstoy",
        "Mark Twain"
      ],
      "correctAnswer": 1
    },
    {
      "id": 3,
      "question": "What is the largest mammal in the world?",
      "options": [
        "African Elephant",
        "Blue Whale",
        "Giraffe",
        "Orca"
      ],
      "correctAnswer": 1
    },
    {
      "id": 4,
      "question": "Which country is known as the Land of the Rising Sun?",
      "options": [
        "China",
        "India",
        "Japan",
        "Thailand"
      ],
      "correctAnswer": 2
    },
    {
      "id": 5,
      "question": "What is the capital city of Australia?",
      "options": [
        "Sydney",
        "Melbourne",
        "Canberra",
        "Perth"
      ],
      "correctAnswer": 2
    },
    {
      "id": 6,
      "question": "Which element has the chemical symbol 'O'?",
      "options": [
        "Gold",
        "Oxygen",
        "Osmium",
        "Oxide"
      ],
      "correctAnswer": 1
    },
    {
      "id": 7,
      "question": "Who was the first President of the United States?",
      "options": [
        "Abraham Lincoln",
        "George Washington",
        "John Adams",
        "Thomas Jefferson"
      ],
      "correctAnswer": 1
    },
    {
      "id": 8,
      "question": "In which year did World War II end?",
      "options": [
        "1942",
        "1945",
        "1948",
        "1950"
      ],
      "correctAnswer": 1
    },
    {
      "id": 9,
      "question": "Which organ in the human body purifies blood?",
      "options": [
        "Heart",
        "Kidney",
        "Liver",
        "Lungs"
      ],
      "correctAnswer": 1
    },
    {
      "id": 10,
      "question": "Which is the longest river in the world?",
      "options": [
        "Amazon River",
        "Nile River",
        "Yangtze River",
        "Mississippi River"
      ],
      "correctAnswer": 1
    }
  ]
}

function App() {
  const [questions, setQuestions] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("quiz-answers");
    return saved ? JSON.parse(saved) : {};
  });

  const [score, setScore] = useState(false);
  const [time, setTime] = useState(15);

  useEffect(() => {
    localStorage.setItem("quiz-answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if(score) return;
    if(time === 0) {
      moveToNextQuestion();
      return;
    }

    const timer = setTimeout(() => setTime(time - 1), 1000); // harr ek sec mai time ka count ghata rha hai
    return () => clearTimeout(timer); // jo timer lgaya hai setTimeout se, usko clear krdega
  }, [time, score]);

  const handleAnswers = (i) => {
    setAnswers({...answers, [questions] : i});
  };

  const moveToNextQuestion = () => {
    if(questions < quizQuestions.questions.length - 1) {
      setQuestions(questions + 1);
      setTime(15);
    } else {
      setScore(true);
    }
  };

  const moveToPrevQuestion = () => {
    if(questions > 0) {
      setQuestions(questions - 1);
      setTime(15);
    }
  };

  const skipQuestion = () => {
    moveToNextQuestion();
  }

  const totalScore = () => {
    let correct = 0;
    quizQuestions.questions.forEach((q, i) => {
      if(answers[i] === q.correctAnswer) correct++;
    });

    return correct;
  };
  return (
    <>
      <div className="min-h-screen bg-linear-to-r/increasing from-blue-500-to-indigo-600 flex flex-col items-center justify-center p-6">
        <h1 className="text-black text-3xl font-bold mb-6">Creative Upaay Assignment</h1>
        <div className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg'>
          {!score ? (
            <>
              <div className='w-full bg-gray-200 rounded-full h-2 mb-4'>
                <div
                  className='bg-indigo-500 h-2 rounded-full'
                  style={{ width: `${((questions + 1) / quizQuestions.questions.length) * 100}%` }}
                />
              </div>

              <div className='flex justify-end mb-2'>
                <span className='text-sm font-semibold text-red-500'>Time left: {time}s</span>
              </div>

              <h2 className="text-xl font-semibold mb-4">Q{quizQuestions.questions[questions].id}. {quizQuestions.questions[questions].question}</h2>

              <div className='space-y-2'>
                {quizQuestions.questions[questions].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswers(i)}
                    className={`w-full px-4 py-2 rounded-lg border transition ${answers[questions] === i ? "bg-indigo-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className='flex justify-between mt-6'>
                <button onClick={moveToPrevQuestion} disabled={questions === 0} className='px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50'>
                  Previous
                </button>
                <button onClick={skipQuestion} className='px-4 py-2 bg-indigo-500 text-white rounded-lg'>Skip</button>
                <button onClick={moveToNextQuestion} className='px-4 py-2 bg-indigo-500 text-white rounded-lg'>
                  {questions === quizQuestions.questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
              <p className='text-lg mb-2'> Your Score: {totalScore()} / {quizQuestions.questions.length}</p>
              <p className='text-green-600 font-semibold'>Correct: {totalScore()} | Incorrect:{" "} {quizQuestions.questions.length - totalScore()}</p>
              <button onClick={() => {setAnswers({})
              localStorage.removeItem("quiz-answers");
              setQuestions(0);
              setScore(false);
              setTime(15);
            }} className='mt-6 px-4 py-2 bg-indigo-500 text-black rounded-lg'>Restart Quiz</button>
            </div>
          )}
        </div>
      </div>
    </>
  );

}



export default App
