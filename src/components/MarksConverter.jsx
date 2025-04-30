import { useState } from 'react';

export default function MarksConverter() {
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [percentage, setPercentage] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [converterType, setConverterType] = useState('percentageToCgpa');
  const [converterInput, setConverterInput] = useState('');

  const calculatePercentage = () => {
    if (obtainedMarks && totalMarks) {
      const percent = (parseFloat(obtainedMarks) / parseFloat(totalMarks)) * 100;
      setPercentage(percent.toFixed(2));
    }
  };

  const handleMarksSubmit = (e) => {
    e.preventDefault();
    calculatePercentage();
  };

  const handleConverterSubmit = (e) => {
    e.preventDefault();
    if (converterInput) {
      if (converterType === 'percentageToCgpa') {
        // Convert percentage to CGPA (assuming 10-point scale)
        const convertedCgpa = parseFloat(converterInput) / 9.5;
        setCgpa(convertedCgpa.toFixed(2));
      } else {
        // Convert CGPA to percentage
        const convertedPercentage = parseFloat(converterInput) * 9.5;
        setPercentage(convertedPercentage.toFixed(2));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Student Marks Converter</h1>
            <p className="mt-2 text-gray-600">Calculate percentage and convert between percentage and CGPA</p>
          </div>

          {/* Marks to Percentage Form */}
          <div className="mb-10 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Marks to Percentage Calculator</h2>
            <form onSubmit={handleMarksSubmit}>
              <div className="mb-4">
                <label htmlFor="obtainedMarks" className="block text-sm font-medium text-gray-700 mb-1">
                  Obtained Marks
                </label>
                <input
                  type="number"
                  id="obtainedMarks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={obtainedMarks}
                  onChange={(e) => setObtainedMarks(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Marks
                </label>
                <input
                  type="number"
                  id="totalMarks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Calculate Percentage
              </button>
            </form>
            {percentage && (
              <div className="mt-4 p-3 bg-blue-100 rounded-md">
                <p className="text-blue-800 font-medium">Percentage: {percentage}%</p>
              </div>
            )}
          </div>

          {/* Percentage/CGPA Converter */}
          <div className="p-6 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Percentage ↔ CGPA Converter</h2>
            <form onSubmit={handleConverterSubmit}>
              <div className="mb-4">
                <div className="flex space-x-4 mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-green-600"
                      checked={converterType === 'percentageToCgpa'}
                      onChange={() => setConverterType('percentageToCgpa')}
                    />
                    <span className="ml-2 text-gray-700">Percentage to CGPA</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-green-600"
                      checked={converterType === 'cgpaToPercentage'}
                      onChange={() => setConverterType('cgpaToPercentage')}
                    />
                    <span className="ml-2 text-gray-700">CGPA to Percentage</span>
                  </label>
                </div>
                <label htmlFor="converterInput" className="block text-sm font-medium text-gray-700 mb-1">
                  {converterType === 'percentageToCgpa' ? 'Enter Percentage' : 'Enter CGPA'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="converterInput"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={converterInput}
                  onChange={(e) => setConverterInput(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Convert
              </button>
            </form>
            {(cgpa || (converterType === 'cgpaToPercentage' && percentage)) && (
              <div className="mt-4 p-3 bg-green-100 rounded-md">
                {converterType === 'percentageToCgpa' ? (
                  <p className="text-green-800 font-medium">CGPA: {cgpa}</p>
                ) : (
                  <p className="text-green-800 font-medium">Percentage: {percentage}%</p>
                )}
              </div>
            )}
          </div>

          {/* Conversion Info */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Conversion Formula:</h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Percentage to CGPA:</span> CGPA = Percentage / 9.5
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">CGPA to Percentage:</span> Percentage = CGPA × 9.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}