export async function askWorkoutAssistant(userId: string, message: string, chatHistory: any[]) {
  const res = await fetch('/api/chat/workout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userId}`
    },
    body: JSON.stringify({ message, chatHistory })
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to communicate with AI Workout Assistant.');
  }
  
  return await res.json();
}
