import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

// const CREATE_SUBSCRIBER_MUTATION = gql`
//     mutation CreateSubscriber($name:  String!, $email: String!) {
//     createSubscriber(data: {name: $name, email: $email}) {
//         id
//     }
// }
// ` 

export function Subscribe(){
    const [name, setNome] = useState('');
    const [email, setEmail] = useState('');
    // const [createSubscriber, {loading}] = useMutation(CREATE_SUBSCRIBER_MUTATION)
    const [createSubscriber, {loading}] = useCreateSubscriberMutation()

    const navigate = useNavigate()

    async function handleSubscribe(event:FormEvent){
        // para evitar tentativa de redirecionamento
        event.preventDefault()
        await createSubscriber({
            variables: {
                name,
                email,
            }
        })
        navigate('/event')
    }

    return(
        <div className="min-h-screen bg-blur bg-no-repeat bg-cover flex flex-col items-center">
            <div
                className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto"
            >
                <div className="max-w-[640px]">
                    <Logo />
                    {/* leading-tight diminui o line-height para as letras ficarem mais proximas uma das outras */}
                    <h1 className="mt-8 leading-tight text-[2.5rem]">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                    </h1>
                    {/* leading-relaxed deixa o line-height um pouco maior */}
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>
                <div className="p-8 rounded bg-gray-700 border border-gray-500">
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuítamente</strong>
                    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubscribe}>
                        <input 
                            className="rounded bg-gray-900 px-5 h-14"
                            type="text"
                            placeholder="Seu nome competo aqui"
                            onChange={(event) => setNome(event.target.value)}
                        />
                        <input 
                            className="rounded bg-gray-900 px-5 h-14"
                            type="email"
                            placeholder="Digite seu e-mail" 
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <button 
                            className="disabled:opacity-50 mt-4 py-4 bg-green-500 rounded text-sm font-bold hover:bg-green-700 transition-colors uppercase"
                            type="submit"
                            disabled={loading}
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>
            <img src="/src/assets/codeMockup.png" className="mt-10" alt="" />
        </div>
    )
}