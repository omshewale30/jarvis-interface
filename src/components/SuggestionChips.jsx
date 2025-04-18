"use client"

const SuggestionChips = ({ suggestions, handleSuggestionClick }) => {
  return (
      <div className="flex flex-wrap gap-2 mb-2">
        {suggestions.map((suggestion, index) => (
            <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 bg-slate-800/70 hover:bg-slate-700/80 text-slate-300 text-sm rounded-full border border-slate-700/50 transition-all duration-200 hover:border-sky-700/50 hover:shadow-[0_0_10px_rgba(14,165,233,0.2)]"
            >
              {suggestion}
            </button>
        ))}
      </div>
  )
}

export default SuggestionChips
