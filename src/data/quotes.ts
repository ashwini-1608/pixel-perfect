export const quotes = [
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh" },
  { text: "Be where you are, not where you think you should be.", author: "Unknown" },
  { text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
  { text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson" },
  { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse" },
  { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
  { text: "You are the sky. Everything else is just the weather.", author: "Pema Chödrön" },
  { text: "Peace is always beautiful.", author: "Walt Whitman" },
  { text: "Quiet the mind, and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Do not let the behaviour of others destroy your inner peace.", author: "Dalai Lama" },
  { text: "Surrender to what is. Let go of what was. Have faith in what will be.", author: "Sonia Ricotti" },
  { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
  { text: "Smile, breathe, and go slowly.", author: "Thich Nhat Hanh" },
  { text: "Every morning we are born again. What we do today matters most.", author: "Buddha" },
  { text: "Happiness is not something readymade. It comes from your own actions.", author: "Dalai Lama" },
  { text: "The only way to live is by accepting each minute as an unrepeatable miracle.", author: "Tara Brach" },
];

export function getDailyQuote() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return quotes[dayOfYear % quotes.length];
}
