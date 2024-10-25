type MedicalCondition = {
  symptoms: string[];
  suggestions: string[];
  disclaimer: string;
};

export const medicalData: Record<string, MedicalCondition> = {
  headache: {
    symptoms: ['head pain', 'pressure in head', 'migraine'],
    suggestions: [
      'Over-the-counter pain relievers (acetaminophen, ibuprofen)',
      'Rest in a quiet, dark room',
      'Stay hydrated',
      'Apply cold or warm compress'
    ],
    disclaimer: 'For severe or persistent headaches, please consult a healthcare provider.'
  },
  cold: {
    symptoms: ['runny nose', 'cough', 'sore throat', 'congestion'],
    suggestions: [
      'Rest and stay warm',
      'Over-the-counter decongestants',
      'Throat lozenges',
      'Plenty of fluids'
    ],
    disclaimer: 'If symptoms worsen or persist beyond a week, seek medical attention.'
  },
  fever: {
    symptoms: ['high temperature', 'chills', 'sweating', 'weakness'],
    suggestions: [
      'Acetaminophen or ibuprofen for temperature reduction',
      'Stay hydrated',
      'Rest',
      'Light clothing and comfortable room temperature'
    ],
    disclaimer: 'For high fevers (above 103°F/39.4°C) or persistent fevers, seek immediate medical care.'
  }
};

export const findCondition = (input: string): string[] => {
  const lowercaseInput = input.toLowerCase();
  for (const [condition, data] of Object.entries(medicalData)) {
    if (
      lowercaseInput.includes(condition) ||
      data.symptoms.some(symptom => lowercaseInput.includes(symptom))
    ) {
      return [
        `Based on your description, you might have a ${condition}.`,
        'Suggested remedies:',
        ...data.suggestions,
        '',
        `⚠️ ${data.disclaimer}`,
        '',
        '🏥 This is not medical advice. Always consult a healthcare professional for proper diagnosis and treatment.'
      ];
    }
  }
  return [
    "I'm not sure about your condition. Please provide more specific symptoms or consult a healthcare provider.",
    '',
    '🏥 Remember: This bot is for educational purposes only. Always seek professional medical advice for accurate diagnosis and treatment.'
  ];
};