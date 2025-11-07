import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, RotateCcw, Brain, Trophy, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface QuizQuestion {
  id: string;
  question: string;
  questionGeorgian: string;
  options: string[];
  optionsGeorgian: string[];
  correctAnswer: number;
  explanation: string;
  explanationGeorgian: string;
  category: 'recycling' | 'energy' | 'water' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What percentage of paper can typically be recycled?',
    questionGeorgian: 'ქაღალდის რა პროცენტი შეიძლება ჩვეულებრივ გადამუშავდეს?',
    options: ['50%', '75%', '90%', '100%'],
    optionsGeorgian: ['50%', '75%', '90%', '100%'],
    correctAnswer: 2,
    explanation: 'Up to 90% of paper can be recycled, making it one of the most recyclable materials.',
    explanationGeorgian: 'ქაღალდის 90%-მდე შეიძლება გადამუშავდეს, რაც მას ერთ-ერთ ყველაზე გადამუშავებად მასალად აქცევს.',
    category: 'recycling',
    difficulty: 'medium'
  },
  {
    id: 'q2',
    question: 'How many times can paper be recycled?',
    questionGeorgian: 'რამდენჯერ შეიძლება ქაღალდის გადამუშავება?',
    options: ['2-3 times', '5-7 times', '10+ times', 'Unlimited'],
    optionsGeorgian: ['2-3-ჯერ', '5-7-ჯერ', '10+-ჯერ', 'უსასრულოდ'],
    correctAnswer: 1,
    explanation: 'Paper can typically be recycled 5-7 times before the fibers become too short.',
    explanationGeorgian: 'ქაღალდი ჩვეულებრივ 5-7-ჯერ შეიძლება გადამუშავდეს, სანამ ბოჭკოები ძალიან მოკლე გახდება.',
    category: 'recycling',
    difficulty: 'hard'
  },
  {
    id: 'q3',
    question: 'Which action saves the most energy at home?',
    questionGeorgian: 'რომელი მოქმედება ზოგავს ყველაზე მეტ ენერგიას სახლში?',
    options: ['Turning off lights', 'Using LED bulbs', 'Adjusting thermostat', 'Unplugging devices'],
    optionsGeorgian: ['განათების გამორთვა', 'LED ნათურების გამოყენება', 'თერმოსტატის რეგულირება', 'მოწყობილობების გამორთვა'],
    correctAnswer: 2,
    explanation: 'Adjusting your thermostat by just 1-2 degrees can save 10% on energy bills.',
    explanationGeorgian: 'თერმოსტატის მხოლოდ 1-2 გრადუსით რეგულირება შეიძლება ენერგიის ბილის 10% შეზოგვას.',
    category: 'energy',
    difficulty: 'medium'
  },
  {
    id: 'q4',
    question: 'How much water does the average person use per day?',
    questionGeorgian: 'რამდენ წყალს იყენებს საშუალო ადამიანი დღეში?',
    options: ['50 liters', '100 liters', '150 liters', '200 liters'],
    optionsGeorgian: ['50 ლიტრი', '100 ლიტრი', '150 ლიტრი', '200 ლიტრი'],
    correctAnswer: 2,
    explanation: 'The average person uses about 150 liters of water per day for drinking, cooking, and hygiene.',
    explanationGeorgian: 'საშუალო ადამიანი დღეში დაახლოებით 150 ლიტრ წყალს იყენებს სმისთვის, კულინარიისთვის და ჰიგიენისთვის.',
    category: 'water',
    difficulty: 'easy'
  },
  {
    id: 'q5',
    question: 'What is the main cause of plastic pollution in oceans?',
    questionGeorgian: 'რა არის ოკეანეებში პლასტიკური დაბინძურების მთავარი მიზეზი?',
    options: ['Fishing gear', 'Bottles and containers', 'Microplastics', 'Shopping bags'],
    optionsGeorgian: ['თევზაობის აღჭურვილობა', 'ბოთლები და კონტეინერები', 'მიკროპლასტიკი', 'საყიდლების პაკეტები'],
    correctAnswer: 0,
    explanation: 'Lost or discarded fishing gear accounts for about 46% of plastic pollution in oceans.',
    explanationGeorgian: 'დაკარგული ან მიტოვებული თევზაობის აღჭურვილობა ოკეანეებში პლასტიკური დაბინძურების დაახლოებით 46%-ს შეადგენს.',
    category: 'general',
    difficulty: 'hard'
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const currentQuestionData = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) {
      toast({
        title: 'გთხოვთ აირჩიოთ პასუხი',
        description: 'გთხოვთ შეარჩიოთ პასუხი გაგრძელებამდე',
        variant: 'destructive',
      });
      return;
    }

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      const correctAnswers = userAnswers.filter((answer, index) => 
        answer === quizQuestions[index].correctAnswer
      ).length;
      
      toast({
        title: 'ვიქტორინა დასრულდა!',
        description: `შენ სწორად უპასუხე ${correctAnswers}/${quizQuestions.length} კითხვას`,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'recycling': return 'გადამუშავება';
      case 'energy': return 'ენერგია';
      case 'water': return 'წყალი';
      case 'general': return 'ზოგადი';
      default: return category;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'მარტივი';
      case 'medium': return 'საშუალო';
      case 'hard': return 'რთული';
      default: return difficulty;
    }
  };

  if (quizCompleted) {
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === quizQuestions[index].correctAnswer
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-2 sm:p-4">
        <div className="container mx-auto max-w-4xl py-4 sm:py-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 sm:p-4 rounded-full shadow-lg">
                <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-4">ვიქტორინის შედეგები</h1>
            <p className="text-base sm:text-lg text-muted-foreground px-4">შენი შედეგი ეკოლოგიური ვიქტორინაში</p>
          </div>

          <Card className="mb-6 sm:mb-8 mx-2 sm:mx-0">
            <CardHeader className="text-center px-4 sm:px-6">
              <CardTitle className={`text-4xl sm:text-6xl font-bold ${getScoreColor(correctAnswers, quizQuestions.length)}`}>
                {correctAnswers}/{quizQuestions.length}
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                სწორი პასუხები ({Math.round((correctAnswers / quizQuestions.length) * 100)}%)
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <Progress value={(correctAnswers / quizQuestions.length) * 100} className="mb-4" />
              <div className="text-center">
                <Button onClick={resetQuiz} className="w-full sm:w-auto text-sm sm:text-base">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  ხელახლა ცდა
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">დეტალური შედეგები</h2>
            <div className="space-y-3 sm:space-y-4">
              {quizQuestions.map((question, index) => (
                <Card key={question.id} className="border-l-4 border-l-muted">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3 className="font-medium text-sm sm:text-base text-foreground flex-1 leading-relaxed">
                        {index + 1}. {question.questionGeorgian}
                      </h3>
                      {userAnswers[index] === question.correctAnswer ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        შენი პასუხი: {question.optionsGeorgian[userAnswers[index]]}
                      </p>
                      {userAnswers[index] !== question.correctAnswer && (
                        <p className="text-xs sm:text-sm text-green-600">
                          სწორი პასუხი: {question.optionsGeorgian[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                        {question.explanationGeorgian}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light via-background to-eco-light/20 p-2 sm:p-4">
      <div className="container mx-auto max-w-4xl py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="bg-gradient-to-br from-eco-primary to-eco-secondary p-2 sm:p-3 rounded-full">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">ეკოლოგიური ვიქტორინა</h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            შეისწავლე ეკოლოგიური საკითხები და გამოცადე შენი ცოდნა
          </p>
        </div>

        <div className="mb-4 sm:mb-6 px-2 sm:px-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-foreground">
              კითხვა {currentQuestion + 1} / {quizQuestions.length}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {Math.round(progress)}% დასრულებული
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-4 sm:mb-6 shadow-xl border-0 bg-gradient-to-br from-card to-card/50 mx-2 sm:mx-0">
          <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6 pt-3 sm:pt-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <Badge variant="outline" className="text-xs px-2 sm:px-3 py-1 bg-primary/10 border-primary/20">
                {getCategoryLabel(currentQuestionData.category)}
              </Badge>
              <Badge 
                variant={currentQuestionData.difficulty === 'easy' ? 'secondary' : 
                        currentQuestionData.difficulty === 'medium' ? 'default' : 'destructive'}
                className="text-xs px-2 sm:px-3 py-1"
              >
                {getDifficultyLabel(currentQuestionData.difficulty)}
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-2xl font-bold leading-relaxed text-foreground">
              {currentQuestionData.questionGeorgian}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              disabled={showResult}
            >
              <div className="space-y-2 sm:space-y-3">
                 {currentQuestionData.optionsGeorgian.map((option, index) => (
                   <div 
                     key={index}
                     className={`flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                       showResult 
                         ? index === currentQuestionData.correctAnswer
                           ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-300 shadow-lg shadow-green-200/50'
                           : index === selectedAnswer && index !== currentQuestionData.correctAnswer
                           ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-300 shadow-lg shadow-red-200/50'
                           : 'bg-muted/30 border-muted-foreground/20'
                         : selectedAnswer === index
                         ? 'bg-gradient-to-r from-primary/10 to-primary/20 border-primary shadow-lg shadow-primary/20'
                         : 'bg-card hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 border-border hover:border-primary/30 hover:shadow-md'
                     }`}
                   >
                     <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-0.5 flex-shrink-0" />
                     <Label 
                       htmlFor={`option-${index}`} 
                       className="flex-1 cursor-pointer font-medium text-sm sm:text-base leading-relaxed"
                     >
                       {option}
                     </Label>
                     {showResult && index === currentQuestionData.correctAnswer && (
                       <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full flex-shrink-0">
                         <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                         <span className="text-xs font-medium text-green-700 hidden sm:inline">სწორი</span>
                       </div>
                     )}
                     {showResult && index === selectedAnswer && index !== currentQuestionData.correctAnswer && (
                       <div className="flex items-center space-x-1 bg-red-100 px-2 py-1 rounded-full flex-shrink-0">
                         <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                         <span className="text-xs font-medium text-red-700 hidden sm:inline">არასწორი</span>
                       </div>
                     )}
                   </div>
                 ))}
              </div>
            </RadioGroup>

            {showResult && (
              <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Leaf className="w-3 h-3 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900 text-sm sm:text-base">განმარტება</h4>
                </div>
                <p className="text-blue-800 leading-relaxed text-sm sm:text-base">
                  {currentQuestionData.explanationGeorgian}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-6 sm:mt-8 gap-2">
              <Button 
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-3 sm:px-6 text-sm sm:text-base"
                size="sm"
              >
                წინა
              </Button>
              
              {!showResult ? (
                <Button 
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="px-3 sm:px-6 text-sm sm:text-base flex-1 sm:flex-none"
                  size="sm"
                >
                  პასუხის შემოწმება
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="px-3 sm:px-6 text-sm sm:text-base flex-1 sm:flex-none"
                  size="sm"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'შემდეგი კითხვა' : 'შედეგების ნახვა'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;