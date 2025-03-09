/**
 * Generates a random invite code for families
 * Format: XXXX-XXXX-XXXX (where X is alphanumeric)
 */
export const generateInviteCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 3;
  const segmentLength = 4;
  
  let code = '';
  
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segmentLength; j++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    
    if (i < segments - 1) {
      code += '-';
    }
  }
  
  return code;
};

/**
 * Format date to a readable string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}; 