export const projects = [
  {
    id: 1,
    number: '01',
    title: 'ParkSense AI: Parking Hotspot Detection & Congestion Prediction',
    description:
      'An AI-powered smart-city analytics platform that processes parking violation data to identify urban parking hotspots and predict congestion risks.',
    problem:
      'Enabling urban authorities and dispatch planners to anticipate parking congestion and violation hotspots across multiple jurisdictions.',
    tech: ['Python', 'XGBoost', 'KMeans', 'SHAP', 'Pandas', 'Folium', 'REST APIs'],
    highlights: [
      'Processed 15,000+ spatio-temporal records.',
      'Built geospatial analytics for parking hotspot detection.',
      'Developed congestion-risk prediction.',
      'Integrated XGBoost, KMeans and SHAP explainability.',
      'Created geographic visualizations supporting officer dispatch planning across 10+ urban jurisdictions.',
    ],
    metrics: { Records: '15,000+', Jurisdictions: '10+' },
    visual: 'dashboard',
    github: 'https://github.com/amal-joji/parksenseai',
    demo: '', // Configurable live demo URL
  },
  {
    id: 2,
    number: '02',
    title: 'Dynamic Prediction of Potential Fishing Zones',
    description:
      'An intelligent prediction system using satellite-derived oceanographic parameters to identify Potential Fishing Zones.',
    problem:
      'Providing data-driven oceanographic forecasts and spatial maps to pinpoint high-probability fishing zones.',
    tech: ['Python', 'XGBoost', 'MODIS', 'CMEMS', 'GHRSST', 'Xarray', 'NetCDF'],
    highlights: [
      'Automated oceanographic data processing.',
      'Integrated satellite-derived ocean parameters.',
      'Developed an XGBoost regression model.',
      'Generated predictive spatial maps.',
      'Achieved reported R² of 0.803 and RMSE of 0.030.',
    ],
    metrics: { 'R²': '0.803', RMSE: '0.030' },
    visual: 'ocean',
    github: 'https://github.com/amal-joji/PotentialFishingZones',
    demo: '', // Configurable live demo URL
  },
  {
    id: 3,
    number: '03',
    title: 'Unified News Analyzer',
    description:
      'An NLP-powered platform combining fake news detection, sentiment analysis and news categorization.',
    problem:
      'Analyzing unstructured news articles simultaneously for credibility, sentiment polarity, and topic classification.',
    tech: ['Python', 'TF-IDF', 'Logistic Regression', 'BERT', 'Transformers', 'Streamlit'],
    highlights: [
      'Fake news classification.',
      'Sentiment analysis.',
      'Automated news categorization.',
      'Interactive application interface.',
    ],
    metrics: {},
    visual: 'editorial',
    github: 'https://github.com/amal-joji/UnifiedNewsAnalyser',
    demo: '', // Configurable live demo URL
  },
  {
    id: 4,
    number: '04',
    title: 'Product Metrics & A/B Testing Analytics Platform',
    description:
      'An end-to-end analytics platform designed to evaluate product experiments, analyze user behavior and measure the impact of feature variants.',
    problem:
      'Translating raw product interaction logs into statistically rigorous experiment decisions for feature rollouts.',
    tech: ['Python', 'Pandas', 'SQL', 'Statistical Hypothesis Testing'],
    highlights: [
      'Built an end-to-end analytics pipeline processing 50,000+ user interaction records.',
      'Performed data validation and SQL-based aggregation.',
      'Implemented hypothesis testing, t-tests and confidence interval analysis.',
      'Evaluated feature variants and user behavior.',
      'Analyzed experimental results to identify a reported 6.8% improvement in user retention.',
    ],
    metrics: { Retention: '+6.8%', Records: '50,000+' },
    visual: 'analytics',
    github: 'https://github.com/amal-joji/abtesting',
    demo: '', // Configurable live demo URL
  },
];
