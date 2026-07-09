import { Maximize2 } from "lucide-react"

export default function CertificationCard({ cert, onClick }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="group flex flex-col bg-white border border-black rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      aria-label={`View details of ${cert.title} certificate issued by ${cert.issuer}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 border-b border-gray-300">
        <img
          src={cert.image}
          alt={`Certificate of Completion for ${cert.title} by ${cert.issuer}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
      </div>

      {/* Card Details */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
          <span className="font-semibold uppercase tracking-wider">{cert.issuer}</span>
          <span className="shrink-0">{cert.year}</span>
        </div>

        <h3 className="mt-2 text-base font-semibold leading-snug text-black flex-1 line-clamp-2">
          {cert.title}
        </h3>

        {/* View Certificate CTA */}
        <div className="mt-4 pt-4 border-t border-gray-300 flex items-center justify-between text-xs font-bold text-black">
          <span>View Certificate</span>
          <Maximize2 size={14} className="transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>
    </div>
  )
}
