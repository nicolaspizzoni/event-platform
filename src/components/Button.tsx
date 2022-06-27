import { DiscordLogo, Lightning } from 'phosphor-react'
import './Button.css'

interface ButtonProps {
    type: 'discord' | 'desafio'
}

export function Button({type}:ButtonProps){
    return(
        <a
            href="#"
            className={type === 'discord' ? "pattern discord" : "pattern desafio"}
        >
            {
                type === 'discord'
                ? 
                <>
                    <DiscordLogo size={24}/>
                    Comunidade do Discord
                </>
                :
                <>
                    <Lightning size={24}/>
                    Acesse o desafio
                </>
            }
        </a>
    )
}