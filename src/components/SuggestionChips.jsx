"use client"

const SuggestionChips = ({ suggestions, handleSuggestionClick }) => {
  return (
      <div className="flex flex-wrap gap-2 mb-2">
        {suggestions.map((suggestion, index) => (
            <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 bg-slate-700/60 hover:bg-slate-600/70 text-slate-100 text-sm rounded-full border border-slate-600/40 transition-all duration-200 hover:border-sky-400/50 hover:shadow-[0_0_10px_rgba(56,189,248,0.25)]"
            >
              {suggestion}
            </button>
        ))}
      </div>
  )
}

export default SuggestionChips
