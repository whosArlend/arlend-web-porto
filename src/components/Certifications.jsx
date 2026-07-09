import { useState } from "react"
import SectionWrapper from "./SectionWrapper"
import { certificationsContent } from "../data/content"
import CertificationCard from "./CertificationCard"
import CertificateModal from "./CertificateModal"

export default function Certifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const items = certificationsContent.items

  const openModal = (index) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const prevCert = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const nextCert = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <SectionWrapper id="certifications">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        {certificationsContent.heading}
      </h2>

      {/* Grid gallery */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((cert, index) => (
          <CertificationCard
            key={cert.title + index}
            cert={cert}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <CertificateModal
        isOpen={isOpen}
        onClose={closeModal}
        currentIndex={currentIndex}
        onPrev={prevCert}
        onNext={nextCert}
        certificates={items}
      />
    </SectionWrapper>
  )
}
