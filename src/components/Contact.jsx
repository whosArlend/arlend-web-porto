import { useState, useEffect, useRef } from "react"
import { Mail, Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import SectionWrapper from "./SectionWrapper"
import { IconGitHub, IconLinkedIn } from "./Icons"
import { siteConfig } from "../data/content"

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [isSending, setIsSending] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [animateFeedback, setAnimateFeedback] = useState(false)
  const dismissTimerRef = useRef(null)

  // Fade-in animation for feedback messages
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setAnimateFeedback(true), 10)
      return () => clearTimeout(timer)
    } else {
      setAnimateFeedback(false)
    }
  }, [feedback])

  // Auto-dismiss feedback after 5 seconds
  useEffect(() => {
    if (feedback) {
      // Clear any existing timer before starting a new one
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)

      dismissTimerRef.current = setTimeout(() => {
        setFeedback(null)
        dismissTimerRef.current = null
      }, 5000)
    }

    // Cleanup timer on unmount
    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current)
        dismissTimerRef.current = null
      }
    }
  }, [feedback])

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Generate a formatted timestamp in the user's local timezone
  const getFormattedTimestamp = () => {
    const now = new Date()
    const options = { day: "numeric", month: "long", year: "numeric" }
    const datePart = now.toLocaleDateString("en-GB", options)
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")

    // Resolve the user's local timezone abbreviation
    const tzName = Intl.DateTimeFormat("en", { timeZoneName: "short" })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName")?.value || "WIB"

    return `${datePart}, ${hours}:${minutes} ${tzName}`
  }

  // Handle contact form submission via EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = formState.name.trim()
    const email = formState.email.trim()
    const message = formState.message.trim()

    // Validate presence
    if (!name || !email || !message) {
      setFeedback({ type: "error", text: "All fields are required." })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFeedback({ type: "error", text: "Please enter a valid email address." })
      return
    }

    setIsSending(true)
    setFeedback(null)

    // Load config from Vite environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name,
          email,
          message,
          time: getFormattedTimestamp(),
        },
        publicKey
      )

      // Handle successful submission
      setFeedback({ type: "success", text: "Your message has been sent successfully." })
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("EmailJS submission failure:", error)
      setFeedback({
        type: "error",
        text: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSending(false)
    }
  }

  const socialLinks = [
    { icon: Mail, label: "Email", href: `mailto:${siteConfig.email}` },
    { icon: IconGitHub, label: "GitHub", href: siteConfig.github },
    { icon: IconLinkedIn, label: "LinkedIn", href: siteConfig.linkedin },
  ]

  return (
    <SectionWrapper id="contact" className="bg-gray-100">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        Contact
      </h2>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        {/* Social links */}
        <div>
          <p className="text-base leading-relaxed text-black text-justify">
          I'm always open to new opportunities, collaborations, 
          and meaningful projects in web development and cybersecurity. 
          Feel free to reach out if you'd like to connect or work together.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-3 text-sm text-black link-underline"
                >
                  <Icon size={18} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact form — submits via EmailJS */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-gray-500">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={isSending}
              value={formState.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-300 focus:border-black focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isSending}
              value={formState.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-300 focus:border-black focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-gray-500">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              disabled={isSending}
              rows={4}
              value={formState.message}
              onChange={handleChange}
              placeholder="Your message..."
              className="w-full resize-none border border-gray-300 bg-white px-4 py-2.5 text-sm text-black placeholder:text-gray-300 focus:border-black focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center justify-center gap-2 border border-black bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed w-fit cursor-pointer"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Send Message
                </>
              )}
            </button>

            {feedback && (
              <div
                className={`p-3 border text-xs font-semibold transition-all duration-500 ease-out transform ${
                  animateFeedback ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                } ${
                  feedback.type === "success"
                    ? "border-black bg-black text-white"
                    : "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/10 dark:text-red-400"
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>
        </form>
      </div>
    </SectionWrapper>
  )
}
