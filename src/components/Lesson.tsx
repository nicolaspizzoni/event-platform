import {CheckCircle, Lock} from 'phosphor-react'
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames'

interface LessonProps {
    title: string;
    slugProp?: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(
    {
        title,
        slugProp,
        availableAt,
        type,
    } : LessonProps
){
    const isLessonAvailable = isPast(availableAt)
    const availableDate = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
    })

    const {slug} = useParams<{slug: string}>()

    const isActiveLesson = slug == slugProp

    return (
        <Link
            to={`/event/lesson/${slugProp}`}
            className="group"
        >
            <span
                className="text-gray-300"
            >
                {availableDate}
            </span>

            <div
                className={
                    // classNames(
                    //     '' estilizacoes padroes independente da condicional,
                    //     {'':condicional} estilizacao dependente da condicional
                    // )
                    classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                        'bg-green-500': isActiveLesson
                    })
                }
            >
                <header
                    className="flex align-center justify-between"
                >
                    {
                        isLessonAvailable ?
                        <span
                            className={classNames('font-medium text-sm flex items-center gap-2', {
                                'text-white': isActiveLesson,
                                'text-blue-500': !isActiveLesson,
                            })}
                        >
                            <CheckCircle size={20}/>
                            Conteúdo Liberado
                        </span>
                        :
                        <span
                            className="font-medium text-sm text-orange-500 flex items-center gap-2"
                        >
                            <Lock size={20}/>
                            Em Breve
                        </span>
                    }
                    <span
                        className={classNames('rounded text-xs py-[0.125rem] px-2 font-bold text-white border', {
                            'border-white': isActiveLesson,
                            'border-green-300': !isActiveLesson,
                        })}
                    >
                        {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>
                <strong className={
                    classNames('mt-5 block', {
                        'text-white': isActiveLesson,
                        'text-gray-200': !isActiveLesson,

                    })
                }>
                    {title}
                </strong>
            </div>
        </Link>
    )
}