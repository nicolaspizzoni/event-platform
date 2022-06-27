import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, FileArrowUp, Image, Lightning } from "phosphor-react";
import { Button } from "./Button";

import '@vime/core/themes/default.css'
import { gql, useQuery } from "@apollo/client";
import { useGetLessonBySlugQuery } from "../graphql/generated";

interface VideoProps {
    lessonSlug: string
}

// interface GetLessonBySlugResponse {
//     lesson: {
//         videoId: string;
//         teacher: {
//             bio: string;
//             avatarURL: string;
//             name: string
//         }
//         title: string;
//         description: string;
//     }
// }

// const GET_LESSON_BY_SLUG_QUERY = gql`
//     query GetLessonBySlug ($slug: String) {
//         lesson(where: {slug: $slug}) {
//             videoId
//             teacher {
//                 bio
//                 avatarURL
//                 name
//             }
//             title
//             description
//         }
//     }
// `

export function Video({lessonSlug}:VideoProps){
    // const {data} = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    //     // variables passa as variaveis que a query pede como parametro em GetLessonBySlug ($slug: String)
    //     variables: {
    //         slug: lessonSlug
    //     }
    // })
    const {data} = useGetLessonBySlugQuery({
    // variables passa as variaveis que a query pede como parametro em GetLessonBySlug ($slug: String)
        variables: {
            slug: lessonSlug
        }
    })

    if(!data || !data.lesson){
        return(
            <div className="flex-1">
                <p>Carregando...</p>
            </div>
        )
    }

    return(
        <div className="flex-1">
            <div
                className="bg-black flex justify-center"
            >
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} />
                        {/* traz player nativo da biblioteca */}
                        <DefaultUi />
                    </Player>
                </div>
            </div>
            <div className="p-8 max-w-[1100px] mx-auto">
                <div
                    className="flex items-start gap-16"
                >
                    <div
                        className="flex-1"
                    >
                        <h1
                            className="text-2xl font-bold"
                        >
                            {data.lesson.title}
                        </h1>
                        <p
                            className="mt-4 text-gray-200 leading-relaxed"
                        >
                            {data.lesson.description}
                        </p>
                        {
                        data.lesson.teacher &&
                            <div
                                className="flex items-center gap-4 mt-6"
                            >
                                <img 
                                    src={data.lesson.teacher.avatarURL}
                                    alt=""
                                    className="h-16 w-16 rounded-full border-2 border-blue-500"
                                />
                                <div
                                    className="leading-relaxed"
                                >
                                    <strong
                                        className="font-bold text-2xl block"
                                    >
                                        {data.lesson.teacher.name}
                                    </strong>
                                    <span
                                        className="text-gray-200 text-sm block"
                                    >
                                        {data.lesson.teacher.bio}
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                    <div
                        className="flex flex-col gap-4"
                    >
                        <Button type="discord" />
                        <Button type="desafio" />
                    </div>
                </div>
                <div
                    className="gap-8 mt-20 grid grid-cols-2"
                >
                    <a
                        href="#"
                        className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
                    >
                        <div
                            className="h-full p-6 flex bg-green-700 items-center"
                        >
                            <FileArrowDown size={40}/>
                        </div>
                        <div
                            className="py-6 leading-relaxed"
                        >
                            <strong
                                className="text-2xl"
                            >
                                Material complementar
                            </strong>
                            <p
                                className="text-sm text-gray-200 mt-2"
                            >
                                Acesse o material complementar para acelerar seu desenvolvimento
                            </p>
                        </div>
                        <div
                            className="h-full p-6 flex items-center"
                        >
                            <CaretRight size={24}/>
                        </div>
                    </a>
                    <a
                        href="#"
                        className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
                    >
                        <div
                            className="h-full p-6 flex bg-green-700 items-center"
                        >
                            <Image size={40}/>
                        </div>
                        <div
                            className="py-6 leading-relaxed"
                        >
                            <strong
                                className="text-2xl"
                            >
                                Wallpapers exclusivos
                            </strong>
                            <p
                                className="text-sm text-gray-200 mt-2"
                            >
                                Baixe wallpapers exclusivos do Ignite Lab e personalize sua maquina
                            </p>
                        </div>
                        <div
                            className="h-full p-6 flex items-center"
                        >
                            <CaretRight size={24}/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}