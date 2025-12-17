
interface GlowTextTypes { 
    text?: string
}

const GlowText = ({ text }: GlowTextTypes) => {
    return(
        <span className="highlight leading-[1.3em] overflow-visible">
            <span className="highlight-text overflow-visible">{text}</span>
            <span className="highlight-glow">{text}</span>
        </span> 
    )
}

export default GlowText;