import { useEffect, useState, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function CertificateModal({
  isOpen,
  onClose,
  currentIndex,
  onPrev,
  onNext,
  certificates,
}) {
  const [animate, setAnimate] = useState(false)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Handle entering/exiting states and scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      const timer = setTimeout(() => {
        setAnimate(true)
        if (closeButtonRef.current) {
          closeButtonRef.current.focus()
        }
      }, 50)

      return () => {
        clearTimeout(timer)
      }
    } else {
      setAnimate(false)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Keyboard navigation & accessibility controls
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        onPrev()
      } else if (e.key === "ArrowRight") {
        onNext()
      } else if (e.key === "Tab") {
        // Simple focus trap
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen) return null

  const currentCert = certificates[currentIndex]

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 ease-out ${animate ? "opacity-100" : "opacity-0"
        }`}
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full border border-white/20 transition-all focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
        aria-label="Close modal"
      >
        <X size={24} />
      </button>

      {/* Navigation: Prev */}
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 z-50 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full border border-white/20 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
        aria-label="Previous certificate"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Navigation: Next */}
      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 z-50 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full border border-white/20 transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
        aria-label="Next certificate"
      >
        <ChevronRight size={28} />
      </button>

      {/* Main image container */}
      <div
        className={`flex flex-col items-center max-w-4xl w-full transition-all duration-300 ease-out ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        <div
          className="relative max-h-[70vh] w-full flex justify-center items-center overflow-hidden"
          onClick={handleBackdropClick}
        >
          <img
            src={currentCert.image}
            alt={`Certificate document for ${currentCert.title} by ${currentCert.issuer}`}
            className="max-h-[65vh] md:max-h-[70vh] w-auto max-w-full object-contain rounded-sm shadow-2xl select-none"
          />
        </div>

        {/* Certificate text information */}
        <div className="w-full text-center mt-6 text-white px-4">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
            {currentCert.issuer}
          </span>
          <h2 id="modal-title" className="text-xl md:text-2xl font-bold mt-1 leading-snug">
            {currentCert.title}
          </h2>
          <span className="inline-block mt-2 px-3 py-1 bg-white/10 text-xs rounded-full">
            Year: {currentCert.year}
          </span>
        </div>
      </div>
    </div>
  )
}
