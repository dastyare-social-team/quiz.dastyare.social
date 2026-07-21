"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { scorecard, InterpretationBand, Scorecard } from "@/config/scorecard"; // Adjust the import path as necessary

// Helper function to get the interpretation band based on score
const getInterpretation = (
  score: number,
  bands: InterpretationBand[]
): InterpretationBand | undefined => {
  return bands.find((band) => score >= band.range[0] && score <= band.range[1]);
};

// Helper function to get the traffic light color
const getTrafficLightColor = (
  score: number,
  bands: InterpretationBand[]
): string => {
  const band = getInterpretation(score, bands);
  return band ? band.lightColor : "gray"; // Default to gray if no band found
};

// Helper to map color names to Tailwind CSS classes
const getTextColorClass = (color: string): string => {
  switch (color) {
    case "red":
      return "text-red-600";
    case "yellow":
      return "text-yellow-600";
    case "green":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const Page = () => {
  const searchParams = useSearchParams();
  const [score, setScore] = useState<number | null>(null);
  const [interpretation, setInterpretation] =
    useState<InterpretationBand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scoreParam = searchParams.get("score");
    if (scoreParam) {
      const parsedScore = parseInt(scoreParam, 10);
      if (!isNaN(parsedScore)) {
        setScore(parsedScore);
        const band = getInterpretation(
          parsedScore,
          scorecard.interpretationBands
        );
        setInterpretation(band || null);
      }
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        Loading results...
      </div>
    );
  }

  if (score === null) {
    return (
      <div className="container mx-auto p-8 text-center">
        No score found. Please complete the scorecard first.
      </div>
    );
  }

  const textColorClass = interpretation
    ? getTextColorClass(interpretation.lightColor)
    : "text-gray-600";

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Your Scorecard Results
      </h1>

      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">Your Total Score:</h2>
        <p className={`text-6xl font-bold ${textColorClass}`}>{score} / 75</p>
      </div>

      {/* Traffic Light Visualization */}
      <div className="flex justify-center items-center space-x-4 mb-8 p-4 bg-gray-100 rounded-lg">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg ${getTrafficLightColor(score, scorecard.interpretationBands) === "red" ? "bg-red-600" : "bg-red-300"}`}
        >
          Red
        </div>
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg ${getTrafficLightColor(score, scorecard.interpretationBands) === "yellow" ? "bg-yellow-600" : "bg-yellow-300"}`}
        >
          Yellow
        </div>
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg ${getTrafficLightColor(score, scorecard.interpretationBands) === "green" ? "bg-green-600" : "bg-green-300"}`}
        >
          Green
        </div>
      </div>

      {interpretation ? (
        <div className="bg-white rounded-lg p-6 mb-8">
          <h3 className={`text-3xl font-semibold mb-3 ${textColorClass}`}>
            {interpretation.title}
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            {interpretation.description}
          </p>
          <p className="text-sm text-gray-500">
            Score Range: {interpretation.range[0]} - {interpretation.range[1]}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 mb-8 text-center text-gray-500">
          Could not determine interpretation band for your score.
        </div>
      )}

      {/* Scorecard Summary - You can expand this to show category scores if needed */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Scorecard Summary</h3>
        <p>
          This scorecard helps you understand your current positioning and
          effectiveness in leveraging your personal brand for sales.
        </p>
        {/* You could add more detailed breakdowns here, e.g., scores per category */}
      </div>

      {/* Add a button to go back or start over if needed */}
      <div className="text-center mt-8">
        <button
          onClick={() => (window.location.href = "/")} // Example: go back to homepage
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
        >
          Start Over or Learn More
        </button>
      </div>
    </div>
  );
};

export default Page;
