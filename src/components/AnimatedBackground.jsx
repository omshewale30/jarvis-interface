"use client"

import { useEffect, useRef } from "react"

const AnimatedBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        let animationFrameId

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        setCanvasDimensions()
        window.addEventListener("resize", setCanvasDimensions)

        // Particle settings
        const particlesArray = []
        const numberOfParticles = 100

        // Modern navy, black, white color scheme
        const colors = [
            "rgba(255, 255, 255, 0.4)", // White
            "rgba(226, 232, 240, 0.3)", // Slate-200
            "rgba(148, 163, 184, 0.3)", // Slate-400
            "rgba(30, 58, 138, 0.4)", // Navy-900
        ]

        // Create particles
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 10 + 1
                this.speedX = Math.random() * 0.8 - 0.4
                this.speedY = Math.random() * 0.8 - 0.4
                this.color = colors[Math.floor(Math.random() * colors.length)]
                this.opacity = Math.random() * 0.5 + 0.1
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY
                }
            }

            draw() {
                ctx.beginPath()
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
                gradient.addColorStop(0, this.color)
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
                ctx.fillStyle = gradient
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Initialize particles
        const init = () => {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle())
            }
        }

        // Animate particles
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, "#0a0f1a") // Dark navy/black
            gradient.addColorStop(0.5, "#1e3a8a") // Navy blue
            gradient.addColorStop(1, "#000000") // Black

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw and update particles
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update()
                particlesArray[i].draw()
            }

            // Draw large glowing orbs
            drawGlowingOrb(canvas.width * 0.2, canvas.height * 0.3, 280, "rgba(255, 255, 255, 0.07)")     // Soft White
            drawGlowingOrb(canvas.width * 0.8, canvas.height * 0.8, 320, "rgba(106, 90, 205, 0.09)")     // Medium Purple
            drawGlowingOrb(canvas.width * 0.5, canvas.height * 0.5, 350, "rgba(30, 58, 138, 0.08)")      // Navy Blue
            drawGlowingOrb(canvas.width * 0.6, canvas.height * 0.25, 260, "rgba(173, 216, 230, 0.07)")   // Light Blue


            // Connection lines between particles
            connectParticles()

            animationFrameId = requestAnimationFrame(animate)
        }

        // Draw glowing orb
        const drawGlowingOrb = (x, y, size, color) => {
            // Add slight movement to orbs
            const time = Date.now() * 0.001
            const offsetX = Math.sin(time * 0.5) * 20
            const offsetY = Math.cos(time * 0.3) * 20

            ctx.beginPath()
            const gradient = ctx.createRadialGradient(x + offsetX, y + offsetY, 0, x + offsetX, y + offsetY, size)
            gradient.addColorStop(0, color)
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
            ctx.fillStyle = gradient
            ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2)
            ctx.fill()
        }

        // Connect particles with lines
        const connectParticles = () => {
            const maxDistance = 150
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x
                    const dy = particlesArray[a].y - particlesArray[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance
                        ctx.strokeStyle = `rgba(173, 216, 230, ${opacity * 0.12})`

                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        init()
        animate()

        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ filter: "blur(1px)" }} />

            {/* Additional static gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-navy-900/20 to-black/30 z-0"></div>
        </>
    )
}

export default AnimatedBackground
