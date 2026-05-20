import React, { useState, useEffect } from 'react';

const QUOTES = [
  { text: "Until you make the _unconscious conscious_, it will direct your life and you will call it _fate_.", author: "Carl Jung" },
  { text: "He who has a _why_ to live can bear almost any _how_.", author: "Friedrich Nietzsche" },
  { text: "The only way to deal with an unfree world is to become so _absolutely free_ that your very existence is an act of _rebellion_.", author: "Albert Camus" },
  { text: "We suffer more often in _imagination_ than in _reality_.", author: "Seneca" },
  { text: "Man is not what he is; he is what he _hides_.", author: "André Malraux" },
  { text: "The meeting of two personalities is like the contact of two chemical substances: if there is any _reaction_, both are _transformed_.", author: "Carl Jung" },
  { text: "I am not what happened to me, I am what I _choose_ to become.", author: "Carl Jung" },
  { text: "There is no coming to consciousness without _pain_.", author: "Carl Jung" },
  { text: "You have power over your _mind_ - not outside events. Realize this, and you will find _strength_.", author: "Marcus Aurelius" },
  { text: "The _cave_ you fear to enter holds the _treasure_ you seek.", author: "Joseph Campbell" },
  { text: "Out of your _vulnerabilities_ will come your _strength_.", author: "Sigmund Freud" },
  { text: "The unexamined life is not worth _living_.", author: "Socrates" },
  { text: "To be normal is the ideal aim of the unsuccessful.", author: "Carl Jung" },
  { text: "Where your fear is, there is your _task_.", author: "Carl Jung" },
  { text: "One does not become enlightened by imagining figures of light, but by making the _darkness conscious_.", author: "Carl Jung" },
  { text: "Liberty is the right to tell people what they _do not_ want to hear.", author: "George Orwell" },
  { text: "And those who were seen dancing were thought to be _insane_ by those who could not hear the _music_.", author: "Friedrich Nietzsche" },
  { text: "Beware that, when fighting _monsters_, you yourself do not become a _monster_.", author: "Friedrich Nietzsche" },
  { text: "The individual has always had to struggle to keep from being _overwhelmed_ by the tribe.", author: "Friedrich Nietzsche" },
  { text: "Knowing your own _darkness_ is the best method for dealing with the darknesses of other people.", author: "Carl Jung" }
];

const Quotes = ({ activeMode }) => {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    // Randomize on mount (Client-side only to avoid hydration mismatch if using Next.js, generally safe in standard React)
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  // Helper to parse _underscores_ into italics
  const renderText = (text) => {
    return text.split('_').map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className={`italic transition-colors duration-500 ${activeMode ? 'text-zinc-400' : 'text-white'}`}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-4xl text-center py-24">
      <h2 className={`font-serif text-3xl md:text-5xl leading-tight mb-8 transition-colors duration-500 ${activeMode ? 'text-zinc-500' : 'text-zinc-300'}`}>
        "{renderText(quote.text)}"
      </h2>
      <p className="font-mono text-xs text-zinc-500 tracking-[0.3em] uppercase mb-16">
        — {quote.author}
      </p>
    </div>
  );
};

export default Quotes;