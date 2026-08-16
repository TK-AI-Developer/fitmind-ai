export async function askDietAssistant(userId: string, message: string, chatHistory: any[]) {
  const res = await fetch('/api/chat/diet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userId}`
    },
    body: JSON.stringify({ message, chatHistory })
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to communicate with AI Diet Assistant.');
  }
  
  return await res.json();
}
