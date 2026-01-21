
interface GlowTextTypes { 
    text?: string;
    enableGlow?: boolean
}

const GlowText = ({ text }: GlowTextTypes) => {
    return(
        <span className="highlight leading-[1.3em] overflow-visible">
            <span className="highlight-text overflow-visible pe-2">{text}</span>
            <span className="highlight-glow pe-2">{text}</span>
        </span> 
    )
}

export default GlowText;