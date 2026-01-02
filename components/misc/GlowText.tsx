
interface GlowTextTypes { 
    text?: string;
    enableGlow?: boolean
}

const GlowText = ({ text, enableGlow = true }: GlowTextTypes) => {
    return(
        <span className="highlight leading-[1.3em] overflow-visible">
            <span className="highlight-text overflow-visible">{text}</span>
            {enableGlow && <span className="highlight-glow">{text}</span>}
        </span> 
    )
}

export default GlowText;