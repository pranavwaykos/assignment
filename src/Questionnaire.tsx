import React, { useState, useEffect } from 'react';
import questions from '../src/questions';

const Questionnaire: React.FC = () => {
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState<number | null>(null);
    const [averageScore, setAverageScore] = useState<number | null>(null);
    const [showScore, setShowScore] = useState<boolean>(false);

    useEffect(() => {
        const loadAverageScore = () => {
            const storedScores = JSON.parse(localStorage.getItem('scores') || '[]') as number[];
            if (storedScores.length > 0) {
                const average = storedScores.reduce((sum, score) => sum + score, 0) / storedScores.length;
                setAverageScore(average);
            }
        };
        loadAverageScore();
    }, []);

    const handleAnswer = (answer: 'yes' | 'no') => {
        setAnswers(prev => {
            const newAnswers = [...prev, answer];
            console.log('Updated Answers:', newAnswers);
            return newAnswers;
        });

        setCurrentQuestionIndex(prev => {
            const newIndex = prev + 1;
            console.log('Updated Question Index:', newIndex);
            return newIndex;
        });
        if (currentQuestionIndex + 1 >= questions.length) {
            setTimeout(() => {
                calculateScore();
                setShowScore(true);
            }, 0);
        }
    };

    const calculateScore = () => {
        const totalQuestions = questions.length;
        const yesCount = answers.filter(answer => answer === 'yes').length;
        const newScore = (100 * yesCount) / totalQuestions;
        setScore(newScore);

        const storedScores = JSON.parse(localStorage.getItem('scores') || '[]') as number[];
        storedScores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(storedScores));

        const average = storedScores.reduce((sum, score) => sum + score, 0) / storedScores.length;
        setAverageScore(average);
    };

    return (
        <div>
            {currentQuestionIndex < questions.length ? (
                <div>
                    <h1>{questions[currentQuestionIndex]}</h1>
                    <button onClick={() => handleAnswer('yes')}>Yes</button>
                    <button onClick={() => handleAnswer('no')}>No</button>
                </div>
            ) : (
                <div>
                    {showScore && score !== null && <h2>Your score: {score.toFixed(2)}%</h2>}
                    {averageScore !== null && <h3>Average score: {averageScore.toFixed(2)}%</h3>}
                </div>
            )}
        </div>
    );
};

export default Questionnaire;
