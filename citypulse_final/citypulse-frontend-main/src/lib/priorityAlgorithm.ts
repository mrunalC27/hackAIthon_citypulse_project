interface PriorityInput {
  description: string;
  category: string;
  peopleAffected: string;
  hasImage: boolean;
  location: string;
}

type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

const CRITICAL_KEYWORDS = ['fire', 'gas leak', 'explosion', 'collapse', 'electrocution', 'death', 'fatal', 'emergency'];
const HIGH_KEYWORDS = ['accident', 'flood', 'electric hazard', 'injury', 'dangerous', 'urgent', 'sewage overflow', 'water contamination'];
const MEDIUM_KEYWORDS = ['broken', 'damaged', 'leak', 'blocked', 'overflow', 'hazard', 'unsafe'];

const SENSITIVE_LOCATIONS = ['hospital', 'school', 'college', 'university', 'main road', 'highway', 'market', 'station', 'airport'];

const CATEGORY_SEVERITY: Record<string, number> = {
  'Electricity': 4,
  'Water Supply': 3,
  'Roads': 3,
  'Sanitation': 2,
  'Public Safety': 4,
  'Other': 1,
};

export function calculatePriority(input: PriorityInput): Priority {
  let score = 0;
  const descLower = input.description.toLowerCase();
  const locationLower = input.location.toLowerCase();

  // Check critical keywords (highest weight)
  if (CRITICAL_KEYWORDS.some(keyword => descLower.includes(keyword))) {
    score += 40;
  }
  // Check high severity keywords
  else if (HIGH_KEYWORDS.some(keyword => descLower.includes(keyword))) {
    score += 25;
  }
  // Check medium severity keywords
  else if (MEDIUM_KEYWORDS.some(keyword => descLower.includes(keyword))) {
    score += 15;
  }

  // People affected scoring
  switch (input.peopleAffected) {
    case '100+':
      score += 30;
      break;
    case '50-100':
      score += 20;
      break;
    case '10-50':
      score += 10;
      break;
    case '1-10':
      score += 5;
      break;
  }

  // Category severity
  score += (CATEGORY_SEVERITY[input.category] || 1) * 5;

  // Image presence (adds credibility/urgency)
  if (input.hasImage) {
    score += 10;
  }

  // Location sensitivity
  if (SENSITIVE_LOCATIONS.some(loc => locationLower.includes(loc))) {
    score += 15;
  }

  // Determine priority based on score
  if (score >= 60) return 'Critical';
  if (score >= 40) return 'High';
  if (score >= 20) return 'Medium';
  return 'Low';
}
